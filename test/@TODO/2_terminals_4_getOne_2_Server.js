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

		it("should test with wrong terminalnumber", (done) => {

			testServer.request("/node-pluginsmanager-plugin-terminals/api/terminals/false", "get").then(() => {
				done(new Error("There is no generated Error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated Error is not as expected");
				strictEqual(err instanceof RangeError, true, "Generated Error is not as expected");

				done();

			});

		});

		it("should test with empty terminal", (done) => {

			testServer.request("/node-pluginsmanager-plugin-terminals/api/terminals/0", "get").then(() => {
				done(new Error("There is no generated Error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated Error is not as expected");
				strictEqual(err instanceof RangeError, true, "Generated Error is not as expected");

				done();

			});

		});

		it("should test with inexistant terminal", (done) => {

			testServer.request("/node-pluginsmanager-plugin-terminals/api/terminals/1", "get").then(() => {
				done(new Error("There is no generated Error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated Error is not as expected");
				strictEqual(err instanceof RangeError, true, "Generated Error is not as expected");

				done();

			});

		});

	});

	describe("execute", () => {

		it("should execute http request", () => {

			return testServer.request("/node-pluginsmanager-plugin-terminals/api/terminals", "put", {
				"name": TEST_NAME,
				"shell": TEST_SHELL
			}).then((terminal) => {

				return testServer.request("/node-pluginsmanager-plugin-terminals/api/terminals/" + terminal.number, "get");

			}).then((terminal) => {

				testTerminal(terminal);

			});

		});

	});

});
