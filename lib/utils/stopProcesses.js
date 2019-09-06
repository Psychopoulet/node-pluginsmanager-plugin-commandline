"use strict";

// private

	// methods

		/**
		* Stop all running child_processes
		* @param {array} childProcesses : child_processes to stop
		* @param {integer} i : stepper
		* @returns {Promise} : operation result
		*/
		function _stopProcesses (childProcesses, i = 0) {

			return i >= childProcesses.length ? Promise.resolve() : new Promise((resolve) => {

				childProcesses[i].once("close", () => {

					childProcesses[i].removeAllListeners();

					resolve();

				}).kill();

			}).then(() => {

				return _stopProcesses(childProcesses, i + 1);

			});

		}

// module

module.exports = _stopProcesses;
