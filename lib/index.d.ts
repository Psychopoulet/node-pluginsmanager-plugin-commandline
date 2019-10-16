/// <reference types="node" />
/// <reference types="ws" />
/// <reference types="node-pluginsmanager-plugin" />

declare module "node-pluginsmanager-plugin-terminals" {

	import { Orchestrator, Server, Mediator } from "node-pluginsmanager-plugin";

	// interfaces

	interface iOptions {
		"cwd": string;
		"detached"?: boolean;
		"uid"?: number;
		"gid"?: number;
		"windowsHide"?: boolean;
	}

	interface iTerminal {
		"number": number;
		"name": string;
		"shell": string;
		"options": iOptions;
		"currentcommandline"?: string;
	}

	// classes

	export { Orchestrator, Server };

	export class TerminalsMediator extends Mediator {

		// methods

			// public

				public getAllTerminals(): Promise<Array<iTerminal>>;
				public getOneTerminal(urlParameters: object): Promise<iTerminal>;
				public openTerminal(urlParameters: object, bodyParameters: object): Promise<iTerminal>;
				public closeTerminal(urlParameters: object): Promise<void>;
				public commandLine(urlParameters: object, bodyParameters: object): Promise<void>;

	}

}
