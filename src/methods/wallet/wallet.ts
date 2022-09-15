import { IClient } from '@/types';
import {
  AbandonTransaction,
  AddMultisigAddress,
  AddMultisigAddressResponse,
  AddWitnessAddress,
  AddWitnessAddressResponse,
  BackupWallet,
  BumpFee,
  BumpFeeResponse,
  DumpPrivKey,
  DumpPrivKeyResponse,
  DumpWallet,
  DumpWalletResponse,
  EncryptWallet,
  FundRawTransaction,
  FundRawTransactionResponse,
  Generate,
  GetAccount,
  GetAccountAddress,
  GetAccountAddressResponse,
  GetAccountResponse,
  GetAddressesByAccount,
  GetAddressesByAccountResponse,
  GetBalance,
  GetBalanceResponse,
  GetMasterKeyInfoResponse,
  GetMyWordsResponse,
  GetNewAddress,
  GetNewAddressResponse,
  GetRawChangeAddressResponse,
  GetReceivedByAccount,
  GetReceivedByAccountResponse,
  GetReceivedByAddress,
  GetReceivedByAddressResponse,
  GetTransaction,
  GetTransactionResponse,
  GetWalletInfoResponse,
  ImportAddress,
  ImportMulti,
  ImportMultiResponse,
  ImportPrivKey,
  ImportPrunedFunds,
  ImportPubKey,
  ImportWallet,
  KeypoolRefill,
  ListAccounts,
  ListAccountsResponse,
  ListAddressGroupingsResponse,
  ListLockUnspentResponse,
  ListReceivedByAccount,
  ListReceivedByAccountResponse,
  ListReceivedByAddress,
  ListReceivedByAddressResponse,
  ListSinceBlock,
  ListSinceBlockResponse,
  ListTransactions,
  ListTransactionsResponse,
  ListUnspent,
  ListUnspentResponse,
  LockUnspent,
  MoveCmd,
  RemovePrunedFunds,
  RescanBlockchain,
  RescanBlockchainResponse,
  SendFrom,
  SendFromAddress,
  SendMany,
  SendToAddress,
  SetAccount,
  SetTxFee,
  SignMessage,
  WalletPassphrase,
  WalletPassphraseChange,
} from './types';

/**
 * @class Wallet
 * @subcategory Client
 */
export class Wallet {
  private _client: IClient;

  constructor(client: IClient) {
    this._client = client;
  }

  /**
   * Add inputs to a transaction until it has enough in value to meet its out value.
   *
   * This will not modify existing inputs, and will add at most one change output to the outputs.
   *
   * No existing outputs will be modified unless \"subtractFeeFromOutputs\" is specified.
   *
   * Note that inputs which were signed may need to be resigned after completion since in/outputs have been added.
   *
   * The inputs added will not be signed, use signrawtransaction for that.
   *
   * Note that all existing inputs must have their previous output transaction be in the wallet.
   *
   * Note that all inputs selected must be of standard form and P2SH scripts must be in the wallet using importaddress or addmultisigaddress (to calculate fees).
   *
   * You can see whether this is the case by checking the \"solvable\" field in the listunspent output.
   *
   * Only pay-to-pubkey, multisig, and P2SH versions thereof are currently supported for watch-only
   * @param params
   * @param {string} params.hexstring The hex string of the raw transaction
   * @param {Object=} params.options
   * @returns {Promise<FundRawTransactionResponse>}
   */
  async fundRawTransaction(
    params: FundRawTransaction
  ): Promise<FundRawTransactionResponse> {
    return await this._client.request('fundrawtransaction', params);
  }

  /**
   * Immediately re-broadcast unconfirmed wallet transactions to all peers.
   *
   * Intended only for testing; the wallet code periodically re-broadcasts automatically.
   *
   * Returns an RPC error if -walletbroadcast is set to false.
   *
   * Returns array of transaction ids that were re-broadcast.
   * @returns {Promise<string[]>} Transaction ID
   */
  async resendWalletTransactions(): Promise<string[]> {
    return await this._client.request('resendwallettransactions');
  }

  /**
   * Mark in-wallet transaction <txid> as abandoned.
   *
   * This will mark this transaction and all its in-wallet descendants as abandoned which will allow for their inputs to be respent.  It can be used to replace \"stuck\" or evicted transactions.
   *
   * It only works on transactions which are not included in a block and are not currently in the mempool.
   *
   * It has no effect on transactions which are already conflicted or abandoned.
   * @param params
   * @param {string} params.txid The transaction id.
   * @returns {Promise<null>}
   */
  async abandonTransaction(params: AbandonTransaction): Promise<null> {
    return await this._client.request('abandontransaction', params);
  }

  /**
   * Stops current wallet rescan triggered e.g. by an importprivkey call.
   * @returns {Promise<boolean>}
   */
  async abortRescan(): Promise<boolean> {
    return await this._client.request('abortrescan');
  }

  /**
   * Add a nrequired-to-sign multisignature address to the wallet.
   *
   * Each key is a Raven address or hex-encoded public key.
   *
   * If 'account' is specified (DEPRECATED), assign address to that account.
   * @param params
   * @param {number} params.nrequired The number of required signatures out of the n keys or addresses.
   * @param {Array} params.keys A json array of raven addresses or hex-encoded public keys
   * @param {string=} params.account DEPRECATED. An account to assign the addresses to.
   * @returns {Promise<AddMultisigAddressResponse>}
   */
  async addMultisigAddress(
    params: AddMultisigAddress
  ): Promise<AddMultisigAddressResponse> {
    return await this._client.request('addmultisigaddress', params);
  }

  /**
   * Add a witness address for a script (with pubkey or redeemscript known).
   *
   * It returns the witness script.
   * @param params
   * @param {string} addresss An address known to the wallet
   * @returns {Promise<AddWitnessAddressResponse>} The value of the new address (P2SH of witness script).
   */
  async addWitnessAddress(
    params: AddWitnessAddress
  ): Promise<AddWitnessAddressResponse> {
    return await this._client.request('addwitnessaddress', params);
  }

  /**
   * Safely copies current wallet file to destination, which can be a directory or a path with filename.
   * @param params
   * @param {string} params.destination The destination directory or file
   * @returns {Promise<null>}
   */
  async backupWallet(params: BackupWallet): Promise<null> {
    return await this._client.request('backupwallet', params);
  }

  /**
   * Bumps the fee of an opt-in-RBF transaction T, replacing it with a new transaction B.
   *
   * An opt-in RBF transaction with the given txid must be in the wallet.
   *
   * The command will pay the additional fee by decreasing (or perhaps removing) its change output.
   *
   * If the change output is not big enough to cover the increased fee, the command will currently fail instead of adding new inputs to compensate. (A future implementation could improve this.)
   *
   * The command will fail if the wallet or mempool contains a transaction that spends one of T's outputs.
   *
   * By default, the new fee will be calculated automatically using estimatefee.
   *
   * The user can specify a confirmation target for estimatefee.
   *
   * Alternatively, the user can specify totalFee, or use RPC settxfee to set a higher fee rate.
   *
   * At a minimum, the new fee rate must be high enough to pay an additional new relay fee (incrementalfee returned by getnetworkinfo) to enter the node's mempool.
   * @param params
   * @param {string} params.txid The txid to be bumped
   * @param {Object=} params.options
   * @returns {Promise<null | BumpFeeResponse>}
   */
  async bumpFee(params: BumpFee): Promise<null | BumpFeeResponse> {
    return await this._client.request('bumpfee', params);
  }

  /**
   * Reveals the private key corresponding to 'address'.
   *
   * Then the importprivkey can be used with this output.
   * @param params
   * @param {string} params.address The raven address for the private key
   * @returns {Promise<DumpPrivKeyResponse>} The private key
   */
  async dumpPrivKey(params: DumpPrivKey): Promise<DumpPrivKeyResponse> {
    return await this._client.request('dumpprivkey', params);
  }

  /**
   * Dumps all wallet keys in a human-readable format to a server-side file. This does not allow overwriting existing files.
   * @param params
   * @param {string} params.filename The filename with path (either absolute or relative to ravend)
   * @returns {Promise<DumpWalletResponse>} The filename with full absolute path
   */
  async dumpWallet(params: DumpWallet): Promise<DumpWalletResponse> {
    return await this._client.request('dumpwallet', params);
  }

  /**
   * Encrypts the wallet with 'passphrase'. This is for first time encryption.
   *
   * After this, any calls that interact with private keys such as sending or signing will require the passphrase to be set prior the making these calls.
   *
   * Use the walletpassphrase call for this, and then walletlock call.
   *
   * If the wallet is already encrypted, use the walletpassphrasechange call.
   *
   * Note that this will shutdown the server.
   * @param params
   * @param {string} params.passphrase The pass phrase to encrypt the wallet with. It must be at least 1 character, but should be long.
   * @returns {Promise<string>} Wallet encrypted; Raven server stopping, restart to run with encrypted wallet. The keypool has been flushed and a new HD seed was generated (if you are using HD). You need to make a new backup.
   */
  async encryptWallet(params: EncryptWallet): Promise<string> {
    return await this._client.request('encryptwallet', params);
  }

  /**
   * DEPRECATED. Returns the current Raven address for receiving payments to this account.
   * @deprecated
   * @param params
   * @param {string} params.account The account name for the address. It can also be set to the empty string \"\" to represent the default account. The account does not need to exist, it will be created and a new address created  if there is no account by the given name.
   * @returns {Promise<GetAccountAddressResponse>} The account raven address
   */
  async getAccountAddress(
    params: GetAccountAddress
  ): Promise<GetAccountAddressResponse> {
    return await this._client.request('getaccountaddress', params);
  }

  /**
   * DEPRECATED. Returns the account associated with the given address.
   * @deprecated
   * @param params
   * @param {string} params.address The raven address for account lookup.
   * @returns {Promise<GetAccountResponse>} The account address
   */
  async getAccount(params: GetAccount): Promise<GetAccountResponse> {
    return await this._client.request('getaccount', params);
  }

  /**
   * DEPRECATED. Returns the list of addresses for the given account.
   * @deprecated
   * @param params
   * @param {string} params.account The account name.
   * @returns {Promise<GetAddressesByAccountResponse>} A raven address associated with the given account
   */
  async getAddressesByAccount(
    params: GetAddressesByAccount
  ): Promise<GetAddressesByAccountResponse> {
    return await this._client.request('getaddressesbyaccount', params);
  }

  /**
   * If account is not specified, returns the server's total available balance.
   *
   * If account is specified (DEPRECATED), returns the balance in the account.
   *
   * Note that the account \"\" is not the same as leaving the parameter out.
   *
   * The server total may be different to the balance in the default \"\" account.
   * @param params
   * @param {string=} params.account DEPRECATED. The account string may be given as a
   * specific account name to find the balance associated with wallet keys in
   * a named account, or as the empty string (\"\") to find the balance
   * associated with wallet keys not in any named account, or as \"*\" to find
   * the balance associated with all wallet keys regardless of account.
   * When this option is specified, it calculates the balance in a different
   * way than when it is not specified, and which can count spends twice when
   * there are conflicting pending transactions (such as those created by
   * the bumpfee command), temporarily resulting in low or even negative
   * balances. In general, account balance calculation is not considered
   * reliable and has resulted in confusing outcomes, so it is recommended to
   * avoid passing this argument.
   * @param {number=} [params.minconf=1] Only include transactions confirmed at least this many times.
   * @param {boolean=} [params.include_watchonly=false] Also include balance in watch-only addresses (see 'importaddress')
   * @returns {Promise<GetBalanceResponse>} The total amount in " + CURRENCY_UNIT + " received for this account.
   */
  async getBalance(params: GetBalance): Promise<GetBalanceResponse> {
    return await this._client.request('getbalance', params);
  }

  /**
   * Fetches and displays the master private key and the master public key.
   * @returns {Promise<GetMasterKeyInfoResponse>}
   */
  async getMasterKeyInfo(): Promise<GetMasterKeyInfoResponse> {
    return await this._client.request('getmasterkeyinfo');
  }

  /**
   * Returns the 12 words and passphrase used by BIP39 to generate the wallets private keys.
   *
   * Only returns value if wallet was created by the 12 words import/generation.
   * @returns {Promise<GetMyWordsResponse>}
   */
  async getMyWords(): Promise<GetMyWordsResponse> {
    return await this._client.request('getmywords');
  }

  /**
   * eturns a new Raven address for receiving payments.
   *
   * If 'account' is specified (DEPRECATED), it is added to the address book so payments received with the address will be credited to 'account'.
   * @param params
   * @param {string=} params.account DEPRECATED. The account name for the address to be linked to. If not provided, the default account \"\" is used. It can also be set to the empty string \"\" to represent the default account. The account does not need to exist, it will be created if there is no account by the given name.
   * @returns {Promise<GetNewAddressResponse>} The new raven address
   */
  async getNewAddress(params: GetNewAddress): Promise<GetNewAddressResponse> {
    return await this._client.request('getnewaddress', params);
  }

  /**
   * Returns a new Raven address, for receiving change.
   *
   * This is for use with raw transactions, NOT normal use.
   * @returns {Promise<GetRawChangeAddressResponse>} The address
   */
  async getRawChangeAddress(): Promise<GetRawChangeAddressResponse> {
    return await this._client.request('getrawchangeaddress');
  }

  /**
   * DEPRECATED. Returns the total amount received by addresses with <account> in transactions with at least [minconf] confirmations.
   * @deprecated
   * @param params
   * @param {string} params.account The selected account, may be the default account using \"\".
   * @param {number=} [params.minconf=1] Default = 1. Only include transactions confirmed at least this many times.
   * @returns {Promise<GetReceivedByAccountResponse>} The total amount in " + CURRENCY_UNIT + " received for this account.
   */
  async getReceivedByAccount(
    params: GetReceivedByAccount
  ): Promise<GetReceivedByAccountResponse> {
    return await this._client.request('getreceivedbyaccount', params);
  }

  /**
   * Returns the total amount received by the given address in transactions with at least minconf confirmations.
   * @param params
   * @param {string} params.address The raven address for transactions.
   * @param {number=} [params.minconf=1] Default = 1. Only include transactions confirmed at least this many times.
   * @returns {Promise<GetReceivedByAddressResponse>} The total amount in " + CURRENCY_UNIT + " received at this address.
   */
  async getReceivedByAddress(
    params: GetReceivedByAddress
  ): Promise<GetReceivedByAddressResponse> {
    return await this._client.request('getreceivedbyaddress', params);
  }

  /**
   * Get detailed information about in-wallet transaction <txid>
   * @param params
   * @param {string} params.txid The transaction id
   * @param {boolean=} [params.include_watchonly=false] Default = false. Whether to include watch-only addresses in balance calculation and details[]
   * @returns {Promise<GetTransactionResponse>}
   */
  async getTransaction(
    params: GetTransaction
  ): Promise<GetTransactionResponse> {
    return await this._client.request('gettransaction', params);
  }

  /**
   * Returns the server's total unconfirmed balance
   * @returns {Promise<null | any>}
   */
  async getUnconfirmedBalance(): Promise<null | any> {
    return await this._client.request('getunconfirmedbalance');
  }

  /**
   * Returns an object containing various wallet state info.
   * @returns {Promise<GetWalletInfoResponse>}
   */
  async getWalletInfo(): Promise<GetWalletInfoResponse> {
    return await this._client.request('getwalletinfo');
  }

  /**
   * Import addresses/scripts (with private or public keys, redeem script (P2SH)), rescanning all addresses in one-shot-only (rescan can be disabled via options).
   * @param params
   * @param {Array} params.requests Data to be imported
   * @param {Object} params.options
   * @returns {Promise<ImportMultiResponse[]>} Response is an array with the same size as the input that has the execution result
   */
  async importMulti(params: ImportMulti): Promise<ImportMultiResponse[]> {
    return await this._client.request('importmulti', params);
  }

  /**
   * Adds a private key (as returned by dumpprivkey) to your wallet.
   * 
   * Note: This call can take minutes to complete if rescan is true.
   * @example
    // Import the private key with rescan
    client.wallet.importPrivKey({ privkey: 'mykey' })
   * @example
    // Import using a label and without rescan
    client.wallet.importPrivKey({ privkey: 'mykey', rescan: false })
   * @example
    // Import using default blank label and without rescan
    client.wallet.importPrivKey({ privkey: 'mykey', label: '', rescan: false })
   * @example
    // As a JSON-RPC call
    client.wallet.importPrivKey({ privkey: 'mykey', label: 'testing', rescan: false })
   * @param params
   * @param {string} params.privkey The private key (see dumpprivkey)
   * @param {string=} [params.label=''] An optional label
   * @param {boolean=} [params.rescan=true] Rescan the wallet for transactions
   * @returns {Promise<null>}
   */
  async importPrivKey(params: ImportPrivKey): Promise<null> {
    return await this._client.request('importprivkey', params);
  }

  /**
   * Imports keys from a wallet dump file (see dumpwallet).
   * @param params
   * @param {string} params.filename The wallet file
   * @returns {Promise<null>}
   */
  async importWallet(params: ImportWallet): Promise<null> {
    return await this._client.request('importwallet', params);
  }

  /**
   * Adds a script (in hex) or address that can be watched as if it were in your wallet but cannot be used to spend.
   *
   * Note: This call can take minutes to complete if rescan is true.
   *
   * If you have the full public key, you should call importpubkey instead of this.
   *
   * Note: If you import a non-standard raw script in hex form, outputs sending to it will be treated as change, and not show up in many RPCs.
   *
   * @example
   * // Import a script with rescan
   * client.wallet.importAddress({ script: 'myscript' })
   * @example
   * // Import using a label without rescan
   * client.wallet.importAddress({ script: 'myscript', label: 'testing', rescan: false })
   * @param params
   * @param {string} params.script The hex-encoded script (or address)
   * @param {string=} [params.label=''] An optional label
   * @param {boolean=} [params.rescan=true] Rescan the wallet for transactions
   * @param {boolean=} [params.p2sh=false] Add the P2SH version of the script as well
   * @returns {Promise<null>}
   */
  async importAddress(params: ImportAddress): Promise<null> {
    return await this._client.request('importaddress', params);
  }

  /**
   * Imports funds without rescan. Corresponding address or script must previously be included in wallet. Aimed towards pruned wallets. The end-user is responsible to import additional transactions that subsequently spend the imported outputs or rescan after the point in the blockchain the transaction is included.
   * @param params
   * @param {string} params.rawtransaction A raw transaction in hex funding an already-existing address in wallet
   * @param {string} params.txoutproof The hex output from gettxoutproof that contains the transaction
   * @returns {Promise<null>}
   */
  async importPrunedFunds(params: ImportPrunedFunds): Promise<null> {
    return await this._client.request('importprunedfunds', params);
  }

  /**
   * Adds a public key (in hex) that can be watched as if it were in your wallet but cannot be used to spend.
   *
   * Note: This call can take minutes to complete if rescan is true.
   * @param params
   * @param {string} params.pubkey The hex-encoded public key
   * @param {string=} [params.label=''] An optional label
   * @param {boolean=} [params.rescan=true] Rescan the wallet for transactions
   * @returns {Promise<null>}
   */
  async importPubKey(params: ImportPubKey): Promise<null> {
    return await this._client.request('importpubkey', params);
  }

  /**
   * Fills the keypool.
   * @param params
   * @param {number=} [params.newsize=100] The new keypool size
   * @returns {Promise<null>}
   */
  async keypoolRefill(params: KeypoolRefill): Promise<null> {
    return await this._client.request('keypoolrefill', params);
  }

  /**
   * DEPRECATED. Returns Object that has account names as keys, account balances as values.
   * @deprecated
   * @param params
   * @param {number=} [params.minconf=1] Only include transactions with at least this many confirmations
   * @param {boolean=} [params.include_watchonly=false] Include balances in watch-only addresses (see 'importaddress')
   * @returns {Promise<ListAccountsResponse>}
   */
  async listAccounts(params: ListAccounts): Promise<ListAccountsResponse> {
    return await this._client.request('listaccounts', params);
  }

  /**
   * Lists groups of addresses which have had their common ownership made public by common use as inputs or as the resulting change in past transactions
   * @returns {Promise<ListAddressGroupingsResponse[][][]>}
   */
  async listAddressGroupings(): Promise<ListAddressGroupingsResponse[][][]> {
    return await this._client.request('listaddressgroupings');
  }

  /**
   * Returns list of temporarily unspendable outputs.
   *
   * See the lockunspent call to lock and unlock transactions for spending.
   * @returns {Promise<ListLockUnspentResponse[]>}
   */
  async listLockUnspent(): Promise<ListLockUnspentResponse[]> {
    return await this._client.request('listlockunspent');
  }

  /**
   * DEPRECATED. List balances by account.
   * @deprecated
   * @param params
   * @param {number=} [params.minconf=1] The minimum number of confirmations before payments are included.
   * @param {boolean=} [params.include_empty=false] Whether to include accounts that haven't received any payments.
   * @param {boolean=} [params.include_watchonly=false] Whether to include watch-only addresses (see 'importaddress').
   * @returns {Promise<ListReceivedByAccountResponse[]>}
   */
  async listReceivedByAccount(
    params: ListReceivedByAccount
  ): Promise<ListReceivedByAccountResponse[]> {
    return await this._client.request('listreceivedbyaccount', params);
  }

  /**
   * List balances by receiving address.
   * @param params
   * @param {number=} [params.minconf=1] The minimum number of confirmations before payments are included.
   * @param {boolean=} [params.include_empty=false] Whether to include addresses that haven't received any payments.
   * @param {boolean=} [params.include_watchonly=false] Whether to include watch-only addresses (see 'importaddress').
   * @returns {Promise<ListReceivedByAddressResponse[]>}
   */
  async listReceivedByAddress(
    params: ListReceivedByAddress
  ): Promise<ListReceivedByAddressResponse[]> {
    return await this._client.request('listreceivedbyaddress', params);
  }

  /**
   * Get all transactions in blocks since block [blockhash], or all transactions if omitted.
   *
   * If \"blockhash\" is no longer a part of the main chain, transactions from the fork point onward are included.
   *
   * Additionally, if include_removed is set, transactions affecting the wallet which were removed are returned in the \"removed\" array.
   * @param params
   * @param {string=} params.blockhash The block hash to list transactions since
   * @param {number=} [params.target_confirmations=1] Return the nth block hash from the main chain. e.g. 1 would mean the best block hash. Note: this is not used as a filter, but only affects [lastblock] in the return value
   * @param {boolean=} [params.include_watchonly=false] Include transactions to watch-only addresses (see 'importaddress')
   * @param {boolean=} [params.include_removed=true] Show transactions that were removed due to a reorg in the \"removed\" array (not guaranteed to work on pruned nodes)
   * @returns {Promise<ListSinceBlockResponse>}
   */
  async listSinceBlock(
    params: ListSinceBlock
  ): Promise<ListSinceBlockResponse> {
    return await this._client.request('listsinceblock', params);
  }

  /**
   * Returns up to 'count' most recent transactions skipping the first 'from' transactions for account 'account'.
   * @param params
   * @param {string=} params.account DEPRECATED. The account name. Should be \"*\".
   * @param {number=} [params.count=10] The number of transactions to return
   * @param {number=} [params.skip=0] The number of transactions to skip
   * @param {boolean=} [params.include_watchonly=false] Include transactions to watch-only addresses (see 'importaddress')
   * @returns {Promise<ListTransactionsResponse[]>}
   */
  async listTransactions(
    params: ListTransactions
  ): Promise<ListTransactionsResponse[]> {
    return await this._client.request('listtransactions', params);
  }

  /**
   * Returns array of unspent transaction outputs with between minconf and maxconf (inclusive) confirmations.
   *
   * Optionally filter to only include txouts paid to specified addresses.
   * @param params
   * @param {number=} [params.minconf=1] The minimum confirmations to filter
   * @param {number=} [params.maxconf=9999999] The maximum confirmations to filter
   * @param {Array} params.addresses An array of raven addresses to filter
   * @param {boolean=} [params.include_unsafe=true] Include outputs that are not safe to spend. See description of \"safe\" attribute below.
   * @param {Object} params.query_options JSON with query options
   * @returns {Promise<ListUnspentResponse[]>}
   */
  async listUnspent(params: ListUnspent): Promise<ListUnspentResponse[]> {
    return await this._client.request('listunspent', params);
  }

  /**
   * Returns a list of currently loaded wallets.
   *
   * For full information on the wallet, use getWalletInfo
   * @returns {Promise<string[]>} Array of wallet names
   */
  async listWallets(): Promise<string[]> {
    return await this._client.request('listwallets');
  }

  /**
   * Updates list of temporarily unspendable outputs.
   *
   * Temporarily lock (unlock=false) or unlock (unlock=true) specified transaction outputs.
   *
   * If no transaction outputs are specified when unlocking then all current locked transaction outputs are unlocked.
   *
   * A locked transaction output will not be chosen by automatic coin selection, when spending ravens.
   *
   * Locks are stored in memory only. Nodes start with zero locked outputs, and the locked output list is always cleared (by virtue of process exit) when a node stops or fails.
   * @param params
   * @param {boolean} params.unlock Whether to unlock (true) or lock (false) the specified transactions
   * @param {Array} params.transactions An array of objects. Each object the txid (string) vout (numeric)
   * @returns {Promise<boolean>} Whether the command was successful or not
   */
  async lockUnspent(params: LockUnspent): Promise<boolean> {
    return await this._client.request('lockunspent', params);
  }

  /**
   * DEPRECATED. Move a specified amount from one account in your wallet to another.
   * @deprecated
   * @param params
   * @param {string} params.fromaccount The name of the account to move funds from. May be the default account using \"\".
   * @param {string} params.toaccount The name of the account to move funds to. May be the default account using \"\".
   * @param {number} params.amount Quantity of " + CURRENCY_UNIT + " to move between accounts.
   * @param {number=} params.dummy Ignored. Remains for backward compatibility.
   * @param {string=} params.comment An optional comment, stored in the wallet only.
   * @returns {Promise<boolean>} True if successful.
   */
  async moveCmd(params: MoveCmd): Promise<boolean> {
    return await this._client.request('movecmd', params);
  }

  /**
   * DEPRECATED (use sendtoaddress). Sent an amount from an account to a raven address.
   * @deprecated
   * @param params
   * @param {string} params.fromaccount The name of the account to send funds from. May be the default account using "". Specifying an account does not influence coin selection, but it does associate the newly created transaction with the account, so the account's balance computation and transaction history can reflect the spend.
   * @param {string} params.toaddress The raven address to send funds to.
   * @param {(string|number)} params.amount The amount in " + CURRENCY_UNIT + " (transaction fee is added on top).
   * @param {number=} [params.minconf=1] Only use funds with at least this many confirmations.
   * @param {string=} params.comment A comment used to store what the transaction is for. This is not part of the transaction, just kept in your wallet.
   * @param {string=} params.comment_to An optional comment to store the name of the person or organization to which you're sending the transaction. This is not part of the transaction, it is just kept in your wallet.
   * @returns {Promise<string>} The transaction id.
   */
  async sendFrom(params: SendFrom): Promise<string> {
    return await this._client.request('sendfrom', params);
  }

  /**
   * Send multiple times. Amounts are double-precision floating point numbers.
   * @param params
   * @param {string} params.fromaccount DEPRECATED. The account to send the funds from. Should be \"\" for the default account
   * @param {string} params.amounts A json object with addresses and amounts. "address":amount  (numeric or string) The raven address is the key, the numeric amount (can be string) in " + CURRENCY_UNIT + " is the value
   * @param {number=} [params.minconf=1] Default = 1. Only use the balance confirmed at least this many times.
   * @param {string=} params.comment A comment
   * @param {Array=} params.subtractfeefrom A json array with addresses. The fee will be equally deducted from the amount of each selected address. Those recipients will receive less ravens than you enter in their corresponding amount field. If no addresses are specified here, the sender pays the fee. Subtract fee from listed addresses.
   * @param {number=} params.conf_target Confirmation target (in blocks)
   * @param {string=} [params.estimate_mode=UNSET] Default = UNSET. The fee estimate mode, must be one of: "UNSET", "ECONOMICAL", "CONSERVATIVE"
   * @returns {Promise<string>} The transaction id for the send. Only 1 transaction is created regardless of the number of addresses.
   */
  async sendMany(params: SendMany): Promise<string> {
    return await this._client.request('sendmany', params);
  }

  /**
   * Send an amount to a given address.
   * @param params
   * @param {string} params.address The raven address to send to.
   * @param {(string|number)} params.amount The amount in " + CURRENCY_UNIT + " to send. eg 0.1
   * @param {string=} params.comment A comment used to store what the transaction is for. This is not part of the transaction, just kept in your wallet.
   * @param {string=} params.comment_to A comment to store the name of the person or organization to which you're sending the transaction. This is not part of the transaction, just kept in your wallet.
   * @param {boolean=} [params.subtractfeefromamount=false] Default = false. The fee will be deducted from the amount being sent. The recipient will receive less ravens than you enter in the amount field.
   * @param {number=} params.conf_target Confirmation target (in blocks)
   * @param {string} params.estimate_mode Default = UNSET. The fee estimate mode, must be one of: "UNSET", "ECONOMICAL", "CONSERVATIVE"
   * @returns {Promise<string>} The transaction id.
   */
  async sendToAddress(params: SendToAddress): Promise<string> {
    return await this._client.request('sendtoaddress', params);
  }

  /**
   * Send an amount from a specific address to a given address. All rvn change will get sent back to the from_address
   * @param params
   * @param {string} params.from_address The raven address to send from.
   * @param {string} params.to_address The raven address to send to.
   * @param {(string|number)} params.amount The amount in " + CURRENCY_UNIT + " to send. eg 0.1
   * @param {string=} params.comment A comment used to store what the transaction is for. This is not part of the transaction, just kept in your wallet.
   * @param {string=} params.comment_to A comment to store the name of the person or organization to which you're sending the transaction. This is not part of the transaction, just kept in your wallet.
   * @param {boolean=} [params.subtractfeefromamount=false]  (boolean, optional, default=false) The fee will be deducted from the amount being sent. The recipient will receive less ravens than you enter in the amount field.
   * @param {number=} params.conf_target Confirmation target (in blocks)
   * @param {string=} [params.estimate_mode=UNSET] Default = UNSET. The fee estimate mode, must be one of: UNSET, ECONOMICAL, CONSERVATIVE
   * @returns {Promise<string>} The transaction id.
   */
  async sendFromAddress(params: SendFromAddress): Promise<string> {
    return await this._client.request('sendfromaddress', params);
  }

  /**
   * DEPRECATED. Sets the account associated with the given address.
   * @deprecated
   * @param params
   * @param {string} params.address The raven address to be associated with an account.
   * @param {string} params.account The account to assign the address to.
   * @returns {Promise<null>}
   */
  async setAccount(params: SetAccount): Promise<null> {
    return await this._client.request('setaccount', params);
  }

  /**
   * Set the transaction fee per kB. Overwrites the paytxfee parameter.
   * @param params
   * @param {(string|number)} params.amount The transaction fee in " + CURRENCY_UNIT + "/kB
   * @returns {Promise<boolean>} Returns true if successful
   */
  async setTxFee(params: SetTxFee): Promise<boolean> {
    return await this._client.request('settxfee', params);
  }

  /**
   * Sign a message with the private key of an address
   * @param params
   * @param {string} params.address The raven address to use for the private key.
   * @param {string} params.message The message to create a signature of.
   * @returns {Promise<string>} The signature of the message encoded in base 64
   */
  async signMessage(params: SignMessage): Promise<string> {
    return await this._client.request('signmessage', params);
  }

  /**
   * Removes the wallet encryption key from memory, locking the wallet.
   *
   * After calling this method, you will need to call walletpassphrase again before being able to call any methods which require the wallet to be unlocked.
   * @returns {Promise<null>}
   */
  async walletLock(): Promise<null> {
    return await this._client.request('walletlock');
  }

  /**
   * Changes the wallet passphrase from 'oldpassphrase' to 'newpassphrase'.
   * @param params
   * @param {string} params.oldpassphrase The current passphrase
   * @param {string} params.newpassphrase The new passphrase
   * @returns {Promise<null>}
   */
  async walletPassphraseChange(params: WalletPassphraseChange): Promise<null> {
    return await this._client.request('walletpassphrasechange', params);
  }

  /**
   * Stores the wallet decryption key in memory for 'timeout' seconds.
   *
   * This is needed prior to performing transactions related to private keys such as sending ravens
   *
   * Issuing the walletpassphrase command while the wallet is already unlocked will set a new unlock time that overrides the old one.
   * @example
   * // Unlock the wallet for 60 seconds
   * client.wallet.walletPassphrase({ passphrase: 'my pass phrase', timeout: 60 })
   * @param params
   * @param {string} params.passphrase The wallet passphrase
   * @param {number} params.timeout The time to keep the decryption key in seconds.
   * @returns {Promise<null>}
   */
  async walletPassphrase(params: WalletPassphrase): Promise<null> {
    return await this._client.request('walletpassphrase', params);
  }

  /**
   * Deletes the specified transaction from the wallet. Meant for use with pruned wallets and as a companion to importprunedfunds. This will affect wallet balances.
   * @param params
   * @param {string} params.txid The hex-encoded id of the transaction you are deleting
   * @returns {Promise<null>}
   */
  async removePrunedFunds(params: RemovePrunedFunds): Promise<null> {
    return await this._client.request('removeprunedfunds', params);
  }

  /**
   * Rescan the local blockchain for wallet related transactions.
   * @param params
   * @param {number=} params.start_height Block height where the rescan should start
   * @param {number=} params.stop_height The last block height that should be scanned
   * @returns {Promise<RescanBlockchainResponse>}
   */
  async rescanBlockchain(
    params: RescanBlockchain
  ): Promise<RescanBlockchainResponse> {
    return await this._client.request('rescanblockchain', params);
  }

  /**
   * Mine up to nblocks blocks immediately (before the RPC call returns) to an address in the wallet.
   * @param params
   * @param {number} params.nblocks How many blocks are generated immediately.\n"
   * @param {number=} params.maxtries How many iterations to try (default = 1000000).\n"
   * @returns {Promise<string[]>} Hashes of blocks generated
   */
  async generate(params: Generate): Promise<string[]> {
    return await this._client.request('generate', params);
  }
}

// static const CRPCCommand commands[] =
// { //  category              name                        actor (function)           argNames
//     //  --------------------- ------------------------    -----------------------  ----------
//     { "rawtransactions",    "fundrawtransaction",       &fundrawtransaction,       {"hexstring","options"} },
//     { "hidden",             "resendwallettransactions", &resendwallettransactions, {} },
//     { "wallet",             "abandontransaction",       &abandontransaction,       {"txid"} },
//     { "wallet",             "abortrescan",              &abortrescan,              {} },
//     { "wallet",             "addmultisigaddress",       &addmultisigaddress,       {"nrequired","keys","account"} },
//     { "wallet",             "addwitnessaddress",        &addwitnessaddress,        {"address"} },
//     { "wallet",             "backupwallet",             &backupwallet,             {"destination"} },
//     { "wallet",             "bumpfee",                  &bumpfee,                  {"txid", "options"} },
//     { "wallet",             "dumpprivkey",              &dumpprivkey,              {"address"}  },
//     { "wallet",             "dumpwallet",               &dumpwallet,               {"filename"} },
//     { "wallet",             "encryptwallet",            &encryptwallet,            {"passphrase"} },
//     { "wallet",             "getaccountaddress",        &getaccountaddress,        {"account"} },
//     { "wallet",             "getaccount",               &getaccount,               {"address"} },
//     { "wallet",             "getaddressesbyaccount",    &getaddressesbyaccount,    {"account"} },
//     { "wallet",             "getbalance",               &getbalance,               {"account","minconf","include_watchonly"} },
//     { "wallet",             "getmasterkeyinfo",         &getmasterkeyinfo,         {} },
//     { "wallet",             "getmywords",               &getmywords,                        {} },
//     { "wallet",             "getnewaddress",            &getnewaddress,            {"account"} },
//     { "wallet",             "getrawchangeaddress",      &getrawchangeaddress,      {} },
//     { "wallet",             "getreceivedbyaccount",     &getreceivedbyaccount,     {"account","minconf"} },
//     { "wallet",             "getreceivedbyaddress",     &getreceivedbyaddress,     {"address","minconf"} },
//     { "wallet",             "gettransaction",           &gettransaction,           {"txid","include_watchonly"} },
//     { "wallet",             "getunconfirmedbalance",    &getunconfirmedbalance,    {} },
//     { "wallet",             "getwalletinfo",            &getwalletinfo,            {} },
//     { "wallet",             "importmulti",              &importmulti,              {"requests","options"} },
//     { "wallet",             "importprivkey",            &importprivkey,            {"privkey","label","rescan"} },
//     { "wallet",             "importwallet",             &importwallet,             {"filename"} },
//     { "wallet",             "importaddress",            &importaddress,            {"address","label","rescan","p2sh"} },
//     { "wallet",             "importprunedfunds",        &importprunedfunds,        {"rawtransaction","txoutproof"} },
//     { "wallet",             "importpubkey",             &importpubkey,             {"pubkey","label","rescan"} },
//     { "wallet",             "keypoolrefill",            &keypoolrefill,            {"newsize"} },
//     { "wallet",             "listaccounts",             &listaccounts,             {"minconf","include_watchonly"} },
//     { "wallet",             "listaddressgroupings",     &listaddressgroupings,     {} },
//     { "wallet",             "listlockunspent",          &listlockunspent,          {} },
//     { "wallet",             "listreceivedbyaccount",    &listreceivedbyaccount,    {"minconf","include_empty","include_watchonly"} },
//     { "wallet",             "listreceivedbyaddress",    &listreceivedbyaddress,    {"minconf","include_empty","include_watchonly"} },
//     { "wallet",             "listsinceblock",           &listsinceblock,           {"blockhash","target_confirmations","include_watchonly","include_removed"} },
//     { "wallet",             "listtransactions",         &listtransactions,         {"account","count","skip","include_watchonly"} },
//     { "wallet",             "listunspent",              &listunspent,              {"minconf","maxconf","addresses","include_unsafe","query_options"} },
//     { "wallet",             "listwallets",              &listwallets,              {} },
//     { "wallet",             "lockunspent",              &lockunspent,              {"unlock","transactions"} },
//     { "wallet",             "move",                     &movecmd,                  {"fromaccount","toaccount","amount","minconf","comment"} },
//     { "wallet",             "sendfrom",                 &sendfrom,                 {"fromaccount","toaddress","amount","minconf","comment","comment_to"} },
//     { "wallet",             "sendmany",                 &sendmany,                 {"fromaccount","amounts","minconf","comment","subtractfeefrom", "conf_target","estimate_mode"} },
//     { "wallet",             "sendtoaddress",            &sendtoaddress,            {"address","amount","comment","comment_to","subtractfeefromamount", "conf_target","estimate_mode"} },
//     { "wallet",             "sendfromaddress",          &sendfromaddress,          {"from_address","address","amount","comment","comment_to","subtractfeefromamount", "conf_target","estimate_mode"} },
//     { "wallet",             "setaccount",               &setaccount,               {"address","account"} },
//     { "wallet",             "settxfee",                 &settxfee,                 {"amount"} },
//     { "wallet",             "signmessage",              &signmessage,              {"address","message"} },
//     { "wallet",             "walletlock",               &walletlock,               {} },
//     { "wallet",             "walletpassphrasechange",   &walletpassphrasechange,   {"oldpassphrase","newpassphrase"} },
//     { "wallet",             "walletpassphrase",         &walletpassphrase,         {"passphrase","timeout"} },
//     { "wallet",             "removeprunedfunds",        &removeprunedfunds,        {"txid"} },
//     { "wallet",             "rescanblockchain",         &rescanblockchain,         {"start_height", "stop_height"} },

//     { "generating",         "generate",                 &generate,                 {"nblocks","maxtries"} },
// };
