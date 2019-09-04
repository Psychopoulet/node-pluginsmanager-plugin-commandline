"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals
	const formateTerminalOptions = require(join(__dirname, "formateTerminalOptions.js"));
	const formateCommandLine = require(join(__dirname, "formateCommandLine.js"));

// module

module.exports = function formateTerminal (terminal) {

	const result = {
		"number": terminal.number,
		"name": terminal.name,
		"shell": terminal.shell,
		"options": formateTerminalOptions(terminal.options)
	};

		if (terminal.currentcommandline) {
			result.currentcommandline = formateCommandLine(terminal.currentcommandline);
		}

	return result;

};
