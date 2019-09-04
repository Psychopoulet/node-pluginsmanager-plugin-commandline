"use strict";

// deps

	// externals
	const { Server } = require("node-pluginsmanager-plugin");

// consts

	const WEBSOCKET_STATE_OPEN = 1;

// module

module.exports = class CommandLineServer extends Server {

	constructor (opt) {

		super(opt);

		this._socketServer = null;

	}

	_initWorkSpace () {

		return this.checkMediator().then(() => {

			this._Mediator.on("terminal.created", (terminal) => {
				this.sendAll("created", terminal);
			});

		});

	}

	_releaseWorkSpace () {

		return this._socketServer ? Promise.resolve().then(() => {

			this._socketServer = null;

		}) : Promise.resolve();

	}

	socketMiddleware (socketServer) {

		this._socketServer = socketServer;

	}

	sendAll (command, data) {

		if (this._Descriptor && this._socketServer) {

			this._socketServer.clients.forEach((client) => {

				if (WEBSOCKET_STATE_OPEN === client.readyState) {

					client.send(JSON.stringify({
						"plugin": this._Descriptor.info.title,
						"command": command,
						"data": data
					}));

				}

			});

		}

	}

};
