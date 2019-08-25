"use strict";

// deps

	// natives
	const { spawn } = require("child_process");

	// externals
	const { Mediator } = require("node-pluginsmanager-plugin");

// protected

	/**
	* Stop all command lines
	* @param {array} commandLines : command lines to stop
	* @param {integer} i : stepper
	* @returns {Promise} : operation result
	*/
	function _stopCommandLines (commandLines, i = 0) {

		return i >= commandLines.length ? Promise.resolve() : new Promise((resolve) => {

			commandLines[i].cmd.once("close", () => {

				commandLines[i].cmd.removeAllListeners();

				resolve();

			}).kill();

		}).then(() => {

			return _stopCommandLines(commandLines, i + 1);

		});

	}

// module

module.exports = class CommandLineMediator extends Mediator {

	constructor (opt) {

		super(opt);

		// protected

			this._stepper = 0;
			this._commandLines = [];

	}

	_initWorkSpace () {

		return Promise.resolve();

	}

	_releaseWorkSpace () {

		return _stopCommandLines(this._commandLines).then(() => {

			this._stepper = 0;
			this._commandLines = [];

		});

	}

	// public

		getAll () {

			return Promise.resolve(this._commandLines.map((commandLine) => {

				return {
					"number": commandLine.number,
					"name": commandLine.name
				};

			}));

		}

		create (data) {

			if ("undefined" === typeof data) {
				return Promise.reject(new ReferenceError("Missing \"data\" parameter"));
			}
				else if ("object" !== typeof data) {
					return Promise.reject(new TypeError("\"data\" parameter is not an object"));
				}

				else if ("undefined" === typeof data.name) {
					return Promise.reject(new ReferenceError("Missing \"data.name\" parameter"));
				}
					else if ("string" !== typeof data.name) {
						return Promise.reject(new TypeError("\"data.name\" parameter is not a string"));
					}
					else if ("" === data.name.trim()) {
						return Promise.reject(new RangeError("\"data.name\" parameter is empty"));
					}

			else {

				const cmd = spawn("cmd");

				++this._stepper;

				this._commandLines.push({
					"number": this._stepper,
					"name": data.name,
					"cmd": cmd
				});

				return Promise.resolve();

			}

		}

};
