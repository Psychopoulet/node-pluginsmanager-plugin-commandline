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

		it("should test wrong data", () => {

			return testServer.request("/node-pluginsmanager-plugin-terminals/api/terminals/test", "delete").then((result) => {

				strictEqual(typeof result, "object", "result is not as expected");

					strictEqual(typeof result.code, "string", "result.code is not as expected");
						strictEqual(result.code, "WRONG_TYPE_PARAMETER", "result.code is not as expected");

					strictEqual(typeof result.message, "string", "result.message is not as expected");

			});

		});

		it("should test with empty terminal", () => {

			return testServer.request("/node-pluginsmanager-plugin-terminals/api/terminals/0", "delete").then((result) => {

				strictEqual(typeof result, "object", "result is not as expected");

					strictEqual(typeof result.code, "string", "result.code is not as expected");
						strictEqual(result.code, "RANGE_OR_EMPTY_PARAMETER", "result.code is not as expected");

					strictEqual(typeof result.message, "string", "result.message is not as expected");

			});

		});

		it("should test with inexistant terminal", () => {

			return testServer.request("/node-pluginsmanager-plugin-terminals/api/terminals/1", "delete");

		});

	});

	describe("execute", () => {

		it("should close a terminal", (done) => {

			let success = 0;

			/**
			* Fire end of test
			* @returns {Promise} : operation result
			*/
			function _end () {

				++success;
				if (2 === success) {
					done();
				}

			}

			testServer.onMessage((message) => {

				strictEqual(typeof message, "object", "message is not as expected");

					strictEqual(typeof message.plugin, "string", "message.plugin is not as expected");
					strictEqual(message.plugin, orchestrator._Descriptor.info.title, "message.plugin is not as expected");

					strictEqual(typeof message.command, "string", "message.command is not as expected");

				testTerminal(message.data.terminal);

				if ("terminal.closed" === message.command) {
					_end();
				}

			});

			testServer.request("/node-pluginsmanager-plugin-terminals/api/terminals", "put", {
				"name": TEST_NAME,
				"shell": TEST_SHELL
			}).then((terminal) => {

				testTerminal(terminal);

				return testServer.request("/node-pluginsmanager-plugin-terminals/api/terminals/" + terminal.number, "delete");

			}).then((data) => {

				strictEqual(typeof data, "undefined", "returned data is not as expected");

				return testServer.request("/node-pluginsmanager-plugin-terminals/api/terminals", "get");

			}).then((terminals) => {

				strictEqual(typeof terminals, "object", "terminals is not as expected");
				strictEqual(terminals instanceof Array, true, "terminals is not as expected");
					strictEqual(terminals.length, 0, "terminals is not as expected");

				_end();

			}).catch(done);

		});

	});

});
