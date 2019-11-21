"use strict";

// deps

	// externals
	const { Server } = require("node-pluginsmanager-plugin");

// module

module.exports = class TerminalsServer extends Server {

	_initWorkSpace () {

		this._Mediator.on("error", (err) => {

			this.push("error", {
				"code": err.code ? err.code : "UNKNOWN",
				"message": err.message ? err.message : err
			});

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

		// "initialized" & "released" events cannot be managed in an other way because of release order
		this._Mediator.on("initialized", () => {
			this.push("initialized");
		});

		return super._initWorkSpace();

	}

	_releaseWorkSpace () {

		// "initialized" & "released" events cannot be managed in an other way because of release order
		this.push("released");

		return super._releaseWorkSpace();

	}

};
