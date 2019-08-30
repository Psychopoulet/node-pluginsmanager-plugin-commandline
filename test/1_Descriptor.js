"use strict";

// deps

	// natives
	const { join } = require("path");
	const { strictEqual } = require("assert");

	// locals
	const readDescriptor = require(join(__dirname, "utils", "readDescriptor.js"));
	const TestServer = require(join(__dirname, "utils", "TestServer.js"));
	const Orchestrator = require(join(__dirname, "..", "lib", "Orchestrator.js"));

// tests

describe("descriptor", () => {

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

	it("should read file", () => {
		return readDescriptor();
	});

	it("should execute http request", () => {

		return testServer.request("/node-pluginsmanager-plugin-terminals/descriptor").then((result) => {
			strictEqual(JSON.stringify(result), JSON.stringify(orchestrator._Descriptor), "Descriptor is not as expected");
		});

	});

});
