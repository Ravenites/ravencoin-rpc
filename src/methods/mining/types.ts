export type GetNetworkHashPs = {
  nblocks?: number;
  height?: number;
};

export type GetMiningInfoResponse = {
  blocks: number; // The current block
  currentblockweight: number; // The last block weight
  currentblocktx: number; // The last block transaction
  difficulty: number; // The current difficulty
  networkhashps: number; // The network hashes per second
  hashespersec: number; // The hashes per second of built-in miner
  pooledtx: number; // The size of the mempool
  chain: string; // current network name as defined in BIP70 (main, test, regtest)
  warnings: string; // any network and blockchain warnings
  errors: string; // DEPRECATED. Same as warnings. Only shown when ravend is started with -deprecatedrpc=getmininginfo
};

export type PrioritiseTransaction = {
  txid: string;
  dummy?: number;
  fee_delta: number;
};

export type GetBlockTemplate = {
  template_request?: GetBlockTemplateTemplateRequest;
};

type GetBlockTemplateTemplateRequest = {
  template?: string;
  capabilities?: string[];
  rules?: string[];
};

export type GetBlockTemplateResponse = {
  version: number; // The preferred block version
  rules: string[]; // Specific block rules that are to be enforced
  vbavailable: {
    // Set of pending, supported versionbit (BIP 9) softfork deployments
    rulename: number; // Identifies the bit number as indicating acceptance and readiness for the named softfork rule
  };
  vbrequired: number; // Bit mask of versionbits the server requires set in submissions
  previousblockhash: string; // The hash of current highest block
  transactions: GetBlockTemplateResponseTransaction[]; // Contents of non-coinbase transactions that should be included in the next block
  coinbaseaux: {
    // Data that should be included in the coinbase's scriptSig content
    flags: string; // Key name is to be ignored, and value included in scriptSig
  };
  coinbasevalue: number; // Maximum allowable input to coinbase transaction, including the generation award and transaction fees (in satoshis)
  coinbasetxn: any; // Information for coinbase transaction
  target: string; // The hash target
  mintime: number; // The minimum timestamp appropriate for next block time in seconds since epoch (Jan 1 1970 GMT)
  // List of ways the block template may be changed
  mutable: string[]; // A way the block template may be changed, e.g. 'time', 'transactions', 'prevblock'
  noncerange: string; //  A range of valid nonces
  sigoplimit: number; // Limit of sigops in blocks
  sizelimit: number; // Limit of block size
  weightlimit: number; // Limit of block weight
  curtime: number; // Current timestamp in seconds since epoch (Jan 1 1970 GMT)
  bits: string; // Compressed target of next block
  height: number; // The height of the next block
};

type GetBlockTemplateResponseTransaction = {
  data: string; // Transaction data encoded in hexadecimal (byte-for-byte)
  txid: string; // Transaction id encoded in little-endian hexadecimal
  hash: string; // Hash encoded in little-endian hexadecimal (including witness data)
  depends: number[]; // Transactions before this one (by 1-based index in 'transactions' list) that must be present in the final block if this one is
  fee: number; // Difference in value between transaction inputs and outputs (in satoshis); for coinbase transactions, this is a negative Number of the total collected block fees (ie, not including the block subsidy); if key is not present, fee is unknown and clients MUST NOT assume there isn't one
  sigops: number; // Total SigOps cost, as counted for purposes of block limits; if key is not present, sigop cost is unknown and clients MUST NOT assume it is zero
  weight: number; // Total transaction weight, as counted for purposes of block limits
  required: boolean; // If provided and true, this transaction must be in the final block
};

export type SubmitBlock = {
  hexdata: string;
  dummy?: string;
};

export type Pprpcsb = {
  header_hash: string;
  mix_hash: string;
  nonce: string;
};

export type GetKawpowHash = {
  header_hash: string;
  mix_hash: string;
  nonce: string;
  height: number;
  target?: string;
};

export type GetKawpowHashResponse = {
  result: boolean;
  digest: string;
  mix_hash: string;
  info: string;
  meets_target?: boolean;
};

export type SetGenerate = {
  generate: boolean;
  genproclimit?: number;
};

export type GenerateToAddress = {
  nblocks: number;
  address: string;
  maxtries?: number;
};

export type EstimateFee = {
  nblocks: number;
};

export type EstimateSmartFee = {
  conf_target: number;
  estimate_mode?: 'CONSERVATIVE' | 'UNSET' | 'ECONOMICAL';
};

export type EstimateSmartFeeResponse = {
  feerate?: number; // Estimate fee rate in " + CURRENCY_UNIT + "/kB
  errors?: string[]; // Array of strings. Errors encountered during processing
  blocks: number; // Block number where estimate was found
};

export type EstimateRawFee = {
  conf_target: number;
  threshold?: number;
};

export type EstimateRawFeeResponse = {
  short?: EstimateRawFeeResponseShort; // Estimate for short time horizon
  medium?: any; // Dstimate for medium time horizon
  long: any; // Dstimate for long time horizon
};

type EstimateRawFeeResponseShort = {
  feerate?: number; // Estimate fee rate in " + CURRENCY_UNIT + "/kB
  decay: number; // Exponential decay (per block) for historical moving average of confirmation data
  scale: number; // The resolution of confirmation targets at this time horizon
  pass?: EstimateRawFeeResponseShortPass; // Information about the lowest range of feerates to succeed in meeting the threshold
  fail?: any; // Information about the highest range of feerates to fail to meet the threshold
  errors?: string[]; // Array of strings. Errors encountered during processing
};

type EstimateRawFeeResponseShortPass = {
  startrange: number; // Start of feerate range
  endrange: number; // End of feerate range
  withintarget: number; // Number of txs over history horizon in the feerate range that were confirmed within target
  totalconfirmed: number; // Number of txs over history horizon in the feerate range that were confirmed at any point
  inmempool: number; // Current number of txs in mempool in the feerate range unconfirmed for at least target blocks
  leftmempool: number; // Number of txs over history horizon in the feerate range that left mempool unconfirmed after target
};
