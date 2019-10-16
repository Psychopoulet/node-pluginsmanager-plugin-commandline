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

describe("Terminals / open / Mediator", () => {

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

	it("should test with wrong shell", (done) => {

		mediator.openTerminal(null, {
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

	it("should open a terminal", (done) => {

		let success = 0;

		/**
		* Fire end of test
		* @returns {Promise} : operation result
		*/
		function _end () {

			++success;
			if (2 === success) {
				done();
			}

		}

		mediator.once("terminal.opened", (data) => {

			testTerminal(data.terminal);

			_end();

		});

		mediator.openTerminal(null, {
			"name": TEST_NAME,
			"shell": TEST_SHELL
		}).then((terminal) => {

			testTerminal(terminal);

			return mediator.getAllTerminals();

		}).then((terminals) => {

			strictEqual(typeof terminals, "object", "terminals is not as expected");
			strictEqual(terminals instanceof Array, true, "terminals is not as expected");
				strictEqual(terminals.length, 1, "terminals is not as expected");

			testTerminal(terminals[0]);

			_end();

		}).catch(done);

	});

});
