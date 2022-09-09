import {
  DecodeBlock,
  DecodeBlockResponse,
  GetBlock,
  GetBlockchainInfoResponse,
  GetBlockDeltas,
  GetBlockDeltasResponse,
  GetBlockHash,
  GetBlockHashes,
  GetBlockHashesResponse,
  GetBlockHashesResponseLogicalTimes,
  GetBlockHeader,
  GetBlockHeaderResponseFalse,
  GetBlockHeaderResponseTrue,
  GetBlockVerbosity0,
  GetBlockVerbosity1,
  GetBlockVerbosity2,
  GetChainTipsResponse,
  GetChainTxStats,
  GetChainTxStatsResponse,
  GetMempoolAncestors,
  GetMempoolAncestorsResponseVerboseFalse,
  GetMempoolAncestorsResponseVerboseTrue,
  GetMempoolDescendants,
  GetMempoolDescendantsResponseVerboseFalse,
  GetMempoolDescendantsResponseVerboseTrue,
  GetMempoolEntry,
  GetMempoolInfoResponse,
  GetRawMempool,
  GetRawMempoolResponseVerboseFalse,
  GetRawMempoolResponseVerboseTrue,
  GetTxOut,
  GetTxOutResponse,
  InvalidateBlock,
  PreciousBlock,
  PruneBlockchain,
  ReconsiderBlock,
  VerifyChain,
  WaitForBlock,
  WaitForBlockHeight,
  WaitForBlockHeightResponse,
  WaitForBlockResponse,
  WaitForNewBlock,
  WaitForNewBlockResponse,
} from './types';

/**
 * @class Blockchain
 * @subcategory Client
 */
export class Blockchain {
  private _client: any;

  constructor(client: any) {
    this._client = client;
  }

  /**
   * Removes all transaction from the mempool
   * @returns {Promise} Mempool cleared
   */
  async clearMempool(): Promise<string> {
    return await this._client.request('clearmempool');
  }

  /**
   * Returns an object containing various state info regarding blockchain processing.
   * @param params
   * @returns {Promise}
   */
  async getBlockchainInfo(): Promise<GetBlockchainInfoResponse> {
    return await this._client.request('getblockchaininfo');
  }

  /**
   * Compute statistics about the total number and rate of transactions in the chain.
   * @param params
   * @param {number=} params.nblocks Size of the window in number of blocks (default: one month).
   * @param {string=} params.blockhash The hash of the block that ends the window.
   * @returns {Promise}
   */
  async getChainTxStats(
    params: GetChainTxStats
  ): Promise<GetChainTxStatsResponse> {
    return await this._client.request('getchaintxstats', params);
  }

  /**
   * Returns the hash of the best (tip) block in the longest blockchain.
   * @returns {Promise} The block hash hex encoded
   */
  async getBestBlockHash(): Promise<string> {
    return await this._client.request('getbestblockhash');
  }

  /**
   * Returns the number of blocks in the longest blockchain.
   * @returns {Promise} The current block count
   */
  async getBlockCount(): Promise<number> {
    return await this._client.request('getblockcount');
  }

  /**
   * If verbosity is 0, returns a string that is serialized, hex-encoded data for block 'hash'.
   *
   * If verbosity is 1, returns an Object with information about block <hash>.
   *
   * If verbosity is 2, returns an Object with information about block <hash> and information about each transaction.
   * @param params
   * @param {string} params.blockhash The block hash
   * @param {number=} [params.verbosity=1] Default = 1. 0 for hex encoded data, 1 for a json object, and 2 for json object with transaction data
   * @returns {Promise}
   */
  async getBlock(
    params: GetBlock
  ): Promise<GetBlockVerbosity0 | GetBlockVerbosity1 | GetBlockVerbosity2> {
    return await this._client.request('getblock', params);
  }

  /**
   * Decode block by the blockhex
   * @param params
   * @param {string} params.blockhex The block hex
   * @returns {Promise}
   */
  async decodeBlock(params: DecodeBlock): Promise<DecodeBlockResponse> {
    return await this._client.request('decodeblock', params);
  }

  /**
   * Get Block Deltas
   * @param params
   * @param {string} params.blockhash The block hash
   * @returns {Promise}
   */
  async getBlockDeltas(
    params: GetBlockDeltas
  ): Promise<GetBlockDeltasResponse> {
    return await this._client.request('getblockdeltas', params);
  }

  /**
   * getBlockHashes params.options
   * @typedef {Object} OptionsRequest
   * @property {boolean} noOrphans - Will only include blocks on the main chain
   * @property {boolean} logicalTimes - Will include logical timestamps with hashes
   */

  /**
   * Returns array of hashes of blocks within the timestamp range provided.
   * @param params
   * @param {number} params.high The newer block timestamp
   * @param {number} params.low The older block timestamp
   * @param {OptionsRequest} params.options
   * @returns {Promise}
   */
  async getBlockHashes(
    params: GetBlockHashes
  ): Promise<GetBlockHashesResponse | GetBlockHashesResponseLogicalTimes> {
    return await this._client.request('getblockhashes', params);
  }

  /**
   * Returns hash of block in best-block-chain at height provided.
   * @param params
   * @param {number} params.height The height index
   * @returns {Promise} The block hash
   */
  async getBlockHash(params: GetBlockHash): Promise<string> {
    return await this._client.request('getblockhash', params);
  }

  /**
   * If verbose is false, returns a string that is serialized, hex-encoded data for blockheader 'hash'.
   *
   * If verbose is true, returns an Object with information about blockheader <hash>.
   * @param params
   * @param {string} params.hash The block hash
   * @param {boolean=} [params.verbose=true] Default = true. True for a json object, false for the hex encoded data
   * @returns {Promise}
   */
  async getBlockHeader(
    params: GetBlockHeader
  ): Promise<GetBlockHeaderResponseFalse | GetBlockHeaderResponseTrue> {
    return await this._client.request('getblockheader', params);
  }

  /**
   * Return information about all known tips in the block tree, including the main chain as well as orphaned branches.   * @param params
   * @returns {Promise}
   */
  async getChainTips(): Promise<GetChainTipsResponse[]> {
    return await this._client.request('getchaintips');
  }

  /**
   * Returns the proof-of-work difficulty as a multiple of the minimum difficulty.
   * @returns {Promise} The proof-of-work difficulty as a multiple of the minimum difficulty.
   */
  async getDifficulty(): Promise<number> {
    return await this._client.request('getdifficulty');
  }

  /**
   * If txid is in the mempool, returns all in-mempool ancestors.
   * @param params
   * @param {string} params.txid The transaction id (must be in mempool)
   * @param {boolean=} [params.verbose=false] Default = false. True for a json object, false for array of transaction ids
   * @returns {Promise} Array of transactions or ids of an in-mempool ancestor transactions
   */
  async getMempoolAncestors(
    params: GetMempoolAncestors
  ): Promise<
    | GetMempoolAncestorsResponseVerboseFalse[]
    | GetMempoolAncestorsResponseVerboseTrue
  > {
    return await this._client.request('getmempoolancestors', params);
  }

  /**
   * If txid is in the mempool, returns all in-mempool descendants.
   * @param params
   * @param {string} params.txid The transaction id (must be in mempool)
   * @param {boolean=} [params.verbose=false] Default = false. True for a json object, false for array of transaction ids
   * @returns {Promise}
   */
  async getMempoolDescendants(
    params: GetMempoolDescendants
  ): Promise<
    | GetMempoolDescendantsResponseVerboseFalse[]
    | GetMempoolDescendantsResponseVerboseTrue
  > {
    return await this._client.request('getmempooldescendants', params);
  }

  /**
   * Returns mempool data for given transaction
   * @param params
   * @param {string} params.txid The transaction id (must be in mempool)
   * @returns {Promise}
   */
  async getMempoolEntry(params: GetMempoolEntry): Promise<any> {
    return await this._client.request('getmempoolentry', params);
  }

  /**
   * Returns details on the active state of the TX memory pool.
   * @returns {Promise}
   */
  async getMempoolInfo(): Promise<GetMempoolInfoResponse> {
    return await this._client.request('getmempoolinfo');
  }

  /**
   * Returns all transaction ids in memory pool as a json array of string transaction ids.
   *
   * Hint: use getmempoolentry to fetch a specific transaction from the mempool.
   * @param params
   * @param {boolean=} params.verbose Default = false. True for a json object, false for array of transaction ids
   * @returns {Promise}
   */
  async getRawMempool(
    params: GetRawMempool
  ): Promise<
    GetRawMempoolResponseVerboseFalse | GetRawMempoolResponseVerboseTrue
  > {
    return await this._client.request('getrawmempool', params);
  }

  /**
   * Returns details about an unspent transaction output.
   * @param params
   * @param {string} params.txid The transaction id
   * @param {number} params.n vout number
   * @param {boolean=} params.include_mempool Whether to include the mempool. Default: true. Note that an unspent output that is spent in the mempool won't appear.
   * @returns {Promise}
   */
  async GetTxOut(params: GetTxOut): Promise<GetTxOutResponse> {
    return await this._client.request('gettxout', params);
  }

  /**
   * Returns statistics about the unspent transaction output set.
   *
   * Note this call may take some time.
   * @returns {Promise}
   */
  async getTxOutSetInfo(): Promise<GetTxOutResponse> {
    return await this._client.request('gettxoutsetinfo');
  }

  /**
   * Prune the blockchain
   * @param params
   * @param {number} params.height The block height to prune up to. May be set to a discrete height, or a unix timestamp to prune blocks whose block time is at least 2 hours older than the provided timestamp.
   * @returns {Promise} Height of the last block pruned.
   */
  async pruneBlockchain(params: PruneBlockchain): Promise<number> {
    return await this._client.request('pruneblockchain', params);
  }

  /**
   * Dumps the mempool to disk.
   * @returns {Promise}
   */
  async saveMempool(): Promise<null> {
    return await this._client.request('savemempool');
  }

  /**
   * Verifies blockchain database.
   * @param params
   * @param {number=} params.checklevel 0-4, default=" + strprintf("%d", nCheckLevel) + ") How thorough the block verification is.
   * @param {number=} params.nblocks Default = " + strprintf("%d", nCheckDepth) + ", 0=all) The number of blocks to check.
   * @returns {Promise} Verified or not
   */
  async verifyChain(params: VerifyChain): Promise<boolean> {
    return await this._client.request('verifychain', params);
  }

  /**
   * Treats a block as if it were received before others with the same work.
   *
   * A later preciousblock call can override the effect of an earlier one.
   *
   * The effects of preciousblock are not retained across restarts
   * @param params
   * @param {string} params.blockhash The hash of the block to mark as precious
   * @returns {Promise}
   */
  async preciousBlock(params: PreciousBlock): Promise<null> {
    return await this._client.request('preciousblock', params);
  }

  /**
   * Permanently marks a block as invalid, as if it violated a consensus rule.
   * @param params
   * @param {string} params.blockhash The hash of the block to mark as invalid
   * @returns {Promise}
   */
  async invalidateBlock(params: InvalidateBlock): Promise<null> {
    return await this._client.request('invalidateblock', params);
  }

  /**
   * Removes invalidity status of a block and its descendants, reconsider them for activation.
   *
   * This can be used to undo the effects of invalidateblock.
   * @param params
   * @param {string} params.blockhash The hash of the block to reconsider
   * @returns {Promise}
   */
  async reconsiderBlock(params: ReconsiderBlock): Promise<null> {
    return await this._client.request('reconsiderblock', params);
  }

  /**
   * Waits for a specific new block and returns useful info about it.
   *
   * Returns the current block on timeout or exit.
   * @param params
   * @param {number=} [params.timeout=0] Default = 0. Time in milliseconds to wait for a response. 0 indicates no timeout.
   * @returns {Promise}
   */
  async waitForNewBlock(
    params: WaitForNewBlock
  ): Promise<WaitForNewBlockResponse> {
    return await this._client.request('waitfornewblock', params);
  }

  /**
   * Waits for a specific new block and returns useful info about it.
   *
   * Returns the current block on timeout or exit.
   * @param params
   * @param {string} params.blockhash Block hash to wait for.
   * @param {number=} [params.timeout=0] Default = 0. Time in milliseconds to wait for a response. 0 indicates no timeout.
   * @returns {Promise}
   */
  async waitForBlock(params: WaitForBlock): Promise<WaitForBlockResponse> {
    return await this._client.request('waitforblock', params);
  }

  /**
   * Waits for (at least) block height and returns the height and hash of the current tip.
   *
   * Returns the current block on timeout or exit.
   * @param params
   * @param {number} params.height Block height to wait for (int)
   * @param {number=} [params.timeout=0] Default = 0. Time in milliseconds to wait for a response. 0 indicates no timeout.
   * @returns {Promise}
   */
  async waitForBlockHeight(
    params: WaitForBlockHeight
  ): Promise<WaitForBlockHeightResponse> {
    return await this._client.request('waitforblockheight', params);
  }
}
