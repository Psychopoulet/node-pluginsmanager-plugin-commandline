"use strict";

// deps

	// natives
	const { join } = require("path");
	const { EOL } = require("os");
	const { strictEqual } = require("assert");

	// locals
	const getShell = require(join(__dirname, "utils", "getShell.js"));
	const testTerminal = require(join(__dirname, "utils", "testTerminal.js"));
	const TestServer = require(join(__dirname, "utils", "TestServer.js"));
	const Orchestrator = require(join(__dirname, "..", "lib", "Orchestrator.js"));

// consts

	const TEST_NAME = "Test 1";
	const TEST_SHELL = getShell(); // dev or CI

// private

	// attributes

		let _number = 0;
		let _url = "";

// tests

describe("Terminals / commandLine / Server", () => {

	const orchestrator = new Orchestrator();
	const testServer = new TestServer();

	before(() => {

		return orchestrator.load().then(() => {
			return orchestrator.init();
		}).then(() => {
			return testServer.init(orchestrator);
		}).then(() => {

			return testServer.request("/node-pluginsmanager-plugin-terminals/api/terminals", "put", {
				"name": TEST_NAME,
				"shell": TEST_SHELL
			}).then((terminal) => {

				_number = terminal.number;
				_url = "/node-pluginsmanager-plugin-terminals/api/terminals/" + _number + "/commandline";

			});

		});

	});

	after(() => {

		return testServer.request("/node-pluginsmanager-plugin-terminals/api/terminals/" + _number, "delete").then(() => {
			return testServer.release();
		}).then(() => {
			return orchestrator.release();
		}).then(() => {
			return orchestrator.destroy();
		});

	});

	describe("terminalnumber", () => {

		it("should test without data", () => {

			return testServer.request(_url, "put", {
				"test": "test"
			}).then((result) => {

				strictEqual(typeof result, "object", "result is not as expected");

					strictEqual(typeof result.code, "string", "result.code is not as expected");
						strictEqual(result.code, "MISSING_PARAMETER", "result.code is not as expected");

					strictEqual(typeof result.message, "string", "result.message is not as expected");

			});

		});

		it("should test with wrong data", () => {

			return testServer.request(_url, "put", {
				"commandline": 1
			}).then((result) => {

				strictEqual(typeof result, "object", "result is not as expected");

					strictEqual(typeof result.code, "string", "result.code is not as expected");
						strictEqual(result.code, "WRONG_TYPE_PARAMETER", "result.code is not as expected");

					strictEqual(typeof result.message, "string", "result.message is not as expected");

			});

		});

		it("should test with empty data", () => {

			return testServer.request(_url, "put", {
				"commandline": ""
			}).then((result) => {

				strictEqual(typeof result, "object", "result is not as expected");

					strictEqual(typeof result.code, "string", "result.code is not as expected");
						strictEqual(result.code, "RANGE_OR_EMPTY_PARAMETER", "result.code is not as expected");

					strictEqual(typeof result.message, "string", "result.message is not as expected");

			});

		});

	});

	describe("execute", () => {

		it("should execute command line", (done) => {

			let success = 0;

			/**
			* Fire end of test
			* @returns {Promise} : operation result
			*/
			function _end () {

				++success;
				if (2 === success) {
					// testServer.removeMessageListeners();
					done();
				}

			}

			testServer.onMessage((message) => {

				strictEqual(typeof message, "object", "message is not as expected");

					strictEqual(typeof message.plugin, "string", "message.plugin is not as expected");
					strictEqual(message.plugin, orchestrator._Descriptor.info.title, "message.plugin is not as expected");

					strictEqual(typeof message.command, "string", "message.command is not as expected");

				testTerminal(message.data.terminal);

				strictEqual(message.data.terminal.number, _number, "message.terminal is not as expected");

				if ("terminal.stdout" === message.command) {
					(0, console).log("message", message.command, message.data.content.replace(EOL, ""));
				}
				else if ("terminal.error" === message.command) {
					(0, console).log("message", message.command, message.data.error.replace(EOL, ""));
				}
				else {
					(0, console).log("message", message.command);
				}

				_end();

			});

			testServer.request(_url, "put", {
				"commandline": "node -v"
			}).then(() => {

				return testServer.request("/node-pluginsmanager-plugin-terminals/api/terminals", "get");

			}).then((terminals) => {

				strictEqual(terminals.length, 1, "terminals length is not as expected");

				testTerminal(terminals[0]);

				_end();

			}).catch(done);

		});

	});

});
