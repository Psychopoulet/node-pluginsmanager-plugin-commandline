"use strict";

// deps

	// externals
	const {
		checkNonEmptyArray,
		checkNonEmptyObject,
		checkNonEmptyString
	} = require("node-pluginsmanager-plugin");

// module

module.exports = function checkCommandLine (commandLine) {

	return Promise.resolve().then(() => {

		return checkNonEmptyObject("commandLine", commandLine);

	}).then(() => {

		return checkNonEmptyString("commandLine.command", commandLine.command);

	}).then(() => {

		return "undefined" !== typeof commandLine.arguments ? Promise.resolve() : Promise.resolve().then(() => {

			return checkNonEmptyArray("commandLine.arguments", commandLine.arguments);

		}).then(() => {

			let err = null;

				for (let i = 0; i < commandLine.arguments.length; ++i) {

					err = checkNonEmptyString("commandLine.arguments[" + i + "]", commandLine.arguments[i], false);

					if (err) {
						break;
					}

				}

			return err ? Promise.reject(err) : Promise.resolve();

		});

	}).then(() => {

		return "undefined" !== typeof commandLine.options ?
			Promise.resolve() : checkNonEmptyObject("commandLine.options", commandLine.options);

	});

};
