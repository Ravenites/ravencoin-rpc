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

```javascript
import Client from '@ravenite/ravencoin-rpc';

const client = new Client({
  url: 'http://127.0.0.1:9050',
  username: 'username',
  password: 'password',
});

client.assets.listAssets().then(assets => {
  console.log('assets', assets);
});
```

## Examples and Documentation

See [documentation](https://ravenites.github.io/ravencoin-rpc/Client.html) for developer guides.

## License

Code released under [the MIT license](./LICENSE.md).

### Development

Tested method parameters

#### Assets

- [x] issue
- [x] issueUnique
- [x] listMyAssets
- [x] listAssetBalancesByAddress
- [x] getAssetData
- [x] listAddressesByAsset
- [x] transferFromAddress
- [x] transferFromAddresses
- [x] transfer
- [x] reissue
- [x] listAssets
- [x] getCacheInfo
- [x] transferQualifier
- [x] issueRestrictedAsset
- [x] issueQualifierAsset
- [x] reissueRestrictedAsset
- [ ] addTagToAddress
- [ ] removeTagFromAddress
- [ ] freezeAddress
- [ ] unfreezeAddress
- [ ] freezerestrictedasset
- [ ] unfreezeRestrictedAsset
- [x] listAddressesForTag
- [x] listTagsForAddress
- [x] listAddressRestrictions
- [x] listGlobalRestrictions
- [ ] getVerifierString
- [x] checkAddressTag
- [x] checkAddressRestriction
- [x] checkGlobalRestriction
- [ ] isValidVerifierString
- [ ] getSnapshot
- [ ] purgeSnapshot

#### Blockchain

- [ ] clearMempool
- [x] getBlockchainInfo
- [ ] getChainTxStats
- [ ] getBestBlockHash
- [ ] getBlockCount
- [ ] getBlock
- [ ] decodeBlock
- [ ] getBlockDeltas
- [ ] getBlockHashes
- [ ] getBlockHash
- [ ] getBlockHeader
- [ ] getChainTips
- [ ] getDifficulty
- [ ] getMempoolAncestors
- [ ] getMempoolDescendants
- [ ] getMempoolEntry
- [ ] getMempoolInfo
- [ ] getRawMempool
- [ ] GetTxOut
- [ ] getTxOutSetInfo
- [ ] pruneBlockchain
- [ ] saveMempool
- [ ] verifyChain
- [ ] preciousBlock
- [ ] invalidateBlock
- [ ] reconsiderBlock
- [ ] waitForNewBlock
- [ ] waitForBlock
- [ ] waitForBlockHeight

#### Messages

- [x] viewAllMessages
- [x] viewAllMessageChannels
- [x] subscribeToChannel
- [x] unsubscribeFromChannel
- [x] sendMessage
- [x] viewMyTaggedAddresses
- [x] viewMyRestrictedAddresses
- [x] clearMessages

#### Mining

- [x] getNetworkHashPs
- [x] getMiningInfo
- [x] prioritiseTransaction
- [x] getBlockTemplate
- [ ] submitBlock
- [ ] pprpcsb
- [ ] getKawpowHash
- [x] getGenerate
- [x] setGenerate
- [ ] generateToAddress
- [ ] estimateFee
- [ ] estimateSmartFee
- [ ] estimateRawFee

#### Misc

- [ ] getInfo
- [ ] getMemoryInfo
- [ ] validateAddress
- [ ] createMultisig
- [ ] verifyMessage
- [ ] signMessageWithPrivKey
- [ ] getAddressMempool
- [ ] getAddressUtxos
- [ ] getAddressDeltas
- [ ] getAddressTxIds
- [ ] getAddressBalance
- [ ] getSpentInfo
- [ ] setMockTime
- [x] echo
- [ ] echojson
- [ ] logging

#### Net

- [x] getConnectionCount
- [x] ping
- [x] getPeerInfo
- [x] addNode
- [x] disconnectNode
- [x] getAddedNodeInfo
- [x] getNetTotals
- [x] getNetworkInfo
- [x] setBan
- [x] listBanned
- [x] clearBanned
- [x] setNetworkActive
- [x] testGetAssetData

#### Raw Transactions

- [ ] getRawTransaction
- [ ] createRawTransaction
- [ ] decodeRawTransaction
- [ ] decodeScript
- [ ] sendRawTransaction
- [ ] combineRawTransaction
- [ ] signRawTransaction
- [ ] testMempoolAccept
- [ ] getTxOutProof
- [ ] verifyTxOutProof

#### Rewards

- [ ] requestSnapshot
- [ ] getSnapshotRequest
- [ ] listSnapshotRequests
- [ ] cancelSnapshotRequest
- [ ] distributeReward
- [ ] getDistributeStatus