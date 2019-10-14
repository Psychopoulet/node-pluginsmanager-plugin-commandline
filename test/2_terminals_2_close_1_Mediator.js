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

describe("Terminals / close / Mediator", () => {

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

	it("should test with inexistant terminal", () => {

		return mediator.closeTerminal({
			"terminalnumber": 1
		}).then((data) => {

			strictEqual(typeof data, "undefined", "returned data is not as expected");

		});

	});

	it("should close a terminal", (done) => {

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

		mediator.once("terminal.closed", (data) => {

			testTerminal(data.terminal);

			_end();

		});

		mediator.openTerminal(null, {
			"name": TEST_NAME,
			"shell": TEST_SHELL
		}).then((terminal) => {

			testTerminal(terminal);

			return mediator.closeTerminal({
				"terminalnumber": terminal.number
			});

		}).then((data) => {

			strictEqual(typeof data, "undefined", "returned data is not as expected");

			return mediator.getAllTerminals();

		}).then((terminals) => {

			strictEqual(typeof terminals, "object", "terminals is not as expected");
			strictEqual(terminals instanceof Array, true, "terminals is not as expected");
				strictEqual(terminals.length, 0, "terminals is not as expected");

			_end();

		}).catch(done);

	});

});
