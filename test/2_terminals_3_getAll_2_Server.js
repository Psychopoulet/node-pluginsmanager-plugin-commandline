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

describe("Terminals / getAll / Server", () => {

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

	it("should execute http request", () => {

		return testServer.request("/node-pluginsmanager-plugin-terminals/api/terminals", "put", {
			"name": TEST_NAME,
			"shell": TEST_SHELL
		}).then(() => {
			return testServer.request("/node-pluginsmanager-plugin-terminals/api/terminals", "get");
		}).then((terminals) => {

			strictEqual(typeof terminals, "object", "terminals is not as expected");
			strictEqual(terminals instanceof Array, true, "terminals is not as expected");
				strictEqual(terminals.length, 1, "terminals is not as expected");

			testTerminal(terminals[0]);

		});

	});

});
