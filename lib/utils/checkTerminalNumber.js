"use strict";

// module

module.exports = function checkTerminalNumber (data) {

	return Promise.resolve().then(() => {

		if ("undefined" === typeof data || null === data) {
			return Promise.reject(new ReferenceError("Missing parameters"));
		}
			else if ("object" !== typeof data) {
				return Promise.reject(new TypeError("Parameters is not an object"));
			}

			else if ("undefined" === typeof data.terminalnumber) {
				return Promise.reject(new ReferenceError("Missing \"Terminal number\" parameter"));
			}
				else if ("number" !== typeof data.terminalnumber) {
					return Promise.reject(new TypeError("\"Terminal number\" parameter is not a number"));
				}
				else if (0 >= data.terminalnumber) {
					return Promise.reject(new RangeError("\"Terminal number\" parameter must be higher than 0"));
				}

		else {
			return Promise.resolve();
		}

	});

};
