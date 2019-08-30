"use strict";

// deps

	// natives
	const { join } = require("path");
	const { deepStrictEqual } = require("assert");

	// locals
	const TestServer = require(join(__dirname, "utils", "TestServer.js"));
	const Orchestrator = require(join(__dirname, "..", "lib", "Orchestrator.js"));

// tests

describe("Terminals / getAll", () => {

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

	it("should execute mediator", () => {

		return orchestrator._Mediator.getAllTerminals().then((result) => {
			deepStrictEqual(result, [], "Terminals are not as expected");
		});

	});

	it("should execute http request", () => {

		return testServer.request("/node-pluginsmanager-plugin-terminals/api/terminals").then((result) => {
			deepStrictEqual(result, [], "Terminals are not as expected");
		});

	});

});
