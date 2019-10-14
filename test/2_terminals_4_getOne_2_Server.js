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

describe("Terminals / getOne / Server", () => {

	const orchestrator = new Orchestrator();
	const testServer = new TestServer();

	before(() => {

		return orchestrator.load().then(() => {
			return orchestrator.init();
		}).then(() => {
			return testServer.init(orchestrator);
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

		it("should test with wrong data", () => {

			return testServer.request("/node-pluginsmanager-plugin-terminals/api/terminals/test", "get").then((result) => {

				strictEqual(typeof result, "object", "result is not as expected");

					strictEqual(typeof result.code, "string", "result.code is not as expected");
						strictEqual(result.code, "WRONG_TYPE_PARAMETER", "result.code is not as expected");

					strictEqual(typeof result.message, "string", "result.message is not as expected");

			});

		});

		it("should test with empty terminal", () => {

			return testServer.request("/node-pluginsmanager-plugin-terminals/api/terminals/0", "get").then((result) => {

				strictEqual(typeof result, "object", "result is not as expected");

					strictEqual(typeof result.code, "string", "result.code is not as expected");
						strictEqual(result.code, "RANGE_OR_EMPTY_PARAMETER", "result.code is not as expected");

					strictEqual(typeof result.message, "string", "result.message is not as expected");

			});

		});

		it("should test with inexistant data", () => {

			return testServer.request("/node-pluginsmanager-plugin-terminals/api/terminals/1", "get").then((result) => {

				strictEqual(typeof result, "object", "result is not as expected");
					strictEqual(result, null, "result is not as expected");

			});

		});

	});

	describe("execute", () => {

		it("should get one data", () => {

			return testServer.request("/node-pluginsmanager-plugin-terminals/api/terminals", "put", {
				"name": TEST_NAME,
				"shell": TEST_SHELL
			}).then((terminal) => {

				testTerminal(terminal);

				return testServer.request("/node-pluginsmanager-plugin-terminals/api/terminals/" + terminal.number, "get");

			}).then((terminal) => {

				testTerminal(terminal);

			});

		});

	});

});
