/*
	eslint max-nested-callbacks: 0, no-multiple-empty-lines: 0
*/








// @TODO : remove eslint rules









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

		describe("params", () => {

			describe("data", () => {

				it("should test without data", (done) => {

					orchestrator._Mediator.create(null).then(() => {
						done(new Error("There is no error generated"));
					}).catch((err) => {

						strictEqual(typeof err, "object", "Generated error is not as expected");
						strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

						done();

					});

				});

				it("should test with wrong data", (done) => {

					orchestrator._Mediator.create(null, false).then(() => {
						done(new Error("There is no error generated"));
					}).catch((err) => {

						strictEqual(typeof err, "object", "Generated error is not as expected");
						strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

						done();

					});

				});

			});

			describe("command", () => {

				it("should test without command", (done) => {

					orchestrator._Mediator.create(null, {}).then(() => {
						done(new Error("There is no error generated"));
					}).catch((err) => {

						strictEqual(typeof err, "object", "Generated error is not as expected");
						strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

						done();

					});

				});

				it("should test with wrong command", (done) => {

					orchestrator._Mediator.create(null, {
						"command": false
					}).then(() => {
						done(new Error("There is no error generated"));
					}).catch((err) => {

						strictEqual(typeof err, "object", "Generated error is not as expected");
						strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

						done();

					});

				});

				it("should test with empty command", (done) => {

					orchestrator._Mediator.create(null, {
						"command": ""
					}).then(() => {
						done(new Error("There is no error generated"));
					}).catch((err) => {

						strictEqual(typeof err, "object", "Generated error is not as expected");
						strictEqual(err instanceof RangeError, true, "Generated error is not as expected");

						done();

					});

				});

			});

			describe("arguments", () => {

				it("should test with wrong arguments", (done) => {

					orchestrator._Mediator.create(null, {
						"command": "node",
						"arguments": false
					}).then(() => {
						done(new Error("There is no error generated"));
					}).catch((err) => {

						strictEqual(typeof err, "object", "Generated error is not as expected");
						strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

						done();

					});

				});

				it("should test with wrong argument", (done) => {

					orchestrator._Mediator.create(null, {
						"command": "node",
						"arguments": [ false ]
					}).then(() => {
						done(new Error("There is no error generated"));
					}).catch((err) => {

						strictEqual(typeof err, "object", "Generated error is not as expected");
						strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

						done();

					});

				});

				it("should test with empty argument", (done) => {

					orchestrator._Mediator.create(null, {
						"command": "node",
						"arguments": [ "" ]
					}).then(() => {
						done(new Error("There is no error generated"));
					}).catch((err) => {

						strictEqual(typeof err, "object", "Generated error is not as expected");
						strictEqual(err instanceof RangeError, true, "Generated error is not as expected");

						done();

					});

				});

			});

		});

		describe("execute", () => {

			it("should execute method", () => {

				return orchestrator._Mediator.create(null, {
					"command": "node"
				}).then(() => {

					strictEqual(orchestrator._Mediator._stepper, 1, "Command is not correctly initialized");
					strictEqual(orchestrator._Mediator._commandLines.length, 1, "Command is not correctly initialized");

				});

			});

		});

	});

	describe("Server", () => {

		describe("params", () => {

			describe("data", () => {

				it("should test without data", () => {

					return testServer.request("/api/commandlines", "put").then((data) => {

						strictEqual(typeof data, "object", "Generated error is not as expected");
							strictEqual(typeof data.code, "string", "Generated error is not as expected");
								strictEqual(data.code, "MISSING_PARAMETER", "Generated error is not as expected");
							strictEqual(typeof data.message, "string", "Generated error is not as expected");

					});

				});

				it("should test with wrong data", () => {

					return testServer.request("/api/commandlines", "put", false).then((data) => {

						strictEqual(typeof data, "object", "Generated error is not as expected");
							strictEqual(typeof data.code, "string", "Generated error is not as expected");
								strictEqual(data.code, "WRONG_TYPE_PARAMETER", "Generated error is not as expected");
							strictEqual(typeof data.message, "string", "Generated error is not as expected");

					});

				});

			});

			describe("command", () => {

				it("should test without command", () => {

					return testServer.request("/api/commandlines", "put", {}).then((data) => {

						strictEqual(typeof data, "object", "Generated error is not as expected");
							strictEqual(typeof data.code, "string", "Generated error is not as expected");
								strictEqual(data.code, "MISSING_PARAMETER", "Generated error is not as expected");
							strictEqual(typeof data.message, "string", "Generated error is not as expected");

					});

				});

				it("should test with wrong command", () => {

					return testServer.request("/api/commandlines", "put", {
						"command": false
					}).then((data) => {

						strictEqual(typeof data, "object", "Generated error is not as expected");
							strictEqual(typeof data.code, "string", "Generated error is not as expected");
								strictEqual(data.code, "WRONG_TYPE_PARAMETER", "Generated error is not as expected");
							strictEqual(typeof data.message, "string", "Generated error is not as expected");

					});

				});

				it("should test with empty command", () => {

					return testServer.request("/api/commandlines", "put", {
						"command": ""
					}).then((data) => {

						strictEqual(typeof data, "object", "Generated error is not as expected");
							strictEqual(typeof data.code, "string", "Generated error is not as expected");
								strictEqual(data.code, "RANGE_OR_EMPTY_PARAMETER", "Generated error is not as expected");
							strictEqual(typeof data.message, "string", "Generated error is not as expected");

					});

				});

			});

			describe("arguments", () => {

				it("should test with wrong arguments", () => {

					return testServer.request("/api/commandlines", "put", {
						"command": "node",
						"arguments": false
					}).then((data) => {

						strictEqual(typeof data, "object", "Generated error is not as expected");
							strictEqual(typeof data.code, "string", "Generated error is not as expected");
								strictEqual(data.code, "WRONG_TYPE_PARAMETER", "Generated error is not as expected");
							strictEqual(typeof data.message, "string", "Generated error is not as expected");

					});

				});

				it("should test with wrong argument", () => {

					return testServer.request("/api/commandlines", "put", {
						"command": "node",
						"arguments": [ false ]
					}).then((data) => {

						strictEqual(typeof data, "object", "Generated error is not as expected");
							strictEqual(typeof data.code, "string", "Generated error is not as expected");
								strictEqual(data.code, "WRONG_TYPE_PARAMETER", "Generated error is not as expected");
							strictEqual(typeof data.message, "string", "Generated error is not as expected");

					});

				});

				it("should test with empty argument", () => {

					return testServer.request("/api/commandlines", "put", {
						"command": "node",
						"arguments": [ "" ]
					}).then((data) => {

						strictEqual(typeof data, "object", "Generated error is not as expected");
							strictEqual(typeof data.code, "string", "Generated error is not as expected");
								strictEqual(data.code, "RANGE_OR_EMPTY_PARAMETER", "Generated error is not as expected");
							strictEqual(typeof data.message, "string", "Generated error is not as expected");

					});

				});

			});

		});

		describe("execute", () => {

			it("should execute method", () => {

				return testServer.request("/api/commandlines", "put", {
					"command": "node",
					"arguments": [ "-v" ]
				}).then((data) => {

					strictEqual(typeof data, "object", "Generated error is not as expected");
						strictEqual(typeof data.code, "string", "Generated error is not as expected");
							strictEqual(data.code, "RANGE_OR_EMPTY_PARAMETER", "Generated error is not as expected");
						strictEqual(typeof data.message, "string", "Generated error is not as expected");

				});

			});

		});

	});

});
