"use strict";

// deps

	// natives
	const { join } = require("path");

	// externals
	const { Mediator } = require("node-pluginsmanager-plugin");

	// locals
	const formateTerminal = require(join(__dirname, "utils", "formateTerminal.js"));

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

			return Promise.resolve().then(() => {

				if ("undefined" === typeof urlParameters || null === urlParameters) {
					return Promise.reject(new ReferenceError("Missing \"terminal\" parameter"));
				}
					else if ("object" !== typeof urlParameters) {
						return Promise.reject(new TypeError("\"terminal\" parameter is not an object"));
					}

					else if ("undefined" === typeof urlParameters.number) {
						return Promise.reject(new ReferenceError("Missing \"Terminal number\" parameter"));
					}
						else if ("number" !== typeof urlParameters.number) {
							return Promise.reject(new TypeError("\"Terminal number\" parameter is not a number"));
						}
						else if (0 >= urlParameters.number) {
							return Promise.reject(new RangeError("\"Terminal number\" parameter must be higher than 0"));
						}

				else {
					return Promise.resolve();
				}

			}).then(() => {

				return Promise.resolve(this._terminals.filter((terminal) => {
					return terminal.number === urlParameters.number;
				}).map(formateTerminal)[0] || null);

			});

		}

		openTerminal (urlParameters, bodyParameters) {

			return Promise.resolve().then(() => {

				if ("undefined" === typeof bodyParameters || null === bodyParameters) {
					return Promise.reject(new ReferenceError("Missing \"terminal\" parameter"));
				}
					else if ("object" !== typeof bodyParameters) {
						return Promise.reject(new TypeError("\"terminal\" parameter is not an object"));
					}

					else if ("undefined" === typeof bodyParameters.name) {
						return Promise.reject(new ReferenceError("Missing \"terminal.name\" parameter"));
					}
						else if ("string" !== typeof bodyParameters.name) {
							return Promise.reject(new TypeError("\"terminal.name\" parameter is not a string"));
						}
						else if ("" === bodyParameters.name.trim()) {
							return Promise.reject(new RangeError("\"terminal.name\" parameter is empty"));
						}

					else if ("undefined" === typeof bodyParameters.shell) {
						return Promise.reject(new ReferenceError("Missing \"terminal.shell\" parameter"));
					}
						else if ("string" !== typeof bodyParameters.shell) {
							return Promise.reject(new TypeError("\"terminal.shell\" parameter is not a string"));
						}
						else if ("" === bodyParameters.shell.trim()) {
							return Promise.reject(new RangeError("\"terminal.shell\" parameter is empty"));
						}

				else {
					return Promise.resolve();
				}

			}).then(() => {

				++this._stepper;

				const terminal = {
					"number": this._stepper,
					"name": bodyParameters.name,
					"shell": bodyParameters.shell,
					"options": bodyParameters.options,
					"child_process": null,
					"currentcommandline": null
				};

				this._terminals.push(terminal);

				return Promise.resolve(formateTerminal(terminal));

			}).then((terminal) => {

				this.emit("terminal.created", terminal);

				return Promise.resolve(terminal);

			});

		}

		closeTerminal () {

			return Promise.resolve(null);

		}

};
