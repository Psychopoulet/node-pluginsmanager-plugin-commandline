"use strict";

// deps

	// natives
	const { join } = require("path");
	const { readFile } = require("fs");

// consts

	const DESCRIPTOR_FILE = join(__dirname, "..", "..", "lib", "Descriptor.json");

// module

module.exports = function readDescriptor () {

	return new Promise((resolve, reject) => {

		readFile(DESCRIPTOR_FILE, (err, content) => {

			return err ? reject(err) : resolve(content);

		});

	}).then((content) => {

		return Promise.resolve(JSON.parse(content));

	});

};
