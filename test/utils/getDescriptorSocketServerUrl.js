"use strict";

// deps

	// natives
	const { join } = require("path");
	const { parse } = require("url");

	// natives
	const readDescriptor = require(join(__dirname, "readDescriptor.js"));

// module

module.exports = function getDescriptorSocketServerUrl () {

	return readDescriptor().then((descriptor) => {

		return Promise.resolve(parse(descriptor.servers[1].url));

	});

};
