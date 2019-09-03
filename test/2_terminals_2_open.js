"use strict";

// deps

	// natives
	const { join } = require("path");
	const { strictEqual } = require("assert");

	// locals
	const TestServer = require(join(__dirname, "utils", "TestServer.js"));
	const Orchestrator = require(join(__dirname, "..", "lib", "Orchestrator.js"));

// consts

	const TEST_NAME = "Test 1";
	const TEST_SHELL = "cmd";

// tests

describe("Terminals / getAll", () => {

	describe("Mediator", () => {

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

		it("should test without data", (done) => {

			orchestrator._Mediator.openTerminal().then(() => {
				done(new Error("There is no generated Error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated Error is not as expected");
				strictEqual(err instanceof ReferenceError, true, "Generated Error is not as expected");

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

		});

		describe("execute", () => {

			it("should open a terminal", () => {

				return orchestrator._Mediator.openTerminal(null, {
					"name": TEST_NAME,
					"shell": TEST_SHELL
				}).then((result) => {

					strictEqual(typeof result, "object", "result is not as expected");
					strictEqual(typeof result.number, "number", "result.number is not as expected");
						strictEqual(result.number, 1, "result.number is not as expected");
					strictEqual(typeof result.name, "string", "result.name is not as expected");
						strictEqual(result.name, TEST_NAME, "result.name is not as expected");
					strictEqual(typeof result.shell, "string", "result.shell is not as expected");
						strictEqual(result.shell, TEST_SHELL, "result.shell is not as expected");

					return orchestrator._Mediator.getAllTerminals();

				}).then((terminals) => {

					strictEqual(typeof terminals, "object", "terminals is not as expected");
					strictEqual(terminals instanceof Array, true, "terminals is not as expected");
						strictEqual(terminals.length, 1, "terminals is not as expected");

					strictEqual(typeof terminals[0], "object", "terminals[0] is not as expected");
					strictEqual(typeof terminals[0].number, "number", "terminals[0].number is not as expected");
						strictEqual(terminals[0].number, 1, "terminals[0].number is not as expected");
					strictEqual(typeof terminals[0].name, "string", "terminals[0].name is not as expected");
						strictEqual(terminals[0].name, TEST_NAME, "terminals[0].name is not as expected");
					strictEqual(typeof terminals[0].shell, "string", "terminals[0].shell is not as expected");
						strictEqual(terminals[0].shell, TEST_SHELL, "terminals[0].shell is not as expected");

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

				return testServer.request("/node-pluginsmanager-plugin-terminals/api/terminals", "put", {
					"name": TEST_NAME,
					"shell": TEST_SHELL
				}).then((result) => {

					strictEqual(typeof result, "object", "result is not as expected");
					strictEqual(typeof result.number, "number", "result.number is not as expected");
						strictEqual(result.number, 1, "result.number is not as expected");
					strictEqual(typeof result.name, "string", "result.name is not as expected");
						strictEqual(result.name, TEST_NAME, "result.name is not as expected");
					strictEqual(typeof result.shell, "string", "result.shell is not as expected");
						strictEqual(result.shell, TEST_SHELL, "result.shell is not as expected");

					return testServer.request("/node-pluginsmanager-plugin-terminals/api/terminals", "get");

				}).then((terminals) => {

					strictEqual(typeof terminals, "object", "terminals is not as expected");
					strictEqual(terminals instanceof Array, true, "terminals is not as expected");
						strictEqual(terminals.length, 1, "terminals is not as expected");

					strictEqual(typeof terminals[0], "object", "terminals[0] is not as expected");
					strictEqual(typeof terminals[0].number, "number", "terminals[0].number is not as expected");
						strictEqual(terminals[0].number, 1, "terminals[0].number is not as expected");
					strictEqual(typeof terminals[0].name, "string", "terminals[0].name is not as expected");
						strictEqual(terminals[0].name, TEST_NAME, "terminals[0].name is not as expected");
					strictEqual(typeof terminals[0].shell, "string", "terminals[0].shell is not as expected");
						strictEqual(terminals[0].shell, TEST_SHELL, "terminals[0].shell is not as expected");

				});

			});

		});

	});

});
