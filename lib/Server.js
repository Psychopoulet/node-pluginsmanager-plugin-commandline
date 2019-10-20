"use strict";

// deps

	// externals
	const { Server } = require("node-pluginsmanager-plugin");

// module

module.exports = class CommandLineServer extends Server {

	_initWorkSpace () {

		this._Mediator.on("initialized", () => {
			this.push("initialized");
		}).on("released", () => {
			this.push("released");
		}).on("terminal.opened", (data) => {
			this.push("terminal.opened", data);
		}).on("terminal.closed", (data) => {
			this.push("terminal.closed", data);
		}).on("terminal.error", (data) => {
			this.push("terminal.error", data);
		}).on("terminal.stdout", (data) => {
			this.push("terminal.stdout", data);
		}).on("terminal.stderr", (data) => {
			this.push("terminal.stderr", data);
		});

		return Promise.resolve();

	}

};
