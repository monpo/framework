# Monpo framework

This is a lightweight open source framework for managing mono repositories. The source code is available on [GitHub](https://github.com/monpo/framework) where you can also find our [issue tracker](https://github.com/monpo/framework/issues).

## Installation

Start by installing the monpo command-line tool.

```
$ npm install -g @monpo/cli
```

## Getting started

It's a good practice that we split a large codebase into multiple stand-alone packages. Managing all these pieces can be difficult that's why mono repositories are getting attention these days. The idea is to have only one repository for all the packages your project uses.

Monpo helps you manage mono repositories. It helps you configure and execute commands in multiple packages with a single command.

### Project initialization

Start by creating a new project folder.

```
$ mkdir myProject
$ cd myProject
```

Initialize the project and install the dependencies.

```
$ monpo init
$ npm install
```

You should now create a directory for each package inside the `packages` directory.

### Running commands

You can use the `list` keyword to list all the packages in the repository.

```
$ monpo list
```

You can use the `exec` keyword to run a command inside multiple packages. Use the `--scope` attribute to include only specific packages.

```
$ monpo exec -- npm install
$ monpo exec -- npm test --scope package1
$ monpo exec -- npm publish
```

You can also use the `configure` keyword to set properties for `package.json`. Use the `--scope` attribute to include only specific packages.

```
$ monpo configure --key version --value 1.0.1
$ monpo configure --key main --value src/index.ts --scope
```

Run `monpo --help` for more.

## Packages

[![Build Status](https://travis-ci.org/monpo/framework.svg?branch=master)](https://travis-ci.org/monpo/framework)&nbsp;[![codecov](https://codecov.io/gh/monpo/framework/branch/master/graph/badge.svg)](https://codecov.io/gh/monpo/framework)

| Package | Description | Version
|-|-|-
| [@monpo/cli](https://github.com/monpo/framework/tree/master/packages/monpo-cli) | Command-line interface. | [![NPM Version](https://badge.fury.io/js/@monpo%2Fcli.svg)](https://badge.fury.io/js/monpo%2Fcli)
| [@monpo/init](https://github.com/monpo/framework/tree/master/packages/monpo-init) | Project initializer. | [![NPM Version](https://badge.fury.io/js/@monpo%2Finit.svg)](https://badge.fury.io/js/monpo%2Finit)
| [@monpo/core](https://github.com/monpo/framework/tree/master/packages/monpo-core) | Core library. | [![NPM Version](https://badge.fury.io/js/@monpo%2Fcore.svg)](https://badge.fury.io/js/monpo%2Fcore)

## Contributing

See [CONTRIBUTING.md](https://github.com/monpo/framework/blob/master/CONTRIBUTING.md) for how to help out.

## Licence

See [LICENSE](https://github.com/monpo/framework/blob/master/LICENCE) for details.
