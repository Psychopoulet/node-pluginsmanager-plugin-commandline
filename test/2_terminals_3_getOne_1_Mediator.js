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

describe("Terminals / getOne / Mediator", () => {

	const orchestrator = new Orchestrator();
	const testServer = new TestServer();

	let mediator = null;

	before(() => {

		return orchestrator.load().then(() => {
			return orchestrator.init();
		}).then(() => {

			mediator = orchestrator._Mediator;

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

		it("should test without terminalnumber", (done) => {

			mediator.getOneTerminal({}).then(() => {
				done(new Error("There is no generated Error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated Error is not as expected");
				strictEqual(err instanceof ReferenceError, true, "Generated Error is not as expected");

				done();

			});

		});

		it("should test with wrong terminalnumber", (done) => {

			mediator.getOneTerminal({
				"terminalnumber": false
			}).then(() => {
				done(new Error("There is no generated Error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated Error is not as expected");
				strictEqual(err instanceof TypeError, true, "Generated Error is not as expected");

				done();

			});

		});

		it("should test with empty terminalnumber", (done) => {

			mediator.getOneTerminal({
				"terminalnumber": 0
			}).then(() => {
				done(new Error("There is no generated Error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated Error is not as expected");
				strictEqual(err instanceof RangeError, true, "Generated Error is not as expected");

				done();

			});

		});

		it("should test with inexistant terminal", () => {

			return mediator.getOneTerminal({
				"terminalnumber": 1
			}).then((terminal) => {

				strictEqual(typeof terminal, "object", "terminal is not as expected");
				strictEqual(terminal, null, "terminal is not as expected");

			});

		});

	});

	describe("execute", () => {

		it("should execute mediator", () => {

			return mediator.openTerminal(null, {
				"name": TEST_NAME,
				"shell": TEST_SHELL
			}).then((terminal) => {

				return mediator.getOneTerminal({
					"terminalnumber": terminal.number
				});

			}).then((terminal) => {

				testTerminal(terminal);

			});

		});

	});

});
