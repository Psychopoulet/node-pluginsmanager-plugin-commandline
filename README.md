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
$ git clone git://github.com/Psychopoulet/node-pluginsmanager-plugin-terminals.git
```

## Features

  * inheritable parent for node-pluginsmanager's plugin to use distant command line
  * open & close terminals
  * use command line in the terminals
  * get instant push returns

## [OpenAPI documentation](./lib/Descriptor.json)

> See "events" to know the push events
> The events respect the [WebSockets node-pluginsmanager-plugin](https://github.com/Psychopoulet/node-pluginsmanager-plugin/blob/master/documentation/Server.md#websockets) conventions

```typescript
{
  "plugin": "node-pluginsmanager-plugin-terminals";
  "command": string;
  "data"?: any;
}
```

## Tests

```bash
$ git clone git://github.com/Psychopoulet/node-pluginsmanager-plugin-terminals.git
$ cd ./node-pluginsmanager-plugin-terminals
$ npm install
$ npm run-script tests
```

## License

  [ISC](LICENSE)
