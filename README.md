# Ravencoin RPC (Beta)

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

- [ ] issue
- [ ] issueUnique
- [ ] listMyAssets
- [ ] listAssetBalancesByAddress
- [ ] getAssetData
- [ ] listAddressesByAsset
- [ ] transferFromAddress
- [ ] transferFromAddresses
- [ ] transfer
- [ ] reissue
- [x] listAssets
- [ ] getCacheInfo
- [ ] transferQualifier
- [ ] issueRestrictedAsset
- [ ] issueQualifierAsset
- [ ] reissueRestrictedAsset
- [ ] addTagToAddress
- [ ] removeTagFromAddress
- [ ] freezeAddress
- [ ] unfreezeAddress
- [ ] freezerestrictedasset
- [ ] unfreezeRestrictedAsset
- [ ] listAddressesForTag
- [ ] listTagsForAddress
- [ ] listAddressRestrictions
- [ ] listGlobalRestrictions
- [ ] getVerifierString
- [ ] checkAddressTag
- [ ] checkAddressRestriction
- [ ] checkGlobalRestriction
- [ ] isValidVerifierString
- [ ] getSnapshot
- [ ] purgeSnapshot

#### Blockchain

- [ ] clearMempool
- [ ] getBlockchainInfo
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

- [ ] getNetworkHashPs
- [ ] getMiningInfo
- [ ] prioritiseTransaction
- [ ] getBlockTemplate
- [ ] submitBlock
- [ ] pprpcsb
- [ ] getKawpowHash
- [ ] getGenerate
- [ ] setGenerate
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
- [ ] echo
- [ ] echojson
- [ ] logging

#### Net

- [ ] getConnectionCount
- [ ] ping
- [ ] getPeerInfo
- [ ] addNode
- [ ] disconnectNode
- [ ] getAddedNodeInfo
- [ ] getNetTotals
- [ ] getNetworkInfo
- [ ] setBan
- [ ] listBanned
- [ ] clearBanned
- [ ] setNetworkActive
- [ ] testGetAssetData

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