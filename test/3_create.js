"use strict";

// deps

	// natives
	const { join } = require("path");
	const { strictEqual } = require("assert");

	// locals
	const TestServer = require(join(__dirname, "utils", "TestServer.js"));
	const Orchestrator = require(join(__dirname, "..", "lib", "Orchestrator.js"));

// tests

describe("create", () => {

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

	describe("Mediator", () => {

		it("should test without data", (done) => {

			orchestrator._Mediator.create().then(() => {
				done(new Error("There is no error generated"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not as expected");
				strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

				done();

			});

		});

		it("should test with wrong data", (done) => {

			orchestrator._Mediator.create(false).then(() => {
				done(new Error("There is no error generated"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not as expected");
				strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

				done();

			});

		});

		it("should test without name", (done) => {

			orchestrator._Mediator.create({}).then(() => {
				done(new Error("There is no error generated"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not as expected");
				strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

				done();

			});

		});

		it("should test with wrong name", (done) => {

			orchestrator._Mediator.create({
				"name": false
			}).then(() => {
				done(new Error("There is no error generated"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not as expected");
				strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

				done();

			});

		});

		it("should test with empty name", (done) => {

			orchestrator._Mediator.create({
				"name": ""
			}).then(() => {
				done(new Error("There is no error generated"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not as expected");
				strictEqual(err instanceof RangeError, true, "Generated error is not as expected");

				done();

			});

		});

		it("should execute method", () => {

			return orchestrator._Mediator.create({
				"name": "test"
			});

		});

	});

	describe("Server", () => {

		it("should test without name", () => {

			return testServer.request("/api/commandlines", "put").then((data) => {

				strictEqual(typeof data, "object", "Generated error is not as expected");
					strictEqual(typeof data.code, "string", "Generated error is not as expected");
						strictEqual(data.code, "MISSING_PARAMETER", "Generated error is not as expected");
					strictEqual(typeof data.message, "string", "Generated error is not as expected");

			});

		});

		it("should test with wrong name", () => {

			return testServer.request("/api/commandlines", "put", {
				"name": false
			}).then((data) => {

				strictEqual(typeof data, "object", "Generated error is not as expected");
					strictEqual(typeof data.code, "string", "Generated error is not as expected");
						strictEqual(data.code, "WRONG_PARAMETER", "Generated error is not as expected");
					strictEqual(typeof data.message, "string", "Generated error is not as expected");

			});

		});

		it("should test with empty name", () => {

			return testServer.request("/api/commandlines", "put", {
				"name": ""
			}).then((data) => {

				strictEqual(typeof data, "object", "Generated error is not as expected");
					strictEqual(typeof data.code, "string", "Generated error is not as expected");
						strictEqual(data.code, "EMPTY_PARAMETER", "Generated error is not as expected");
					strictEqual(typeof data.message, "string", "Generated error is not as expected");

			});

		});

		it("should execute method", () => {

			return testServer.request("/api/commandlines", "put", {
				"name": "test"
			});

		});

	});

});
