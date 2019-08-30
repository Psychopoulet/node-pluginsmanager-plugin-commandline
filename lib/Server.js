"use strict";

// deps

	// externals
	const { Server } = require("node-pluginsmanager-plugin");

// module

module.exports = class CommandLineServer extends Server {

	constructor (opt) {

		super(opt);

		this._socketServer = null;
		this._onConnection = null;

	}

	_releaseWorkSpace () {

		return this._socketServer ? Promise.resolve().then(() => {

			if ("function" === typeof this._onConnection) {

				this._socketServer.removeListener("connection", this._onConnection);
				this._onConnection = null;

			}

			this._socketServer = null;

		}) : Promise.resolve();

	}

	socketMiddleware (socketServer) {

		this._socketServer = socketServer;
		this._onConnection = () => {
			// nothing to do here
		};

		this._socketServer.on("connection", this._onConnection);

	}

};
