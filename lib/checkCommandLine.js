"use strict";

// module

module.exports = function checkCommandLine (commandLine) {

	return Promise.resolve().then(() => {

		if ("undefined" === typeof commandLine || null === commandLine) {
			return Promise.reject(new ReferenceError("Missing \"commandLine\" parameter"));
		}
			else if ("object" !== typeof commandLine) {
				return Promise.reject(new TypeError("\"commandLine\" parameter is not an object"));
			}

		else {
			return Promise.resolve();
		}

	// check command
	}).then(() => {

		if ("undefined" === typeof commandLine.command) {
			return Promise.reject(new ReferenceError("Missing \"commandLine.command\" parameter"));
		}
			else if ("string" !== typeof commandLine.command) {
				return Promise.reject(new TypeError("\"commandLine.command\" parameter is not a string"));
			}
			else if ("" === commandLine.command.trim()) {
				return Promise.reject(new RangeError("\"commandLine.command\" parameter is empty"));
			}

		else {
			return Promise.resolve();
		}

	// check arguments
	}).then(() => {

		if ("undefined" !== typeof commandLine.arguments) {

			if ("object" !== typeof commandLine.arguments || !(commandLine.arguments instanceof Array)) {
				return Promise.reject(new TypeError("\"commandLine.arguments\" parameter is not an array"));
			}
			else {

				for (let i = 0; i < commandLine.arguments.length; ++i) {

					if ("string" !== typeof commandLine.arguments[i]) {
						return Promise.reject(new TypeError("\"commandLine.arguments[" + i + "]\" parameter is not a string"));
					}
					else if ("" === commandLine.arguments[i].trim()) {
						return Promise.reject(new RangeError("\"commandLine.arguments[" + i + "]\" parameter is empty"));
					}

				}

				return Promise.resolve();

			}

		}

		else {
			return Promise.resolve();
		}

	// check options
	}).then(() => {

		if ("undefined" !== typeof commandLine.options) {

			if ("object" !== typeof commandLine.options) {
				return Promise.reject(new TypeError("\"commandLine.options\" parameter is not an object"));
			}
			else {
				return Promise.resolve();
			}

		}

		else {
			return Promise.resolve();
		}

	});

};
