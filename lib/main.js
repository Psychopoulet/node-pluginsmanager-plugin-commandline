"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals
	const Mediator = require(join(__dirname, "components", "Mediator.js"));
	const Orchestrator = require(join(__dirname, "components", "Orchestrator.js"));
	const Server = require(join(__dirname, "components", "Server.js"));

// module

module.exports = {
	Mediator,
	Orchestrator,
	Server
};
