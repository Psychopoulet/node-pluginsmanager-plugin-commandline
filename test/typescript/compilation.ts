/// <reference path="../../lib/index.d.ts" />

import * as Plugin from '../../lib/Orchestrator.js';

console.log(Plugin);

const orchestrator = new Plugin();

console.log(orchestrator);

orchestrator.checkConf().then(() => {
	return orchestrator.isEnable();
}).then(() => {
	return orchestrator.checkDescriptor();
}).then(() => {
	return orchestrator.checkFiles();
}).then(() => {

	return orchestrator.load().then(() => {
		return orchestrator.init();
	});

}).then(() => {
	return orchestrator.checkMediator();
}).then(() => {
	return orchestrator.checkServer();
}).then(() => {
	return orchestrator.release();
}).then(() => {
	return orchestrator.destroy();
});
