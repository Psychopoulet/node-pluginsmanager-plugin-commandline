/*
	eslint prefer-destructuring: 0
*/

"use strict";

// deps

	// natives
	const { join } = require("path");
	const { strictEqual } = require("assert");

	// locals
	const getShell = require(join(__dirname, "utils", "getShell.js"));
	const testTerminal = require(join(__dirname, "utils", "testTerminal.js"));
	const TestServer = require(join(__dirname, "utils", "TestServer.js"));
	const Orchestrator = require(join(__dirname, "..", "lib", "Orchestrator.js"));

// consts

	const TEST_NAME = "Test 1";
	const TEST_SHELL = getShell(); // dev or CI

// tests

describe("Terminals / close / Server", () => {

	const orchestrator = new Orchestrator();
	const testServer = new TestServer();

	let number = -1;

	before(() => {

		return testServer.init(orchestrator).then(() => {
			return orchestrator.load();
		}).then(() => {
			return orchestrator.init();
		}).then(() => {

			return testServer.request("/node-pluginsmanager-plugin-terminals/api/terminals", "put", {
				"name": TEST_NAME,
				"shell": TEST_SHELL
			}).then((data) => {

				testTerminal(data.terminal);

				number = data.terminal.number;

			});

		});

	});

	after(() => {

		return testServer.release().then(() => {
			return orchestrator.release();
		}).then(() => {
			return orchestrator.destroy();
		});

	});

	describe("terminalnumber", () => {

		it("should test without terminalnumber", () => {

			return testServer.request("/node-pluginsmanager-plugin-terminals/api/terminals", "delete").then((result) => {

				strictEqual(typeof result, "object", "result is not as expected");

					strictEqual(typeof result.code, "string", "result.code is not as expected");
						strictEqual(result.code, "MISSING_PARAMETER", "result.code is not as expected");

					strictEqual(typeof result.message, "string", "result.message is not as expected");

			});

		});

		it("should test with wrong terminalnumber", () => {

			return testServer.request("/node-pluginsmanager-plugin-terminals/api/terminals/false", "delete").then((result) => {

				strictEqual(typeof result, "object", "result is not as expected");

					strictEqual(typeof result.code, "string", "result.code is not as expected");
						strictEqual(result.code, "WRONG_TYPE_PARAMETER", "result.code is not as expected");

					strictEqual(typeof result.message, "string", "result.message is not as expected");

			});

		});

		it("should test with empty terminalnumber", () => {

			return testServer.request("/node-pluginsmanager-plugin-terminals/api/terminals/0", "delete").then((result) => {

				strictEqual(typeof result, "object", "result is not as expected");

					strictEqual(typeof result.code, "string", "result.code is not as expected");
						strictEqual(result.code, "RANGE_OR_EMPTY_PARAMETER", "result.code is not as expected");

					strictEqual(typeof result.message, "string", "result.message is not as expected");

			});

		});

	});

	describe("execute", () => {

		it("should open a terminal", () => {

			const events = [ "terminal.opened", "terminal.stdout" ];
			let step = 0;

			testServer.onMessage((message) => {

				strictEqual(typeof message, "object", "message is not as expected");

					strictEqual(typeof message.plugin, "string", "message.plugin is not as expected");
					strictEqual(message.plugin, orchestrator._Descriptor.info.title, "message.plugin is not as expected");

					strictEqual(typeof message.command, "string", "message.command is not as expected");
					strictEqual(message.command, events[step], "message.command is not as expected");

					if (events[0] === message.command) {
						++step;
					}

				testTerminal(message.data.terminal);

			});

			return testServer.request("/node-pluginsmanager-plugin-terminals/api/terminals/" + number, "delete").then((result) => {

				strictEqual(typeof result, "object", "result is not as expected");

					strictEqual(typeof result.code, "string", "result.code is not as expected");
						strictEqual(result.code, "MISSING_PARAMETER", "result.code is not as expected");

					strictEqual(typeof result.message, "string", "result.message is not as expected");

			});

		});

	});

});
