"use strict";

// deps

	// natives
	const { join } = require("path");
	const { strictEqual } = require("assert");
	const { platform } = require("os");

	// locals
	const TestServer = require(join(__dirname, "utils", "TestServer.js"));
	const Orchestrator = require(join(__dirname, "..", "lib", "Orchestrator.js"));

// consts

	const TEST_NAME = "Test 1";
	const TEST_SHELL = "cmd";

	const IS_WINDOWS = "win32" === platform();

// private

	// methods

		/**
		* Test terminal
		* @param {object} terminal : terminal to test
		* @returns {void}
		*/
		function _testTerminal (terminal) {

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

		}

// tests

describe("Terminals / getAll", () => {

	describe("Mediator", () => {

		const orchestrator = new Orchestrator();
		const testServer = new TestServer();

		before(() => {

			return orchestrator.load().then(() => {
				return orchestrator.init();
			}).then(() => {
				return testServer.init(orchestrator)
			});

		});

		after(() => {

			return testServer.release().then(() => {
				return orchestrator.release();
			}).then(() => {
				return orchestrator.destroy();
			});

		});

		it("should test without data", (done) => {

			orchestrator._Mediator.openTerminal().then(() => {
				done(new Error("There is no generated Error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated Error is not as expected");
				strictEqual(err instanceof ReferenceError, true, "Generated Error is not as expected");

				done();

			});

		});

		it("should test wrong data", (done) => {

			orchestrator._Mediator.openTerminal(null, false).then(() => {
				done(new Error("There is no generated Error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated Error is not as expected");
				strictEqual(err instanceof TypeError, true, "Generated Error is not as expected");

				done();

			});

		});

		describe("name", () => {

			it("should test without name", (done) => {

				orchestrator._Mediator.openTerminal(null, {}).then(() => {
					done(new Error("There is no generated Error"));
				}).catch((err) => {

					strictEqual(typeof err, "object", "Generated Error is not as expected");
					strictEqual(err instanceof ReferenceError, true, "Generated Error is not as expected");

					done();

				});

			});

			it("should test with wrong name", (done) => {

				orchestrator._Mediator.openTerminal(null, {
					"name": false
				}).then(() => {
					done(new Error("There is no generated Error"));
				}).catch((err) => {

					strictEqual(typeof err, "object", "Generated Error is not as expected");
					strictEqual(err instanceof TypeError, true, "Generated Error is not as expected");

					done();

				});

			});

			it("should test with empty name", (done) => {

				orchestrator._Mediator.openTerminal(null, {
					"name": ""
				}).then(() => {
					done(new Error("There is no generated Error"));
				}).catch((err) => {

					strictEqual(typeof err, "object", "Generated Error is not as expected");
					strictEqual(err instanceof RangeError, true, "Generated Error is not as expected");

					done();

				});

			});

		});

		describe("shell", () => {

			it("should test without shell", (done) => {

				orchestrator._Mediator.openTerminal(null, {
					"name": TEST_NAME
				}).then(() => {
					done(new Error("There is no generated Error"));
				}).catch((err) => {

					strictEqual(typeof err, "object", "Generated Error is not as expected");
					strictEqual(err instanceof ReferenceError, true, "Generated Error is not as expected");

					done();

				});

			});

			it("should test with wrong shell", (done) => {

				orchestrator._Mediator.openTerminal(null, {
					"name": TEST_NAME,
					"shell": false
				}).then(() => {
					done(new Error("There is no generated Error"));
				}).catch((err) => {

					strictEqual(typeof err, "object", "Generated Error is not as expected");
					strictEqual(err instanceof TypeError, true, "Generated Error is not as expected");

					done();

				});

			});

			it("should test with empty shell", (done) => {

				orchestrator._Mediator.openTerminal(null, {
					"name": TEST_NAME,
					"shell": ""
				}).then(() => {
					done(new Error("There is no generated Error"));
				}).catch((err) => {

					strictEqual(typeof err, "object", "Generated Error is not as expected");
					strictEqual(err instanceof RangeError, true, "Generated Error is not as expected");

					done();

				});

			});

			it("should test with wrong shell", (done) => {

				orchestrator._Mediator.openTerminal(null, {
					"name": TEST_NAME,
					"shell": "acazjcnamzcmoazc"
				}).then(() => {
					done(new Error("There is no generated Error"));
				}).catch((err) => {

					strictEqual(typeof err, "object", "Generated Error is not as expected");
					strictEqual(err instanceof Error, true, "Generated Error is not as expected");

					done();

				});

			});

		});

		describe("execute", () => {

			it("should open a terminal", () => {

				orchestrator._Mediator.once("terminal.opened", (data) => {
					_testTerminal(data.terminal);
				});

				return orchestrator._Mediator.openTerminal(null, {
					"name": TEST_NAME,
					"shell": TEST_SHELL
				}).then((terminal) => {

					_testTerminal(terminal);

					return orchestrator._Mediator.getAllTerminals();

				}).then((terminals) => {

					strictEqual(typeof terminals, "object", "terminals is not as expected");
					strictEqual(terminals instanceof Array, true, "terminals is not as expected");
						strictEqual(terminals.length, 1, "terminals is not as expected");

					_testTerminal(terminals[0]);

				});

			});

		});

	});

	describe("Server", () => {

		const orchestrator = new Orchestrator();
		const testServer = new TestServer();

		before(() => {

			return testServer.init(orchestrator).then(() => {
				return orchestrator.load();
			}).then(() => {
				return orchestrator.init();
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

		it("should test wrong data", () => {

			return testServer.request("/node-pluginsmanager-plugin-terminals/api/terminals", "put", false).then((result) => {

				strictEqual(typeof result, "object", "result is not as expected");

					strictEqual(typeof result.code, "string", "result.code is not as expected");
						strictEqual(result.code, "WRONG_TYPE_PARAMETER", "result.code is not as expected");

					strictEqual(typeof result.message, "string", "result.message is not as expected");

			});

		});

		describe("name", () => {

			it("should test without name", () => {

				return testServer.request("/node-pluginsmanager-plugin-terminals/api/terminals", "put", {}).then((result) => {

					strictEqual(typeof result, "object", "result is not as expected");

						strictEqual(typeof result.code, "string", "result.code is not as expected");
							strictEqual(result.code, "MISSING_PARAMETER", "result.code is not as expected");

						strictEqual(typeof result.message, "string", "result.message is not as expected");

				});

			});

			it("should test with wrong name", () => {

				return testServer.request("/node-pluginsmanager-plugin-terminals/api/terminals", "put", {
					"name": false
				}).then((result) => {

					strictEqual(typeof result, "object", "result is not as expected");

						strictEqual(typeof result.code, "string", "result.code is not as expected");
							strictEqual(result.code, "WRONG_TYPE_PARAMETER", "result.code is not as expected");

						strictEqual(typeof result.message, "string", "result.message is not as expected");

				});

			});

			it("should test with empty name", () => {

				return testServer.request("/node-pluginsmanager-plugin-terminals/api/terminals", "put", {
					"name": ""
				}).then((result) => {

					strictEqual(typeof result, "object", "result is not as expected");

						strictEqual(typeof result.code, "string", "result.code is not as expected");
							strictEqual(result.code, "RANGE_OR_EMPTY_PARAMETER", "result.code is not as expected");

						strictEqual(typeof result.message, "string", "result.message is not as expected");

				});

			});

		});

		describe("shell", () => {

			it("should test without shell", () => {

				return testServer.request("/node-pluginsmanager-plugin-terminals/api/terminals", "put", {
					"name": TEST_NAME
				}).then((result) => {

					strictEqual(typeof result, "object", "result is not as expected");

						strictEqual(typeof result.code, "string", "result.code is not as expected");
							strictEqual(result.code, "MISSING_PARAMETER", "result.code is not as expected");

						strictEqual(typeof result.message, "string", "result.message is not as expected");

				});

			});

			it("should test with wrong shell", () => {

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

			it("should test with empty shell", () => {

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

					_testTerminal(message.data.terminal);

				});

				return testServer.request("/node-pluginsmanager-plugin-terminals/api/terminals", "put", {
					"name": TEST_NAME,
					"shell": TEST_SHELL
				}).then((terminal) => {

					_testTerminal(terminal);

					return testServer.request("/node-pluginsmanager-plugin-terminals/api/terminals", "get");

				}).then((terminals) => {

					strictEqual(typeof terminals, "object", "terminals is not as expected");
					strictEqual(terminals instanceof Array, true, "terminals is not as expected");
						strictEqual(terminals.length, 1, "terminals is not as expected");

					_testTerminal(terminals[0]);

				});

			});

		});

	});

});
