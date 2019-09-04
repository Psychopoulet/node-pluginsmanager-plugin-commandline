"use strict";

// deps

	// natives
	const { join } = require("path");
	const { strictEqual } = require("assert");

	// locals
	const TestServer = require(join(__dirname, "utils", "TestServer.js"));
	const Orchestrator = require(join(__dirname, "..", "lib", "Orchestrator.js"));

// tests

describe("Terminals / getAll", () => {

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

	it("should execute mediator", () => {

		return orchestrator._Mediator.getAllTerminals().then((terminals) => {

			strictEqual(typeof terminals, "object", "terminals is not as expected");
			strictEqual(terminals instanceof Array, true, "terminals is not as expected");
				strictEqual(terminals.length, 0, "terminals is not as expected");

		});

	});

	it("should execute http request", () => {

		return testServer.request("/node-pluginsmanager-plugin-terminals/api/terminals").then((terminals) => {

			strictEqual(typeof terminals, "object", "terminals is not as expected");
			strictEqual(terminals instanceof Array, true, "terminals is not as expected");
				strictEqual(terminals.length, 0, "terminals is not as expected");

		});

	});

});
