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

		it("should open a terminal", () => {

			return orchestrator._Mediator.openTerminal(null, {
				"name": "Test 1"
			}).then(() => {
				return orchestrator._Mediator.getAllTerminals();
			}).then((terminals) => {

				strictEqual(terminals.length, 1, "There is no opened terminal");
				strictEqual(terminals[0].name, "Test 1", "Opened terminal is not as expected");

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

		it("should open a terminal", () => {

			return testServer.request("/node-pluginsmanager-plugin-terminals/api/terminals", "put", {
				"name": "Test 1"
			}).then((result) => {

				strictEqual(typeof result, "object", "result is not as expected");
				strictEqual(typeof result.number, "number", "result.number is not as expected");
					strictEqual(result.number, 1, "result.number is not as expected");
				strictEqual(typeof result.name, "string", "result.name is not as expected");
					strictEqual(result.name, "Test 1", "result.name is not as expected");

				strictEqual(typeof result.commandlines, "object", "result.commandlines is not as expected");
				strictEqual(result.commandlines instanceof Array, true, "result.commandlines is not as expected");
					strictEqual(result.commandlines.length, 0, "result.commandlines is not as expected");

				return testServer.request("/node-pluginsmanager-plugin-terminals/api/terminals", "get");

			}).then((terminals) => {

				strictEqual(typeof terminals, "object", "terminals is not as expected");
				strictEqual(terminals instanceof Array, true, "terminals is not as expected");
					strictEqual(terminals.length, 1, "terminals is not as expected");

				strictEqual(typeof terminals[0], "object", "terminals[0] is not as expected");
				strictEqual(typeof terminals[0].number, "number", "terminals[0].number is not as expected");
					strictEqual(terminals[0].number, 1, "terminals[0].number is not as expected");
				strictEqual(typeof terminals[0].name, "string", "terminals[0].name is not as expected");
					strictEqual(terminals[0].name, "Test 1", "terminals[0].name is not as expected");

				strictEqual(typeof terminals[0].commandlines, "object", "terminals[0].commandlines is not as expected");
				strictEqual(terminals[0].commandlines instanceof Array, true, "terminals[0].commandlines is not as expected");
					strictEqual(terminals[0].commandlines.length, 0, "terminals[0].commandlines is not as expected");

			});

		});

	});

});
