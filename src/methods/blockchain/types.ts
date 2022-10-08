/** GetBlockchainInfoResponse */
export type GetBlockchainInfoResponse = {
  /** Current network name as defined in BIP70 (main, test, regtest) */
  chain: string;
  /** The current number of blocks processed in the server */
  blocks: number;
  /** The current number of headers we have validated */
  headers: number;
  /** The hash of the currently best block */
  bestblockhash: string;
  /** The current difficulty */
  difficulty: number;
  /** DGW-180 or BTC */
  difficulty_algorithm: string;
  /** Median time for the current best block */
  mediantime: number;
  /** Estimate of verification progress [0..1] */
  verificationprogress: number;
  /** Total amount of work in active chain, in hexadecimal */
  chainwork: string;
  /** The estimated size of the block and undo files on disk */
  size_on_disk: number;
  /** If the blocks are subject to pruning */
  pruned: boolean;
  /** Lowest-height complete block stored (only present if pruning is enabled) */
  pruneheight: number;
  /** Whether automatic pruning is enabled (only present if pruning is enabled) */
  automatic_pruning: boolean;
  /** The target size used by pruning (only present if automatic pruning is enabled) */
  prune_target_size: number;
  /** Status of softforks in progress */
  softforks: GetBlockchainInfoResponseSoftFork[];
  /** Status of BIP9 softforks in progress */
  bip9_softforks: GetBlockchainInfoResponseBip9SoftFork;
  /** Any network and blockchain warnings. */
  warnings: string;
};

/** GetBlockchainInfoResponseSoftFork */
type GetBlockchainInfoResponseSoftFork = {
  /** Name of softfork */
  id: string;
  /** Block version */
  version: number;
  reject: {
    // Progress toward rejecting pre-softfork blocks
    /** True if threshold reached */
    status: boolean;
  };
};

/** GetBlockchainInfoResponseBip9SoftFork */
type GetBlockchainInfoResponseBip9SoftFork = {
  [key: string]: {
    // name of the softfork
    /** Oone of \"defined\", \"started\", \"locked_in\", \"active\", \"failed\" */
    status: string;
    /** The bit (0-28) in the block version field used to signal this softfork (only for \"started\" status) */
    bit?: number;
    /** The minimum median time past of a block at which the bit gains its meaning */
    startTime: number;
    /** The median time past of a block at which the deployment is considered failed if not yet locked in */
    timeout: number;
    /** Height of the first block to which the status applies */
    since: number;
    statistics?: {
      // Numeric statistics about BIP9 signalling for a softfork (only for \"started\" status)
      /** The length in blocks of the BIP9 signalling period */
      period: number;
      /** The number of blocks with the version bit set required to activate the feature */
      threshold: number;
      /** The number of blocks elapsed since the beginning of the current period */
      elapsed: number;
      /** The number of blocks with the version bit set in the current period */
      count: number;
      /** Returns false if there are not enough blocks left in this period to pass activation threshold */
      possible: number;
    };
  };
};

/** GetChainTxStats */
export type GetChainTxStats = {
  nblocks?: number;
  blockhash?: string;
};

/** GetChainTxStatsResponse */
export type GetChainTxStatsResponse = {
  /** The timestamp for the final block in the window in UNIX format. */
  time: number;
  /** The total number of transactions in the chain up to that point. */
  txcount: number;
  /** Size of the window in number of blocks. */
  window_block_count: number;
  /** The number of transactions in the window. Only returned if \"window_block_count\" is > 0. */
  window_tx_count: number;
  /** The elapsed time in the window in seconds. Only returned if \"window_block_count\" is > 0. */
  window_interval: number;
  /** The average rate of transactions per second in the window. Only returned if \"window_interval\" is > 0. */
  txrate: number;
};

/** GetBlock */
export type GetBlock = {
  blockhash: string;
  verbosity?: number;
};

/** GetBlockVerbosity0 */
export type GetBlockVerbosity0 = {
  /** A string that is serialized, hex-encoded data for block 'hash'. */
  data: string;
};

/** GetBlockVerbosity1 */
export type GetBlockVerbosity1 = {
  /** The block hash (same as provided) */
  hash: string;
  /** The number of confirmations, or -1 if the block is not on the main chain */
  confirmations: number;
  /** The block size */
  size: number;
  /** The block size excluding witness data */
  strippedsize: number;
  /** The block weight as defined in BIP 141 */
  weight: number;
  /** The block height or index */
  height: number;
  /** The block version */
  version: number;
  /** The block version formatted in hexadecimal */
  versionHex: string;
  /** The merkle root */
  merkleroot: string;
  /** The transaction ids */
  tx: string[];
  /** The block time in seconds since epoch (Jan 1 1970 GMT) */
  time: number;
  /** The median block time in seconds since epoch (Jan 1 1970 GMT) */
  mediantime: number;
  /** The nonce */
  nonce: number;
  /** The bits */
  bits: string;
  /** The difficulty */
  difficulty: number;
  /** Expected number of hashes required to produce the chain up to this block (in hex) */
  chainwork: string;
  /** The hash of the previous block */
  previousblockhash: string;
  /** The hash of the next block */
  nextblockhash: string;
};

/** GetBlockVerbosity2 */
export type GetBlockVerbosity2 = GetBlockVerbosity1 & {
  /** The transactions in the format of the getrawtransaction RPC. Different from verbosity = 1 \"tx\" result. */
  tx: any[];
};

/** DecodeBlock */
export type DecodeBlock = {
  blockhex: string;
};

/** DecodeBlockResponse */
export type DecodeBlockResponse = {
  /** The block hash (same as provided) */
  hash: string;
  /** The block size */
  size: number;
  /** The block size excluding witness data */
  strippedsize: number;
  /** The block weight as defined in BIP 141 */
  weight: number;
  /** The block height or index */
  height: number;
  /** The block version */
  version: number;
  /** The block version formatted in hexadecimal */
  versionHex: string;
  /** The merkle root */
  merkleroot: string;
  /** The transaction ids */
  tx: string[];
  /** The block time in seconds since epoch (Jan 1 1970 GMT) */
  time: number;
  /** The nonce */
  nonce: number;
  /** The bits */
  bits: string;
};

/** GetBlockDeltas */
export type GetBlockDeltas = {
  blockhash: string;
};

/** GetBlockDeltasResponse */
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

/** GetBlockHashes */
export type GetBlockHashes = {
  height: number;
  low: number;
  options: GetBlockHashesOptions;
};

/** GetBlockHashesOptions */
type GetBlockHashesOptions = {
  /** Will only include blocks on the main chain */
  noOrphans: boolean;
  /** Will include logical timestamps with hashes */
  logicalTimes: boolean;
};

/** GetBlockHashesResponse */
export type GetBlockHashesResponse = {
  /** The block hash */
  hash: string;
};

/** GetBlockHashesResponseLogicalTimes */
export type GetBlockHashesResponseLogicalTimes = {
  /** The block hash */
  blockhash: string;
  /** The logical timestamp */
  logicalts: number;
};

/** GetBlockHash */
export type GetBlockHash = {
  height: number;
};

/** GetBlockHeader */
export type GetBlockHeader = {
  hash: string;
  verbose?: boolean;
};

/** GetBlockHeaderResponseFalse */
export type GetBlockHeaderResponseFalse = {
  /** A string that is serialized, hex-encoded data for block 'hash'. */
  data: string;
};

/** GetBlockHeaderResponseTrue */
export type GetBlockHeaderResponseTrue = {
  /** The block hash (same as provided) */
  hash: string;
  /** The number of confirmations, or -1 if the block is not on the main chain */
  confirmations: number;
  /** The block height or index */
  height: number;
  /** The block version */
  version: number;
  /** The block version formatted in hexadecimal */
  versionHex: string;
  /** The merkle root */
  merkleroot: string;
  /** The block time in seconds since epoch (Jan 1 1970 GMT) */
  time: number;
  /** The median block time in seconds since epoch (Jan 1 1970 GMT) */
  mediantime: number;
  /** The nonce */
  nonce: number;
  /** The bits */
  bits: string;
  /** The difficulty */
  difficulty: number;
  /** Expected number of hashes required to produce the current chain (in hex) */
  chainwork: string;
  /** The hash of the previous block */
  previousblockhash: string;
  /** The hash of the next block */
  nextblockhash: string;
};

/** GetChainTipsResponse */
export type GetChainTipsResponse = {
  /** Height of the chain tip */
  height: number;
  /** Block hash of the tip */
  hash: string;
  /** Zero for main chain. Length of branch connecting the tip to the main chain */
  branchlen: number;
  /**
   * Status of the chain (active, valid-fork, valid-headers, headers-only, invalid)
   * invalid - This branch contains at least one invalid block
   * headers-only - Not all blocks for this branch are available, but the headers are valid
   * valid-headers - All blocks are available for this branch, but they were never fully validated
   * valid-fork - This branch is not part of the active chain, but is fully validated
   * active - This is the tip of the active main chain, which is certainly valid
   */
  status:
    | 'invalid'
    | 'headers-only'
    | 'valid-headers'
    | 'valid-fork'
    | 'active';
};

/** GetMempoolAncestors */
export type GetMempoolAncestors = {
  txid: string;
  verbose?: boolean;
};

/** GetMempoolAncestorsResponseVerboseFalse */
export type GetMempoolAncestorsResponseVerboseFalse = string;

/** GetMempoolAncestorsResponseVerboseTrue */
export type GetMempoolAncestorsResponseVerboseTrue = {
  /** key = transactionid */
  [key: string]: any;
};

/** GetMempoolDescendants */
export type GetMempoolDescendants = {
  txid: string;
  verbose?: boolean;
};

/** GetMempoolDescendantsResponseVerboseFalse */
export type GetMempoolDescendantsResponseVerboseFalse = string;

/** GetMempoolDescendantsResponseVerboseTrue */
export type GetMempoolDescendantsResponseVerboseTrue = {
  /** key = transactionid */
  [key: string]: any;
};

/** GetMempoolEntry */
export type GetMempoolEntry = {
  txid: string;
};

/** GetMempoolInfoResponse */
export type GetMempoolInfoResponse = {
  /** Current tx count */
  size: number;
  /** Sum of all virtual transaction sizes as defined in BIP 141. Differs from actual serialized size because witness data is discounted */
  bytes: number;
  /** Total memory usage for the mempool */
  usage: number;
  /** Maximum memory usage for the mempool */
  maxmempool: number;
  /** Minimum fee rate in " + CURRENCY_UNIT + "/kB for tx to be accepted */
  mempoolminfee: number;
};

/** GetRawMempool */
export type GetRawMempool = {
  verbose?: boolean;
};

/** GetRawMempoolResponseVerboseFalse */
export type GetRawMempoolResponseVerboseFalse = string;

/** GetRawMempoolResponseVerboseTrue */
export type GetRawMempoolResponseVerboseTrue = {
  /** key = transactionid */
  [key: string]: any;
};

/** GetTxOut */
export type GetTxOut = {
  txid: string;
  n: number;
  include_mempool?: boolean;
};

/** GetTxOutResponse */
export type GetTxOutResponse = {
  /** The block hash */
  bestblock: string;
  /** The number of confirmations */
  confirmations: number;
  /** The transaction value in " + CURRENCY_UNIT + " */
  value: number;
  scriptPubKey: GetTxOutResponseScriptPubKey;
  /** Coinbase or not */
  coinbase: boolean;
};

/** GetTxOutResponseScriptPubKey */
type GetTxOutResponseScriptPubKey = {
  /** code */
  asm: string;
  /** hex */
  hex: string;
  /** Number of required signatures */
  reqSigs: number;
  /** The type, eg pubkeyhash */
  type: string;
  /** Array of raven addresses */
  addresses: string[];
};

/** getTxOutSetInfoResponse */
export type getTxOutSetInfoResponse = {
  /** The current block height (index) */
  height: number;
  /** The best block hash hex */
  bestblock: string;
  /** The number of transactions */
  transactions: number;
  /** The number of output transactions */
  txouts: number;
  /** A meaningless metric for UTXO set size */
  bogosize: number;
  /** The serialized hash */
  hash_serialized_2: string;
  /** The estimated size of the chainstate on disk */
  disk_size: number;
  /** The total amount */
  total_amount: number;
};

/** PruneBlockchain */
export type PruneBlockchain = {
  height: number;
};

/** VerifyChain */
export type VerifyChain = {
  checklevel?: number;
  nblocks?: number;
};

/** PreciousBlock */
export type PreciousBlock = {
  blockhash: string;
};

/** InvalidateBlock */
export type InvalidateBlock = {
  blockhash: string;
};

/** ReconsiderBlock */
export type ReconsiderBlock = {
  blockhash: string;
};

/** WaitForNewBlock */
export type WaitForNewBlock = {
  timeout?: number;
};

/** WaitForNewBlockResponse */
export type WaitForNewBlockResponse = {
  /** The blockhash */
  hash: string;
  /** Block height */
  height: number;
};

/** WaitForBlock */
export type WaitForBlock = {
  blockhash: string;
  timeout?: number;
};

/** WaitForBlockResponse */
export type WaitForBlockResponse = {
  /** The blockhash */
  hash: string;
  /** Block height */
  height: number;
};

/** WaitForBlockHeight */
export type WaitForBlockHeight = {
  height: number;
  timeout?: number;
};

/** WaitForBlockHeightResponse */
export type WaitForBlockHeightResponse = {
  /** The blockhash */
  hash: string;
  /** Block height */
  height: number;
};
