"use strict";

// deps

	// natives
	const { join } = require("path");

	// externals
	const { Mediator } = require("node-pluginsmanager-plugin");

	// locals
	const checkCommandLine = require(join(__dirname, "checkCommandLine.js"));

// protected

	/**
	* Stop all command lines
	* @param {array} commandLines : command lines to stop
	* @param {integer} i : stepper
	* @returns {Promise} : operation result
	*/
	function _stopCommandLines (commandLines, i = 0) {

		return i >= commandLines.length ? Promise.resolve() : new Promise((resolve) => {

			commandLines[i].process.once("close", () => {

				commandLines[i].process.removeAllListeners();

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

		create (urlParameters, bodyParameters) {

			return checkCommandLine(bodyParameters);

		}

};
