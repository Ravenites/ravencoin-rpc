export type GetRawTransaction = {
  txid: string;
  verbose?: boolean;
};

export type GetRawTransactionResponse = {
  hex: string;           // The serialized, hex-encoded data for 'txid'
  txid: string;          // The transaction id (same as provided)
  hash: string;          // The transaction hash (differs from txid for witness transactions)
  size: number;          // The serialized transaction size
  vsize: number;         // The virtual transaction size (differs from size for witness transactions)
  version: number;       // The version
  locktime: number;      // The lock time
  vin: GetRawTransactionVin;
  vout: GetRawTransactionVout;
  blockhash: string;     // The block hash
  confirmations: number; // The confirmations
  time: number;          // The transaction time in seconds since epoch (Jan 1 1970 GMT)
  blocktime: number;     // The block time in seconds since epoch (Jan 1 1970 GMT)
};

type GetRawTransactionVin = {
  txid: string;          // The transaction id
  vout: number;
  scriptSig: VinScriptSig;
  sequence: number;      // The script sequence number
  txinwitness: string[]; // hex-encoded witness data (if any)
};

type VinScriptSig = {
  asm: string;           // the asm
  hex: string;           // the hex
};

type GetRawTransactionVout = {
  value: number;         // The value in " + CURRENCY_UNIT + "
  n: number;             // index
  scriptPubKey: VoutScriptPubKey;
};

type VoutScriptPubKey = {
  asm: string;       // the asm
  hex: string;       // the hex
  reqSigs: number;   // The required sigs
  type: string;      // The type, eg 'pubkeyhash'
  addresses: string; // json array of address strings
};

export type CreateRawTransaction = {
  inputs: Input[];
  outputs: Outputs;
  locktime?: number; // Default = 0. Raw locktime. Non-0 value also locktime-activates inputs
};

type Input = {
  txid: string;      // The transaction id
  vout: number;      // The output number
  sequence?: number; // The sequence number
}

type Outputs = {
  // The destination raven address. Each output must have a different address.
  // The RVN amount
  // e.g. key => 'mjaX9GvK94RuHDHNBnhnyGGKXK1WKjq2Vs': 0.001
  [key: string]: any;
  transfer?: OutputTransfer;
  transferwithmessage?: OutputTransferWithMessage;
  issue?: OutputIssue;
  issue_unique?: OutputIssueUnique;
  reissue?: OutputReissue;
  issue_restricted?: OutputIssueRestricted;
  reissue_restricted?: OutputReissueRestricted;
  issue_qualifier?: OutputIssueQualifier;
  tag_addresses?: OutputTagAddresses;
  untag_addresses?: OutputUntagAddresses;
  freeze_addresses?: OutputFreezeAddresses;
  unfreeze_addresses?: OutputUnfreezeAddresses;
  freeze_asset?: OutputFreezeAsset;
  unfreeze_asset?: OutputUnfreezeAsset;
  data?: string; // Hex encoded data
}

// A json object of assets to send
// The key is the asset name
// The value is the number of raw units to transfer
// e.g. key => '#ABC': 10
type OutputTransfer = {
  [key: string]: string | number;
}

// A json object of describing the transfer and message contents to send
type OutputTransferWithMessage = OutputTransfer & {
  message: string;     // ipfs hash or a txid hash
  expire_time: number; // utc time in seconds to expire the message
}

// A json object describing new assets to issue
type OutputIssue = {
  asset_name: string;     // New asset name
  asset_quantity: number; // The number of raw units to issue
  units: number;          // Display units, between 1 (integral) to 8 (max precision)
  reissuable: number;     // [0-1] 1=reissuable asset
  has_ipfs: number;       // [0-1] 1=passing ipfs_hash
  ipfs_hash?: string;     // An ipfs hash for discovering asset metadata
}

// A json object describing new unique assets to issue
type OutputIssueUnique = {
  root_name: string;             // Name of the asset the unique asset(s)
  asset_tags: string[];          // The unique tag for each asset which is to be issued.
  ipfs_hashes?: string[];        // Ipfs hashes corresponding to each supplied tag. Should be same size as asset_tags.
}

// A json object describing follow-on asset issue
type OutputReissue = {    
  asset_name: string;            // Name of asset to be reissued
  asset_quantity: number;        // The number of raw units to issue
  reissuable?: number;           // [0-1] Default is 1, 1=reissuable asset 
  ipfs_hash?: string;            // An ipfs hash for discovering asset metadata. Overrides the current ipfs hash if given
  owner_change_address?: string; // The address where the owner token will be sent to. If not given, it will be sent to the output address.
}

// A json object describing how restricted asset to issue
type OutputIssueRestricted = {
  asset_name: string;            // New asset name
  asset_quantity: number;        // The number of raw units to issue
  verifier_string: string;       // The verifier string to be used for a restricted asset transfer verification
  units: number;                 // [0-8] Display units, between 0 (integral) and 8 (max precision)
  reissuable: number;            // [0-1] 1=reissuable asset
  has_ipfs: number;              // [0-1] 1=passing ipfs_hash
  ipfs_hash?: string;            // An ipfs hash for discovering asset metadata
  owner_change_address?: string; // The address where the owner token will be sent to. If not given, it will be sent to the output address.
}

// A json object describing follow-on asset issue
type OutputReissueRestricted = {
  asset_name: string;            // Name of asset to be reissued
  asset_quantity: number;        // The number of raw units to issue
  reissuable?: number;           // [0-1] Default is 1, 1=reissuable asset
  verifier_string?: string;      // The verifier string to be used for a restricted asset transfer verification
  ipfs_hash?: string;            // An ipfs hash for discovering asset metadata. Overrides the current ipfs hash if given
  owner_change_address?: string; // The address where the owner token will be sent to. If not given, it will be sent to the output address
}

// A json object describing a new qualifier to issue.
type OutputIssueQualifier = {
  asset_name: string;              // A qualifier name (starts with '#')
  asset_quantity?: number; // Default = 1. The number of units to be issued (1 to 10)
  has_ipfs?: boolean;              // Default = false. Whether ifps hash is going to be added to the asset
  ipfs_hash?: string;              // Optional but required if has_ipfs = 1. An ipfs hash or a txid hash once RIP5 is activated
  root_change_address?: string;    // Only applies when issuing subqualifiers. The address where the root qualifier will be sent. If not specified, it will be sent to the output address.
  change_quantity?: number;        // Default = 1. The asset change amount
}

// A json object describing addresses to be tagged. The address in the key will used as the asset change address.
type OutputTagAddresses = {
  qualifier: string;        // A qualifier name (starts with '#')
  addresses: string[];      // The addresses to be tagged (up to 10)
  change_quantity?: number; // Defaut = 1. The asset change amount
}

// A json object describing addresses to be untagged. The address in the key will be used as the asset change address.
type OutputUntagAddresses = {
  qualifier: string;        // A qualifier name (starts with '#')
  addresses: string[];      // The addresses to be untagged (up to 10)
  change_quantity?: number; // Defaut = 1. The asset change amount
}

// A json object describing addresses to be frozen. The address in the key will used as the owner change address.
type OutputFreezeAddresses = {
  asset_name: string;       // A restricted asset name (starts with '$')
  addresses: string[];      // The addresses to be frozen (up to 10)
}

// A json object describing addresses to be frozen. The address in the key will be used as the owner change address
type OutputUnfreezeAddresses = {
  asset_name: string;       // A restricted asset name (starts with '$')
  addresses: string[];      // The addresses to be unfrozen (up to 10)
}

// A json object describing an asset to be frozen. The address in the key will used as the owner change address.
type OutputFreezeAsset = {
  asset_name: string;       // A restricted asset name (starts with '$')
}

// A json object describing an asset to be frozen. The address in the key will be used as the owner change address.
type OutputUnfreezeAsset = {
  asset_name: string;       // A restricted asset name (starts with '$')
}

export type DecodeRawTransaction = {
  hexstring: string;
};

export type DecodeRawTransactionResponse = {
 txi: string;                // The transaction id
 has: string;                // The transaction hash (differs from txid for witness transactions)
 size: number;               // The transaction size
 vsize: number;              // The virtual transaction size (differs from size for witness transactions)
 version: number;            // The version
 locktime: number;           // The lock time
 vin: DecodeRawTransactionVin[];  
 vout: DecodeRawTransactionVout[];
}

type DecodeRawTransactionVin = {
  txid: string;                       // The transaction id
  vout: number;                       // The output number
  scriptSig: RawTransactionScriptSig;
  txinwitness?: string[];             // hex-encoded witness data (if any)
  sequence: number;                   // The script sequence number
}

type RawTransactionScriptSig = {
  asm: string;
  hex: string;
}

type DecodeRawTransactionVout = {
  value: number; // The value in " + CURRENCY_UNIT + "
  n: number;     // Index
  scriptPubKey: DecodeRawTransactionVoutScriptPubKey;
}

type DecodeRawTransactionVoutScriptPubKey = {
  asm: string;
  hex: string;
  regSigs: number; // The required sigs
  type: string;    // The type, eg 'pubkeyhash'
  asset?: DecodeRawTransactionVoutScriptPubKeyAsset;
  addresses: string[]
}

type DecodeRawTransactionVoutScriptPubKeyAsset = {
  name: string;         // The asset name
  amount: number;       // The amount of asset that was sent
  message?: string;     // The message if one was sent
  expire_time?: number; // The message epoch expiration time if one was set
}

export type DecodeScript = {
  hexstring: string;
};

export type DecodeScriptResponse = {
  asm: string;            // Script public key
  hex: string;            // Hex encoded public key
  type: string;           // The output type
  asset: DecodeScriptResponseAsset;
  addresses: string[];
  p2sh: string;           // Address of P2SH script wrapping this redeem script (not returned if the script is already a P2SH).
  // The following only appears if the script is an asset script
  asset_name?: string;    // Name of the asset.
  amount?: number;        // The amount of assets interacted with.
  units?: number;         // The units of the asset. (Only appears in the type (new_asset))
  reissuable?: boolean;   // If this asset is reissuable. (Only appears in type (new_asset|reissue_asset))
  hasIPFS?: boolean;      // If this asset has an IPFS hash. (Only appears in type (new_asset if hasIPFS is true))
  ipfs_hash?: string;     // The ipfs hash for the new asset. (Only appears in type (new_asset))
  new_ipfs_hash?: string; // If new ipfs hash (Only appears in type. (reissue_asset))
}

type DecodeScriptResponseAsset = {
  name: string;         // The asset name
  amount: number;       // The amount of asset that was sent
  message?: string;     // The message if one was sent
  expire_time?: number; // The message epoch expiration time if one was set
}

export type SendRawTransaction = {
  hexstring: string;
  allowhighfees?: boolean;
};

export type CombineRawTransaction = {
  txs: CombineRawTransactionHexstring[]; // A json array of hex strings of partially signed transactions
};

type CombineRawTransactionHexstring = string; // A transaction hash

export type SignRawTransaction = {
  hexstring: string; // The transaction hex string
  // An array of previous dependent transaction outputs
  prevtxs?: SignRawTransactionPrevTxs[]; // Array of json objects, or 'null' if none provided
  // A json array of base58-encoded private keys for signing
  privkeys?: string[] // Array of strings, or 'null' if none provided. Private key in base58-encoding
  sighashtype?: 'ALL' | 'NONE' | 'SINGLE' | 'ALL|ANYONECANPAY' | 'NONE|ANYONECANPAY' | 'SINGLE|ANYONECANPAY' // Default = ALL. The signature hash type
};

export type SignRawTransactionPrevTxs = {
  txid: string;         // The transaction id
  vout: number;         // The output number
  scriptPubKey: string; // Script key
  redeemScript: string; // Redeem script. Required for P2SH or P2WSH. 
  amount: number;       // The amount spent
}

export type SignRawTransactionResponse = {
  hex: string;       // The hex-encoded raw transaction with signature(s)
  complete: boolean; // If the transaction has a complete set of signatures
  // Script verification errors (if there are any)
  errors?: SignRawTransactionErrors[]
}

export type SignRawTransactionErrors = {
  txid: string;      // The hash of the referenced, previous transaction
  vout: number;      // The index of the output to spent and used as input
  scriptSig: string; // The hex-encoded signature script
  sequence: number;  // Script sequence number
  error: string;     // Verification or signing error related to the input
}

export type TestMempoolAccept = {
  rawtxs: string[];        // An array of hex strings of raw transactions. Length must be one for now.
  allowhighfees?: boolean; // Default = false. Allow high fees.
};

export type TestMempoolAcceptResponse = AcceptanceTest[];

export type AcceptanceTest = {
  txid: string;            // The transaction hash in hex
  allowed: boolean;        // If the mempool allows this tx to be inserted
  'reject-reason': string; // Rejection string (only present when 'allowed' is false)
}

export type GetTxOutProof = {
  // An array of txids to filter
  txids: string[] // A transaction hash
  blockhash?: string; // If specified, looks for txid in the block with this hash
};

export type GetTxOutProofResponse = {
  data: string;
}

export type VerifyTxOutProof = {
  proof: string;
};

export type VerifyTxOutProofResponse = {
  txid: string[];
}
