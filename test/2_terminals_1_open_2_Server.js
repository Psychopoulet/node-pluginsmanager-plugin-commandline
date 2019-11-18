"use strict";

// deps

	// natives
	const { join } = require("path");
	const { platform } = require("os");
	const { strictEqual } = require("assert");

	// externals
	const colors = require("colors");

	// locals
	const getShell = require(join(__dirname, "utils", "getShell.js"));
	const testTerminal = require(join(__dirname, "utils", "testTerminal.js"));
	const TestServer = require(join(__dirname, "utils", "TestServer.js"));
	const Orchestrator = require(join(__dirname, "..", "lib", "Orchestrator.js"));

// consts

	const MAX_LENGTH_LOGS = 250;

	const TEST_NAME = "Test 1";
	const TEST_SHELL = getShell(); // dev or CI
	const IS_WINDOWS = "win32" === platform();

// tests

describe("Terminals / open / Server", () => {

	const orchestrator = new Orchestrator({
		"logger": (type, log) => {

			let message = MAX_LENGTH_LOGS < log.length ? log.substr(0, MAX_LENGTH_LOGS) + "..." : log;

			switch (type) {

				case "info":
					message = colors.cyan(message);
				break;

				case "success":
					message = colors.green(message);
				break;

				case "warning":
					message = colors.yellow(message);
				break;

				case "error":
					message = colors.red(message);
				break;

				default:
					// nothing to do here
				break;

			}

			(0, console).log(message);

		}
	});

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

	it("should test without data", () => {

		return testServer.request("/node-pluginsmanager-plugin-terminals/api/terminals", "put").then((result) => {

			strictEqual(typeof result, "object", "result is not as expected");

				strictEqual(typeof result.code, "string", "result.code is not as expected");
					strictEqual(result.code, "MISSING_PARAMETER", "result.code is not as expected");

				strictEqual(typeof result.message, "string", "result.message is not as expected");

		});

	});

	describe("name", () => {

		it("should test without data", () => {

			return testServer.request("/node-pluginsmanager-plugin-terminals/api/terminals", "put", {}).then((result) => {

				strictEqual(typeof result, "object", "result is not as expected");

					strictEqual(typeof result.code, "string", "result.code is not as expected");
						strictEqual(result.code, "MISSING_PARAMETER", "result.code is not as expected");

					strictEqual(typeof result.message, "string", "result.message is not as expected");

			});

		});

		it("should test with wrong type data", () => {

			return testServer.request("/node-pluginsmanager-plugin-terminals/api/terminals", "put", {
				"name": false,
				"shell": TEST_SHELL
			}).then((result) => {

				strictEqual(typeof result, "object", "result is not as expected");

					strictEqual(typeof result.code, "string", "result.code is not as expected");
						strictEqual(result.code, "WRONG_TYPE_PARAMETER", "result.code is not as expected");

					strictEqual(typeof result.message, "string", "result.message is not as expected");

			});

		});

		it("should test with empty data", () => {

			return testServer.request("/node-pluginsmanager-plugin-terminals/api/terminals", "put", {
				"name": "",
				"shell": TEST_SHELL
			}).then((result) => {

				strictEqual(typeof result, "object", "result is not as expected");

					strictEqual(typeof result.code, "string", "result.code is not as expected");
						strictEqual(result.code, "RANGE_OR_EMPTY_PARAMETER", "result.code is not as expected");

					strictEqual(typeof result.message, "string", "result.message is not as expected");

			});

		});

		it("should test with too short data", () => {

			return testServer.request("/node-pluginsmanager-plugin-terminals/api/terminals", "put", {
				"name": "te",
				"shell": TEST_SHELL
			}).then((result) => {

				strictEqual(typeof result, "object", "result is not as expected");

					strictEqual(typeof result.code, "string", "result.code is not as expected");
						strictEqual(result.code, "RANGE_OR_EMPTY_PARAMETER", "result.code is not as expected");

					strictEqual(typeof result.message, "string", "result.message is not as expected");

			});

		});

		it("should test with too long data", () => {

			return testServer.request("/node-pluginsmanager-plugin-terminals/api/terminals", "put", {
				"name": "testtesttesttesttesttesttesttesttesttesttesttesttesttest",
				"shell": TEST_SHELL
			}).then((result) => {

				strictEqual(typeof result, "object", "result is not as expected");

					strictEqual(typeof result.code, "string", "result.code is not as expected");
						strictEqual(result.code, "RANGE_OR_EMPTY_PARAMETER", "result.code is not as expected");

					strictEqual(typeof result.message, "string", "result.message is not as expected");

			});

		});

	});

	describe("shell", () => {

		it("should test without data", () => {

			return testServer.request("/node-pluginsmanager-plugin-terminals/api/terminals", "put", {
				"name": TEST_NAME
			}).then((result) => {

				strictEqual(typeof result, "object", "result is not as expected");

					strictEqual(typeof result.code, "string", "result.code is not as expected");
						strictEqual(result.code, "MISSING_PARAMETER", "result.code is not as expected");

					strictEqual(typeof result.message, "string", "result.message is not as expected");

			});

		});

		it("should test with wrong type data", () => {

			return testServer.request("/node-pluginsmanager-plugin-terminals/api/terminals", "put", {
				"name": TEST_NAME,
				"shell": false
			}).then((result) => {

				strictEqual(typeof result, "object", "result is not as expected");

					strictEqual(typeof result.code, "string", "result.code is not as expected");
						strictEqual(result.code, "WRONG_TYPE_PARAMETER", "result.code is not as expected");

					strictEqual(typeof result.message, "string", "result.message is not as expected");

			});

		});

		it("should test with empty data", () => {

			return testServer.request("/node-pluginsmanager-plugin-terminals/api/terminals", "put", {
				"name": TEST_NAME,
				"shell": ""
			}).then((result) => {

				strictEqual(typeof result, "object", "result is not as expected");

					strictEqual(typeof result.code, "string", "result.code is not as expected");
						strictEqual(result.code, "RANGE_OR_EMPTY_PARAMETER", "result.code is not as expected");

					strictEqual(typeof result.message, "string", "result.message is not as expected");

			});

		});

		it("should test with too short data", () => {

			return testServer.request("/node-pluginsmanager-plugin-terminals/api/terminals", "put", {
				"name": TEST_NAME,
				"shell": "te"
			}).then((result) => {

				strictEqual(typeof result, "object", "result is not as expected");

					strictEqual(typeof result.code, "string", "result.code is not as expected");
						strictEqual(result.code, "RANGE_OR_EMPTY_PARAMETER", "result.code is not as expected");

					strictEqual(typeof result.message, "string", "result.message is not as expected");

			});

		});

		it("should test with too long data", () => {

			return testServer.request("/node-pluginsmanager-plugin-terminals/api/terminals", "put", {
				"name": TEST_NAME,
				"shell": "testtesttesttesttesttesttest"
			}).then((result) => {

				strictEqual(typeof result, "object", "result is not as expected");

					strictEqual(typeof result.code, "string", "result.code is not as expected");
						strictEqual(result.code, "RANGE_OR_EMPTY_PARAMETER", "result.code is not as expected");

					strictEqual(typeof result.message, "string", "result.message is not as expected");

			});

		});

		it("should test with wrong data", () => {

			return testServer.request("/node-pluginsmanager-plugin-terminals/api/terminals", "put", {
				"name": TEST_NAME,
				"shell": "thisisatest"
			}).then((result) => {

				strictEqual(typeof result, "object", "result is not as expected");

					strictEqual(typeof result.code, "string", "result.code is not as expected");
						strictEqual(result.code, "RANGE_OR_EMPTY_PARAMETER", "result.code is not as expected");

					strictEqual(typeof result.message, "string", "result.message is not as expected");

			});

		});

	});

	describe("execute", () => {

		it("should open a terminal", (done) => {

			let success = 0;

			/**
			* Fire end of test
			* @returns {Promise} : operation result
			*/
			function _end () {

				++success;
				if (2 === success) {
					testServer.removeMessageListeners();
					done();
				}

			}

			testServer.onMessage((message) => {

				strictEqual(typeof message, "object", "message is not as expected");

					strictEqual(typeof message.plugin, "string", "message.plugin is not as expected");
					strictEqual(message.plugin, orchestrator._Descriptor.info.title, "message.plugin is not as expected");

					strictEqual(typeof message.command, "string", "message.command is not as expected");

				testTerminal(message.data.terminal);

				if ("terminal.opened" === message.command) {
					_end();
				}

			});

			testServer.request("/node-pluginsmanager-plugin-terminals/api/terminals", "put", {
				"name": TEST_NAME,
				"shell": TEST_SHELL
			}).then((terminal) => {

				testTerminal(terminal);

				return testServer.request("/node-pluginsmanager-plugin-terminals/api/terminals", "get");

			}).then((terminals) => {

				strictEqual(typeof terminals, "object", "terminals is not as expected");
				strictEqual(terminals instanceof Array, true, "terminals is not as expected");
					strictEqual(terminals.length, 1, "terminals is not as expected");

				testTerminal(terminals[0]);

				_end();

			}).catch(done);

		});

		it("should open a terminal with detached option", () => {

			return testServer.request("/node-pluginsmanager-plugin-terminals/api/terminals", "put", {
				"name": TEST_NAME,
				"shell": TEST_SHELL,
				"options": {
					"detached": true
				}
			}).then((terminal) => {

				testTerminal(terminal, 2);

			});

		});

		if (!IS_WINDOWS) {

			it("should open a terminal with uid option", () => {

				return testServer.request("/node-pluginsmanager-plugin-terminals/api/terminals", "put", {
					"name": TEST_NAME,
					"shell": TEST_SHELL,
					"options": {
						"uid": (0, process).getuid()
					}
				}).then((terminal) => {

					testTerminal(terminal, 3);

				});

			});

			it("should open a terminal with gid option", () => {

				return testServer.request("/node-pluginsmanager-plugin-terminals/api/terminals", "put", {
					"name": TEST_NAME,
					"shell": TEST_SHELL,
					"options": {
						"gid": (0, process).getgid()
					}
				}).then((terminal) => {

					testTerminal(terminal, 4);

				});

			});

		}

	});

});
