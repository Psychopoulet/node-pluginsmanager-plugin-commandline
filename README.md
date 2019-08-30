# node-pluginsmanager-plugin-terminals
A plugin to manage terminals and execute command lines for node-pluginsmanager

[![Build status](https://api.travis-ci.org/Psychopoulet/node-pluginsmanager-plugin-terminals.svg?branch=master)](https://travis-ci.org/Psychopoulet/node-pluginsmanager-plugin-terminals)
[![Coverage status](https://coveralls.io/repos/github/Psychopoulet/node-pluginsmanager-plugin-terminals/badge.svg?branch=master)](https://coveralls.io/github/Psychopoulet/node-pluginsmanager-plugin-terminals)
[![Dependency status](https://david-dm.org/Psychopoulet/node-pluginsmanager-plugin-terminals/status.svg)](https://david-dm.org/Psychopoulet/node-pluginsmanager-plugin-terminals)
[![Dev dependency status](https://david-dm.org/Psychopoulet/node-pluginsmanager-plugin-terminals/dev-status.svg)](https://david-dm.org/Psychopoulet/node-pluginsmanager-plugin-terminals?type=dev)
[![Issues](https://img.shields.io/github/issues/Psychopoulet/node-pluginsmanager-plugin-terminals.svg)](https://github.com/Psychopoulet/node-pluginsmanager-plugin-terminals/issues)
[![Pull requests](https://img.shields.io/github/issues-pr/Psychopoulet/node-pluginsmanager-plugin-terminals.svg)](https://github.com/Psychopoulet/node-pluginsmanager-plugin-terminals/pulls)

## Installation

```bash
$ npm install node-pluginsmanager-plugin-terminals
```

## Features

  * inheritable parent for node-pluginsmanager's plugin to use distant command line
  * create & destroy terminals
  * use command line
  * get instant returns

## [OpenAPI documentation](./lib/Descriptor.json)

## Interfaces

### ??

```typescript
interface i?? {
}
```

## Classes

### Resume

* Mediator : manage terminals
* Server : expose plugin's endpoints to external use (API)
* Descriptor : OpenAPI (v3) description for Server endpoints (this is NOT a js file, but a json OpenAPI file)
* Orchestrator : plugin's data (extracted from plugin's package.json) and Descriptor, Mediator & Server initializer

### Mediator (extends [Mediator](https://github.com/Psychopoulet/node-pluginsmanager-plugin#mediator-extends-bootable))

  -- Constructor --

  * ``` constructor(options: iMediatorOptions) ```

  -- Events --

  * ``` initialized ``` fired when mediator is initialized
  * ``` released ``` fired when mediator is released

  -- Attributes --

  * ``` initialized: boolean ``` mediator status

  * ``` externalRessourcesDirectory: string ``` used to write local data like sqlite database, json files, pictures, etc... (see iMediatorOptions)

### Server (extends [Server](https://github.com/Psychopoulet/node-pluginsmanager-plugin#mediator-extends-bootable))

### [Descriptor](./lib/Descriptor.json)

### Orchestrator (extends [Orchestrator](https://github.com/Psychopoulet/node-pluginsmanager-plugin#orchestrator-extends-mediatoruser))

## Tests

```bash
$ git clone git://github.com/Psychopoulet/node-pluginsmanager-plugin-terminals.git
$ cd ./node-pluginsmanager-plugin-terminals
$ npm install
$ npm run-script tests
```

## License

  [ISC](LICENSE)
