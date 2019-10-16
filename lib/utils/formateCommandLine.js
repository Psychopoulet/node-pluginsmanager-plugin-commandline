"use strict";

// module

module.exports = function formateCommandLine (commandLine) {

	return {
		"command": commandLine.command,
		"arguments": commandLine.arguments
	};

};
