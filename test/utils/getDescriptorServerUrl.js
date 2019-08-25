"use strict";

// deps

	// natives
	const { join } = require("path");
	const { parse } = require("url");

	// natives
	const readDescriptor = require(join(__dirname, "readDescriptor.js"));

// module

module.exports = function getDescriptorServerUrl () {

	return readDescriptor().then((descriptor) => {

		return Promise.resolve(parse(descriptor.servers[0].url));

	});

};
