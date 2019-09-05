"use strict";

// deps

	// natives
	const { platform } = require("os");

// consts

	const SHELL = "win32" === platform() ? "cmd" : "bash";

// module

module.exports = function getShell () {

	return SHELL;

};
