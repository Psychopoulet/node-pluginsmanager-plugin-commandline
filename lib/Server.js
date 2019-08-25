"use strict";

// deps

	// natives
	const { parse } = require("url");

	// externals
	const { Server } = require("node-pluginsmanager-plugin");

// private

	// methods

		/**
		* Send data to client
		* @param {Request} req: request object
		* @param {Response} res: response object
		* @param {object} content: content to send
		* @param {number} code: HTTP code to send
		* @returns {void}
		*/
		function _send (req, res, content, code) {

			res.writeHead(code, {
				"Content-Type": "application/json; charset=utf-8"
			});

			res.end(JSON.stringify(content), "utf-8");

		}

// module

module.exports = class CommandLineServer extends Server {

	_initWorkSpace () {

		return Promise.resolve();

	}

	_releaseWorkSpace () {

		return Promise.resolve();

	}

	appMiddleware (req, res, next) {

		this.checkDescriptor().then(() => {

			const { pathname } = parse(req.url);
			const method = req.method.toLowerCase();

			if (!this._Descriptor.paths[pathname] || !this._Descriptor.paths[pathname][method]) {
				return next();
			}
			else if ("/node-pluginsmanager-plugin-commandline/descriptor" === pathname && "get" === method) {
				return _send(req, res, this._Descriptor, 200);
			}
			else {

				const { operationId } = this._Descriptor.paths[pathname][method];

				if (!operationId || !this._Mediator[operationId]) {
					return next();
				}
				else {

					return new Promise((resolve) => {

						let queryData = "";
						req.on("data", (data) => {
							queryData += data;
						}).on("end", () => {
							resolve(queryData ? JSON.parse(queryData) : null);
						});

					}).then((data) => {

						if (data) {
							return this._Mediator[operationId](data);
						}
						else {
							return this._Mediator[operationId]();
						}

					}).then((content) => {

						return _send(req, res, content, "put" === method ? 201 : 200);

					});

				}

			}

		}).catch((err) => {

			let code = "";
			if (err instanceof ReferenceError) {
				code = "MISSING_PARAMETER";
			}
			else if (err instanceof TypeError) {
				code = "WRONG_PARAMETER";
			}
			else if (err instanceof RangeError) {
				code = "EMPTY_PARAMETER";
			}
			else {
				code = "ERROR";
			}

			_send(req, res, {
				"code": code,
				"message": err.message ? err.message : err
			}, 500);

		});

	}

};
