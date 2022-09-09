export type GetBlockchainInfoResponse = {
  chain: string; // Current network name as defined in BIP70 (main, test, regtest)
  blocks: number; // The current number of blocks processed in the server
  headers: number; // The current number of headers we have validated
  bestblockhash: string; // The hash of the currently best block
  difficulty: number; // The current difficulty
  mediantime: number; // Median time for the current best block
  verificationprogress: number; // Estimate of verification progress [0..1]
  chainwork: string; // Total amount of work in active chain, in hexadecimal
  size_on_disk: number; // The estimated size of the block and undo files on disk
  pruned: boolean; // If the blocks are subject to pruning
  pruneheight: number; // Lowest-height complete block stored (only present if pruning is enabled)
  automatic_pruning: boolean; // Whether automatic pruning is enabled (only present if pruning is enabled)
  prune_target_size: number; // The target size used by pruning (only present if automatic pruning is enabled)
  softforks: GetBlockchainInfoResponseSoftFork; // Status of softforks in progress
  bip9_softforks: GetBlockchainInfoResponseBip9SoftFork; // Status of BIP9 softforks in progress
  warnings: string; // Any network and blockchain warnings.
};

type GetBlockchainInfoResponseSoftFork = {
  id: string; // Name of softfork
  version: number; // Block version
  reject: {
    // Progress toward rejecting pre-softfork blocks
    status: boolean; // True if threshold reached
  };
};

type GetBlockchainInfoResponseBip9SoftFork = {
  [key: string]: {
    // name of the softfork
    status: string; // Oone of \"defined\", \"started\", \"locked_in\", \"active\", \"failed\"
    bit: number; // The bit (0-28) in the block version field used to signal this softfork (only for \"started\" status)
    startTime: number; // The minimum median time past of a block at which the bit gains its meaning
    timeout: number; // The median time past of a block at which the deployment is considered failed if not yet locked in
    since: number; // Height of the first block to which the status applies
    statistics: {
      // Numeric statistics about BIP9 signalling for a softfork (only for \"started\" status)
      period: number; // The length in blocks of the BIP9 signalling period
      threshold: number; // The number of blocks with the version bit set required to activate the feature
      elapsed: number; // The number of blocks elapsed since the beginning of the current period
      count: number; // The number of blocks with the version bit set in the current period
      possible: number; // Returns false if there are not enough blocks left in this period to pass activation threshold
    };
  };
};

export type GetChainTxStats = {
  nblocks?: number;
  blockhash?: string;
};

export type GetChainTxStatsResponse = {
  time: number; // The timestamp for the final block in the window in UNIX format.
  txcount: number; // The total number of transactions in the chain up to that point.
  window_block_count: number; // Size of the window in number of blocks.
  window_tx_count: number; // The number of transactions in the window. Only returned if \"window_block_count\" is > 0.
  window_interval: number; // The elapsed time in the window in seconds. Only returned if \"window_block_count\" is > 0.
  txrate: number; // The average rate of transactions per second in the window. Only returned if \"window_interval\" is > 0.
};

export type GetBlock = {
  blockhash: string;
  verbosity?: number;
};

export type GetBlockVerbosity0 = {
  data: string; // A string that is serialized, hex-encoded data for block 'hash'.
};

export type GetBlockVerbosity1 = {
  hash: string; // The block hash (same as provided)
  confirmations: number; // The number of confirmations, or -1 if the block is not on the main chain
  size: number; // The block size
  strippedsize: number; // The block size excluding witness data
  weight: number; // The block weight as defined in BIP 141
  height: number; // The block height or index
  version: number; // The block version
  versionHex: string; // The block version formatted in hexadecimal
  merkleroot: string; // The merkle root
  tx: string[]; // The transaction ids
  time: number; // The block time in seconds since epoch (Jan 1 1970 GMT)
  mediantime: number; // The median block time in seconds since epoch (Jan 1 1970 GMT)
  nonce: number; // The nonce
  bits: string; // The bits
  difficulty: number; // The difficulty
  chainwork: string; // Expected number of hashes required to produce the chain up to this block (in hex)
  previousblockhash: string; // The hash of the previous block
  nextblockhash: string; // The hash of the next block
};

export type GetBlockVerbosity2 = GetBlockVerbosity1 & {
  tx: any[]; // The transactions in the format of the getrawtransaction RPC. Different from verbosity = 1 \"tx\" result.
};

export type DecodeBlock = {
  blockhex: string;
};

export type DecodeBlockResponse = {
  hash: string; // The block hash (same as provided)
  size: number; // The block size
  strippedsize: number; // The block size excluding witness data
  weight: number; // The block weight as defined in BIP 141
  height: number; // The block height or index
  version: number; // The block version
  versionHex: string; // The block version formatted in hexadecimal
  merkleroot: string; // The merkle root
  tx: string[]; // The transaction ids
  time: number; // The block time in seconds since epoch (Jan 1 1970 GMT)
  nonce: number; // The nonce
  bits: string; // The bits
};

export type GetBlockDeltas = {
  blockhash: string;
};

export type GetBlockDeltasResponse = {
  hash: string;
  confirmations: number;
  size: number;
  height: number;
  version: number;
  merkleroot: string;
  deltas: any;
  time: number;
  mediantime: number;
  nonce: number;
  bits: string;
  difficulty: number;
  chainwork: string;
  previousblockhash?: string;
  nextblockhash?: string;
};

export type GetBlockHashes = {
  height: number;
  low: number;
  options: GetBlockHashesOptions;
};

type GetBlockHashesOptions = {
  noOrphans: boolean; // Will only include blocks on the main chain
  logicalTimes: boolean; // Will include logical timestamps with hashes
};

export type GetBlockHashesResponse = {
  hash: string; // The block hash
};

export type GetBlockHashesResponseLogicalTimes = {
  blockhash: string; // The block hash
  logicalts: number; // The logical timestamp
};

export type GetBlockHash = {
  height: number;
};

export type GetBlockHeader = {
  hash: string;
  verbose?: boolean;
};

export type GetBlockHeaderResponseFalse = {
  data: string; // A string that is serialized, hex-encoded data for block 'hash'.
};

export type GetBlockHeaderResponseTrue = {
  hash: string; // The block hash (same as provided)
  confirmations: number; // The number of confirmations, or -1 if the block is not on the main chain
  height: number; // The block height or index
  version: number; // The block version
  versionHex: string; // The block version formatted in hexadecimal
  merkleroot: string; // The merkle root
  time: number; // The block time in seconds since epoch (Jan 1 1970 GMT)
  mediantime: number; // The median block time in seconds since epoch (Jan 1 1970 GMT)
  nonce: number; // The nonce
  bits: string; // The bits
  difficulty: number; // The difficulty
  chainwork: string; // Expected number of hashes required to produce the current chain (in hex)
  previousblockhash: string; // The hash of the previous block
  nextblockhash: string; // The hash of the next block
};

export type GetChainTipsResponse = {
  height: number; // Height of the chain tip
  hash: string; // Block hash of the tip
  branchlen: number; // Zero for main chain. Length of branch connecting the tip to the main chain
  status: // Status of the chain (active, valid-fork, valid-headers, headers-only, invalid)
  | 'invalid' // This branch contains at least one invalid block
    | 'headers-only' // Not all blocks for this branch are available, but the headers are valid
    | 'valid-headers' // All blocks are available for this branch, but they were never fully validated
    | 'valid-fork' // This branch is not part of the active chain, but is fully validated
    | 'active'; // This is the tip of the active main chain, which is certainly valid
};

export type GetMempoolAncestors = {
  txid: string;
  verbose?: boolean;
};

export type GetMempoolAncestorsResponseVerboseFalse = string;

export type GetMempoolAncestorsResponseVerboseTrue = {
  [key: string]: any; // key = transactionid
};

export type GetMempoolDescendants = {
  txid: string;
  verbose?: boolean;
};

export type GetMempoolDescendantsResponseVerboseFalse = string;

export type GetMempoolDescendantsResponseVerboseTrue = {
  [key: string]: any; // key = transactionid
};

export type GetMempoolEntry = {
  txid: string;
};

export type GetMempoolInfoResponse = {
  size: number; // Current tx count
  bytes: number; // Sum of all virtual transaction sizes as defined in BIP 141. Differs from actual serialized size because witness data is discounted
  usage: number; // Total memory usage for the mempool
  maxmempool: number; // Maximum memory usage for the mempool
  mempoolminfee: number; // Minimum fee rate in " + CURRENCY_UNIT + "/kB for tx to be accepted
};

export type GetRawMempool = {
  verbose?: boolean;
};

export type GetRawMempoolResponseVerboseFalse = string;

export type GetRawMempoolResponseVerboseTrue = {
  [key: string]: any; // key = transactionid
};

export type GetTxOut = {
  txid: string;
  n: number;
  include_mempool?: boolean;
};

export type GetTxOutResponse = {
  bestblock: string; // The block hash
  confirmations: number; // The number of confirmations
  value: number; // The transaction value in " + CURRENCY_UNIT + "
  scriptPubKey: GetTxOutResponseScriptPubKey;
  coinbase: boolean; // Coinbase or not
};

type GetTxOutResponseScriptPubKey = {
  asm: string; // code
  hex: string; // hex
  reqSigs: number; // Number of required signatures
  type: string; // The type, eg pubkeyhash
  addresses: string[]; // Array of raven addresses
};

export type getTxOutSetInfoResponse = {
  height: number; // The current block height (index)
  bestblock: string; // The best block hash hex
  transactions: number; // The number of transactions
  txouts: number; // The number of output transactions
  bogosize: number; // A meaningless metric for UTXO set size
  hash_serialized_2: string; // The serialized hash
  disk_size: number; // The estimated size of the chainstate on disk
  total_amount: number; // The total amount
};

export type PruneBlockchain = {
  height: number;
};

export type VerifyChain = {
  checklevel?: number;
  nblocks?: number;
};

export type PreciousBlock = {
  blockhash: string;
};

export type InvalidateBlock = {
  blockhash: string;
};

export type ReconsiderBlock = {
  blockhash: string;
};

export type WaitForNewBlock = {
  timeout?: number;
};

export type WaitForNewBlockResponse = {
  hash: string; // The blockhash
  height: number; // Block height
};

export type WaitForBlock = {
  blockhash: string;
  timeout?: number;
};

export type WaitForBlockResponse = {
  hash: string; // The blockhash
  height: number; // Block height
};

export type WaitForBlockHeight = {
  height: number;
  timeout?: number;
};

export type WaitForBlockHeightResponse = {
  hash: string; // The blockhash
  height: number; // Block height
};
