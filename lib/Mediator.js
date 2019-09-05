"use strict";

// deps

	// natives
	const { join } = require("path");
	const { homedir, platform } = require("os");
	const { spawn } = require("child_process");

	// externals
	const { Mediator } = require("node-pluginsmanager-plugin");

	// locals
	const checkTerminal = require(join(__dirname, "utils", "checkTerminal.js"));
	const checkTerminalNumber = require(join(__dirname, "utils", "checkTerminalNumber.js"));
	const formateTerminal = require(join(__dirname, "utils", "formateTerminal.js"));

// consts

	const IS_WINDOWS = "win32" === platform();

// private

	// methods

		/**
		* Stop all running child_processes
		* @param {array} childProcesses : child_processes to stop
		* @param {integer} i : stepper
		* @returns {Promise} : operation result
		*/
		function _stopProcesses (childProcesses, i = 0) {

			return i >= childProcesses.length ? Promise.resolve() : new Promise((resolve) => {

				childProcesses[i].once("close", () => {

					childProcesses[i].removeAllListeners();

					resolve();

				}).kill();

			}).then(() => {

				return _stopProcesses(childProcesses, i + 1);

			});

		}

// module

module.exports = class CommandLineMediator extends Mediator {

	constructor (opt) {

		super(opt);

		// protected

			this._stepper = 0;
			this._terminals = [];

	}

	_initWorkSpace () {

		return Promise.resolve();

	}

	_releaseWorkSpace () {

		return _stopProcesses(this._terminals.filter((terminal) => {
			return null !== terminal.child_process;
		}).map((terminal) => {
			return terminal.child_process;
		})).then(() => {

			this._stepper = 0;
			this._terminals = [];

		});

	}

	// public

		getAllTerminals () {

			return Promise.resolve(this._terminals.map(formateTerminal));

		}

		getOneTerminal (urlParameters) {

			// check params
			return Promise.resolve().then(() => {

				return checkTerminalNumber(urlParameters);

			// execute
			}).then(() => {

				return Promise.resolve(this._terminals.filter((terminal) => {
					return terminal.number === urlParameters.terminalnumber;
				}).map(formateTerminal)[0] || null);

			});

		}

		openTerminal (urlParameters, bodyParameters) {

			// check params
			return Promise.resolve().then(() => {

				return checkTerminal(bodyParameters);

			// formate
			}).then(() => {

				bodyParameters.options = "object" === typeof bodyParameters.options && null !== bodyParameters.options ?
					bodyParameters.options : {};

					bodyParameters.options.cwd = "string" === typeof bodyParameters.options.cwd ?
						bodyParameters.options.cwd : homedir();

					if (IS_WINDOWS) {

						bodyParameters.options.windowsHide = "boolean" === typeof bodyParameters.options.windowsHide ?
							bodyParameters.options.windowsHide : true;

					}

			// open
			}).then(() => {

				return new Promise((resolve, reject) => {

					let cp = null;
					let ko = null;
					let timeout = setTimeout(() => {

						cp.removeListener("error", ko);
						timeout = null;

						resolve(cp);

					}, 250);

					ko = (err) => {

						if (timeout) {
							clearTimeout(timeout);
							timeout = null;
						}

						reject(err);

					};

					cp = spawn(bodyParameters.shell, [], bodyParameters.options);
					cp.once("error", ko);

				});

			// events
			}).then((cp) => {

				++this._stepper;

				const terminal = {
					"number": this._stepper,
					"name": bodyParameters.name,
					"shell": bodyParameters.shell,
					"options": bodyParameters.options,
					"child_process": cp,
					"currentcommandline": null
				};

				const formated = formateTerminal(terminal);

				// first event

				this.emit("terminal.opened", {
					"terminal": formated
				});

				// next events

				let _err = null;

				cp.on("error", (err) => {
					_err = err;
				});

				cp.stdout.on("data", (data) => {

					this.emit("terminal.stdout", {
						"terminal": formated,
						"content": data.toString()
					});

				});

				cp.stderr.on("data", (data) => {

					this.emit("terminal.stderr", {
						"terminal": formated,
						"content": data.toString()
					});

				});

				cp.on("close", (code) => {

					if (0 === code || null === code) {

						this.emit("terminal.closed", {
							"terminal": formated
						});

					}
					else {

						this.emit("terminal.error", {
							"terminal": formated,
							"error": _err ? _err : new Error("Terminal exited with code \"" + code + "\"")
						});

						this.emit("terminal.closed", {
							"terminal": formated
						});

					}

				});

				this._terminals.push(terminal);

				return Promise.resolve(formated);

			});

		}

		closeTerminal (urlParameters) {

			// check params
			return Promise.resolve().then(() => {

				return checkTerminalNumber(urlParameters);

			// execute
			}).then(() => {

				return Promise.resolve(null);

			});

		}

};
