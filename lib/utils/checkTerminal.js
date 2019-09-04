"use strict";

// module

module.exports = function checkTerminal (terminal) {

	return Promise.resolve().then(() => {

		if ("undefined" === typeof terminal || null === terminal) {
			return Promise.reject(new ReferenceError("Missing \"terminal\" parameter"));
		}
			else if ("object" !== typeof terminal) {
				return Promise.reject(new TypeError("\"terminal\" parameter is not an object"));
			}

		else {
			return Promise.resolve();
		}

	// check name
	}).then(() => {

		if ("undefined" === typeof terminal.name) {
			return Promise.reject(new ReferenceError("Missing \"terminal.name\" parameter"));
		}
			else if ("string" !== typeof terminal.name) {
				return Promise.reject(new TypeError("\"terminal.name\" parameter is not a string"));
			}
			else if ("" === terminal.name.trim()) {
				return Promise.reject(new RangeError("\"terminal.name\" parameter is empty"));
			}

		else {
			return Promise.resolve();
		}

	// check shell
	}).then(() => {

		if ("undefined" === typeof terminal.shell) {
			return Promise.reject(new ReferenceError("Missing \"terminal.shell\" parameter"));
		}
			else if ("string" !== typeof terminal.shell) {
				return Promise.reject(new TypeError("\"terminal.shell\" parameter is not a string"));
			}
			else if ("" === terminal.shell.trim()) {
				return Promise.reject(new RangeError("\"terminal.shell\" parameter is empty"));
			}

		else {
			return Promise.resolve();
		}

	});

};
