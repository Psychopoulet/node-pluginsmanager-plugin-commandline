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
	const stopProcesses = require(join(__dirname, "utils", "stopProcesses.js"));

// consts

	const IS_WINDOWS = "win32" === platform();

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

		return stopProcesses(this._terminals.filter((terminal) => {
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

				const indexOf = this._terminals.findIndex((terminal) => {
					return terminal.number === urlParameters.terminalnumber;
				});

				if (-1 >= indexOf) {
					return Promise.resolve();
				}
				else {

					const terminal = this._terminals[indexOf];

					return stopProcesses([ terminal.child_process ]).then(() => {

						this._terminals.splice(indexOf, 1);

						return Promise.resolve();

					});

				}

			});

		}

};
