![Ravencoin RPC Banner](https://github.com/Ravenites/ravencoin-rpc/raw/main/media/repo-banner.png)

# Ravenite - Ravencoin RPC

<a href="https://ravenites.github.io/ravencoin-rpc/Client.html" target="_blank">Documentation Website</a>

A client library to connect to Ravencoin Core RPC in JavaScript.

[![NPM Package](https://img.shields.io/npm/v/@ravenite/ravencoin-rpc.svg?style=flat-square)](https://www.npmjs.org/package/@ravenite/ravencoin-rpc)

**A Ravenite module for [ravencoin](https://github.com/RavenProject/Ravencoin).**

## Getting Started

```sh
# Using npm
npm install @ravenite/ravencoin-rpc

# Using yarn
yarn add @ravenite/ravencoin-rpc
```

### Usage

You can either write manually requests to your RPC connection via the `request` method, or you can use the built-in methods provided by the client class.

#### Manually

```javascript
import Client from '@ravenite/ravencoin-rpc';

const client = new Client({
  url: 'http://127.0.0.1:9050',
  username: 'username',
  password: 'password',
});

client.request('getchaintips').then(response => {
  console.log('response', response);
});
```

#### Built-in Methods

```javascript
import Client from '@ravenite/ravencoin-rpc';

const client = new Client({
  url: 'http://127.0.0.1:9050',
  username: 'username',
  password: 'password',
});

client.methods.listAssets().then(assets => {
  console.log('assets', assets);
});
```

## Examples and Documentation

See [documentation](https://ravenites.github.io/ravencoin-rpc/Client.html) for developer guides.

## License

Code released under [the MIT license](./LICENSE.md).

### Development

Some RPC commands within Ravencore have known bugs. You may experience them as a result. If you find that the issue comes from this library, please create an Issue so that it can be resolved quickly.