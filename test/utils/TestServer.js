"use strict";

// deps

	// natives
	const { join } = require("path");
	const { request } = require("http");

	// externals
	const express = require("express");

	// locals
	const getDescriptorServerUrl = require(join(__dirname, "getDescriptorServerUrl.js"));

// module

module.exports = class TestServer {

	constructor () {

		this._runningServer = null;
		this._mainUrl = "";

	}

	init (orchestrator) {

		return getDescriptorServerUrl().then((url) => {

			this._mainUrl = url.href + "node-pluginsmanager-plugin-commandline";

			return new Promise((resolve) => {

				this._runningServer = express().use((req, res, next) => {
					orchestrator.appMiddleware(req, res, next);
				}).use((req, res) => {

					res.writeHead(404, {
						"Content-Type": "text/plain; charset=utf-8"
					});

					res.end("Unknown path");

				}).listen(parseInt(url.port, 10), resolve);

			});

		});

	}

	release () {

		return this._runningServer ? new Promise((resolve) => {

			this._runningServer.close(() => {
				this._runningServer = null;
				resolve();
			});

		}) : Promise.resolve();

	}

	request (url, method = "get", data = null) {

		return new Promise((resolve, reject) => {

			const formatedData = JSON.stringify(data);

			const req = request(this._mainUrl + url, {
				"method": method.toUpperCase(),
				"headers": {
					"Content-Type": "application/json",
					"Content-Length": null !== data ? formatedData.length : 0
				}
			}, (res) => {

				try {

					res.setEncoding("utf8");

					let rawData = "";

					res.on("data", (chunk) => {
						rawData += chunk;
					}).on("end", () => {
						resolve(rawData);
					});

				}
				catch (e) {
					reject(e);
				}

			});

			if (null !== data) {
				req.write(formatedData);
			}

			req.end();

		}).then((content) => {

			if (content) {
				return Promise.resolve(JSON.parse(content));
			}
			else {
				return Promise.resolve();
			}

		});

	}

};
