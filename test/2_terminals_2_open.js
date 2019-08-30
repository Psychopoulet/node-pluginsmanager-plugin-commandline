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

	describe("Mediator", () => {

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

});
