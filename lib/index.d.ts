/// <reference types="node" />
/// <reference types="ws" />
/// <reference types="node-pluginsmanager-plugin" />

declare module "node-pluginsmanager-plugin-terminals" {

	import { Orchestrator, Server, Mediator } from "node-pluginsmanager-plugin";

	// classes

	export { Orchestrator, Server };

	export class TerminalsMediator extends Mediator {

	};

}
