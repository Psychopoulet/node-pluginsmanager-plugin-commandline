"use strict";

// module

module.exports = function formateTerminalOptions (options) {

	const result = {};

		if (options.cwd) {
			result.cwd = options.cwd;
		}

		if (options.detached) {
			result.detached = options.detached;
		}

		if (options.uid) {
			result.uid = options.uid;
		}

		if (options.gid) {
			result.gid = options.gid;
		}

		if (options.windowsHide) {
			result.windowsHide = options.windowsHide;
		}

	return result;

};
