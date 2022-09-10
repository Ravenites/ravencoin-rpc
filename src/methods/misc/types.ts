export type GetInfoResponse = {
  deprecation: string; // Sarning that the getinfo command is deprecated and will be removed in 0.16
  version: number; //  The server version
  protocolversion: number; // The protocol version
  walletversion: number; // The wallet version
  balance: number; // The total Ravencoin balance of the wallet
  blocks: number; // The current number of blocks processed in the server
  timeoffset: number; // The time offset
  connections: number; // The number of connections
  proxy: string; // The proxy used by the server
  difficulty: number; // The current difficulty
  testnet: boolean; // If the server is using testnet or not
  keypoololdest: number; // The timestamp (seconds since Unix epoch) of the oldest pre-generated key in the key pool
  keypoolsize: number; // How many new keys are pre-generated
  unlocked_until: number; // The timestamp in seconds since epoch (midnight Jan 1 1970 GMT) that the wallet is unlocked for transfers, or 0 if the wallet is locked
  paytxfee: number; // The transaction fee set in " + CURRENCY_UNIT + "/kB
  relayfee: number; // Minimum relay fee for transactions in " + CURRENCY_UNIT + "/kB
  errors: string; // Any error messages
};

export type GetMemoryInfo = {
  // Determines what kind of information is returned. This argument is optional, the default mode is \"stats\".
  // stats - Returns general statistics about memory usage in the daemon.
  // mallocinfo - Returns an XML string describing low-level heap state (only available if compiled with glibc 2.10+).
  mode: 'stats' | 'mallocinfo';
};

export type GetMemoryInfoResponse = {
  locked: GetMemoryInfoResponseLocked; // Information about locked memory manager
};

type GetMemoryInfoResponseLocked = {
  used: number; // Number of bytes used
  free: number; // Number of bytes available in current arenas
  total: number; // Total number of bytes managed
  locked: number; // Amount of bytes that succeeded locking. If this number is smaller than total, locking pages failed at some point and key data could be swapped to disk.
  chunks_used: number; // Number allocated chunks
  chunks_free: number; // Number unused chunks
};

export type ValidateAddress = {
  address: string;
};

export type ValidateAddressResponse = {
  isvalid: boolean; // If the address is valid or not. If not, this is the only property returned.
  address: string; // The raven address validated
  scriptPubKey: string; // The hex encoded scriptPubKey generated by the address
  ismin: boolean; // If the address is yours or not
  iswatchonly: boolean; // If the address is watchonly
  isscript: boolean; // If the key is a script
  script?: string; // The output script type. Possible types: nonstandard, pubkey, pubkeyhash, scripthash, multisig, nulldata, witness_v0_keyhash, witness_v0_scripthash
  hex?: string; // The redeemscript for the p2sh address
  addresses?: string[]; // Array of addresses associated with the known redeemscript
  sigsrequired?: number; // Number of signatures required to spend multisig output
  pubkey: string; // The hex value of the raw public key
  iscompressed: boolean; // If the address is compressed
  account: string; // DEPRECATED. The account associated with the address, \"\" is the default account
  timestamp: number; // The creation time of the key if available in seconds since epoch (Jan 1 1970 GMT)
  hdkeypath?: string; // The HD keypath if the key is HD and available
  hdmasterkeyid?: string; // The Hash160 of the HD master pubkey
};

export type CreateMultisig = {
  nrequired: number;
  keys: string[];
};

export type CreateMultisigResponse = {
  address: string; // The value of the new multisig address.
  redeemScript: string; // The string value of the hex-encoded redemption script.
};

export type VerifyMessage = {
  address: string;
  signature: string;
  message: string;
};

export type SignMessageWithPrivKey = {
  privkey: string;
  message: string;
};

export type SignMessageWithPrivKeyResponse = {
  signature: string; // The signature of the message encoded in base 64
};

export type GetAddressMempool = {
  addresses: string[]; // Array of base58check encoded address
  includeAssets?: boolean;
};

export type GetAddressMempoolResponse = {
  address: string; // The base58check encoded address
  assetName: string; // The name of the associated asset (RVN for Ravencoin)
  txid: string; // The related txid
  index: number; // The related input or output index
  satoshis: number; // The difference of satoshis
  timestamp: number; // The time the transaction entered the mempool (seconds)
  prevtxid: string; // The previous txid (if spending)
  prevout: string; // The previous transaction output index (if spending)
};

export type GetAddressUtxos = {
  addresses: string[];
  chainInfo?: boolean;
  assetName?: string;
};
export type GetAddressUtxosResponse = {
  address: string; // The address base58check encoded
  assetName: string; // The asset associated with the UTXOs (RVN for Ravencoin)
  txid: string; // The output txid
  height: number; // The block height
  outputIndex: number; // The output index
  script: string; // The script hex encoded
  satoshis: number; // The number of satoshis of the output
};

export type GetAddressDeltas = {
  addresses: string[];
  start: number;
  end: number;
  chainInfo: boolean;
  assetName?: string;
};

export type GetAddressDeltasResponse = {
  assetName: string; // The asset associated with the delta (RVN for Ravencoin)
  satoshis: number; // The difference of satoshis
  txid: string; // The related txid
  index: number; // The related input or output index
  height: number; // The block height
  address: string; // The base58check encoded address
};

export type GetAddressTxIds = {
  addresses: string[];
  start?: number;
  end?: number;
};

export type GetAddressBalance = {
  addresses: string[];
  includeAssets?: boolean;
};

export type GetAddressBalanceResponse = {
  balance: string; // The current balance in satoshis
  received: string; // The total number of satoshis received (including change)
};

export type GetAddressBalanceResponseWithAsset = GetAddressBalanceResponse & {
  assetName: string; // The asset associated with the balance (RVN for Ravencoin)
};

export type GetSpentInfo = {
  txid: string;
  index: number;
};

export type GetSpentInfoResponse = {
  txid: string; // The transaction id
  index: number; // The spending input index
};

export type SetMockTime = {
  timestamp: number;
};

export type loggingRequest = {
  include: string[];
  exclude: string[];
};
