"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals
	const formateTerminalOptions = require(join(__dirname, "formateTerminalOptions.js"));

// module

module.exports = function formateTerminal (terminal) {

	const result = {
		"number": terminal.number,
		"name": terminal.name,
		"shell": terminal.shell,
		"options": formateTerminalOptions(terminal.options)
	};

		if (terminal.currentcommandline) {
			result.currentcommandline = terminal.currentcommandline;
		}

	return result;

};
