"use strict";

// module

module.exports = function checkTerminal (terminal) {

	return Promise.resolve().then(() => {

		if ("undefined" === typeof terminal || null === terminal) {
			return Promise.reject(new ReferenceError("Missing parameters"));
		}
			else if ("object" !== typeof terminal) {
				return Promise.reject(new TypeError("Parameters is not an object"));
			}

		else {
			return Promise.resolve();
		}

	// check name
	}).then(() => {

		if ("undefined" === typeof terminal.name) {
			return Promise.reject(new ReferenceError("Missing \"Terminal name\" parameter"));
		}
			else if ("string" !== typeof terminal.name) {
				return Promise.reject(new TypeError("\"Terminal name\" parameter is not a string"));
			}
			else if ("" === terminal.name.trim()) {
				return Promise.reject(new RangeError("\"Terminal name\" parameter is empty"));
			}

		else {
			return Promise.resolve();
		}

	// check shell
	}).then(() => {

		if ("undefined" === typeof terminal.shell) {
			return Promise.reject(new ReferenceError("Missing \"Terminal shell\" parameter"));
		}
			else if ("string" !== typeof terminal.shell) {
				return Promise.reject(new TypeError("\"Terminal shell\" parameter is not a string"));
			}
			else if ("" === terminal.shell.trim()) {
				return Promise.reject(new RangeError("\"Terminal shell\" parameter is empty"));
			}

		else {
			return Promise.resolve();
		}

	});

};
