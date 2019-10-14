"use strict";

// deps

	// externals
	const {
		checkNonEmptyObject,
		checkNonEmptyString
	} = require("node-pluginsmanager-plugin");

// module

module.exports = function checkTerminal (terminal) {

	return Promise.resolve().then(() => {

		return checkNonEmptyObject("terminal", terminal);

	}).then(() => {

		return checkNonEmptyString("terminal.name", terminal.name);

	}).then(() => {

		return checkNonEmptyString("terminal.shell", terminal.shell);

	});

};
