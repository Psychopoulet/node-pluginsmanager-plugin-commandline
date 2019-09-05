"use strict";

// deps

	// natives
	const { join } = require("path");
	const { strictEqual } = require("assert");
	const { platform } = require("os");

	// locals
	const getShell = require(join(__dirname, "getShell.js"));

// consts

	const IS_WINDOWS = "win32" === platform();

	const TEST_NAME = "Test 1";
	const TEST_SHELL = getShell(); // dev or CI

// module

module.exports = function testTerminal (terminal) {

	strictEqual(typeof terminal, "object", "terminal is not as expected");

		strictEqual(typeof terminal.number, "number", "terminal.number is not as expected");
			strictEqual(terminal.number, 1, "terminal.number is not as expected");

		strictEqual(typeof terminal.name, "string", "terminal.name is not as expected");
			strictEqual(terminal.name, TEST_NAME, "terminal.name is not as expected");

		strictEqual(typeof terminal.shell, "string", "terminal.shell is not as expected");
			strictEqual(terminal.shell, TEST_SHELL, "terminal.shell is not as expected");

		strictEqual(typeof terminal.options, "object", "terminal.options is not as expected");

			strictEqual(typeof terminal.options.cwd, "string", "terminal.options.cwd is not as expected");

			if (IS_WINDOWS) {

				strictEqual(typeof terminal.options.windowsHide, "boolean", "terminal.options.windowsHide is not as expected");
					strictEqual(terminal.options.windowsHide, true, "terminal.options.windowsHide is not as expected");

			}

};
