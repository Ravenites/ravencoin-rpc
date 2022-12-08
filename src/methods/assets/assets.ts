import { IClient } from '@/types';
import {
  AddTagToAddress,
  CheckAddressRestriction,
  CheckAddressTag,
  CheckGlobalRestriction,
  FreezeAddress,
  FreezeRestrictedAsset,
  GetAssetData,
  GetAssetDataResponse,
  GetCacheInfoResponse,
  GetSnapshot,
  GetSnapshotResponse,
  GetVerifierString,
  Issue,
  IssueQualifierAsset,
  IssueRestrictedAsset,
  IssueUnique,
  IsValidVerifierString,
  ListAddressesByAsset,
  ListAddressesForTag,
  ListAddressRestrictions,
  ListAssetBalanceByAddress,
  ListAssets,
  ListAssetsResponse,
  ListMyAssets,
  ListTagsForAddress,
  PurgeSnapshot,
  PurgeSnapshotResponse,
  Reissue,
  ReissueRestrictedAsset,
  RemoveTagFromAddress,
  Transfer,
  TransferFromAddress,
  TransferFromAddresses,
  TransferQualifier,
  UnfreezeAddress,
  UnfreezeRestrictedAsset,
} from './types';

/**
 * @class Assets
 * @subcategory Methods
 */
export class Assets {
  private _client: IClient;

  constructor(client: IClient) {
    this._client = client;
  }

  /**
   * Issue an asset, subasset or unique asset.
   *
   * Asset name must not conflict with any existing asset.
   *
   * Unit as the number of decimals precision for the asset (0 for whole units (\"1\"), 8 for max precision (\"1.00000000\")
   *
   * Reissuable is true/false for whether additional units can be issued by the original issuer.
   *
   * If issuing a unique asset these values are required (and will be defaulted to): qty=1, units=0, reissuable=false.
   * @example
   * client.assets.issue({ asset_name: 'FE271D55A604409E8C48 });
   * @param params
   * @param {string} params.asset_name          A unique name.
   * @param {number=} [params.qty=1]             The number of units to be issued.
   * @param {string=} [params.to_address='']     Address asset will be sent to, if it is empty, address will be generated for you.
   * @param {string=} [params.change_address=''] Address the the rvn change will be sent to, if it is empty, change address will be generated for you.
   * @param {number=} [params.units=0]           Min = 0. Max = 8. The number of decimals precision for the asset (0 for whole units (\"1\"), 8 for max precision (\"1.00000000\").
   * @param {boolean=} [params.reissuable=true]  False for unique assets. Whether future reissuance is allowed.
   * @param {boolean=} [params.has_ipfs=false]   Whether ipfs hash is going to be added to the asset.
   * @param {string=} [params.ipfs_hash]         Required if has_ipfs is true. An ipfs hash or a txid hash once RIP5 is activate
   * @returns {Promise} txid
   */
  issue(params: Issue): Promise<string> {
    return this._client.request('issue', params);
  }

  /**
   * Issue unique asset(s).
   *
   * root_name must be an asset you own.
   *
   * An asset will be created for each element of asset_tags.
   *
   * If provided ipfs_hashes must be the same length as asset_tags.
   *
   * Five (5) RVN will be burned for each asset created.
   * @example
   * client.assets.issueUnique({ root_name: 'FE271D55A604409E8C48', asset_tags: ['ASSET_ONE', 'ASSET_TWO'] });
   * @param params
   * @param {string}  params.root_name           Name of the asset the unique asset(s) are being issued under
   * @param {array}   params.asset_tags          The unique tag for each asset which is to be issued
   * @param {array=}  params.ipfs_hashes         Ipfs hashes or txid hashes corresponding to each supplied tag (should be same size as \"asset_tags\")
   * @param {string=} [params.to_address='']     Address assets will be sent to, if it is empty, address will be generated for you
   * @param {string=} [params.change_address=''] Address the the rvn change will be sent to, if it is empty, change address will be generated for you
   * @returns {Promise} txid
   */
  issueUnique(params: IssueUnique): Promise<string> {
    return this._client.request('issueunique', params);
  }

  /**
   * Returns a list of all asset that are owned by this wallet
   * @example
   * client.assets.listMyAssets();
   * @param            params
   * @param {string=}  [params.asset='*']     Filters results -- must be an asset name or a partial asset name followed by '*' ('*' matches all trailing characters)
   * @param {boolean=} [params.verbose=false] When false results only contain balances -- when true results include outpoints
   * @param {number=}  params.count           Truncates results to include only the first _count_ assets found
   * @param {number=}  [params.start=0]       Results skip over the first _start_ assets found (if negative it skips back from the end)
   * @param {number=}  [params.confs=0]       Results are skipped if they don't have this number of confirmations
   * @returns {Promise<any>} TODO: Get return data
   */
  listMyAssets(params?: ListMyAssets): Promise<any> {
    params = params || {};
    const count = typeof params.count === 'number';
    const start = typeof params.start === 'number';
    const confs = typeof params.confs === 'number';
    if ((params.verbose || !!count || !!start || !!confs) && !params.asset) {
      params.asset = '*';
    }
    if ((!!count || !!start || !!confs) && !params.verbose) {
      params.verbose = false;
    }
    if ((!!start || !!confs) && !count) {
      params.count = 999999999;
    }
    if (!!confs && !start) {
      throw new Error(
        'Confs parameter is required when using the Start parameter'
      );
    }
    return this._client.request('listmyassets', params);
  }

  /**
   * Returns a list of all asset balances for an address. (requires assetindex to be enabled)
   * @example
   * client.assets.listAssetBalancesByAddress({ address: 'mwc5mCPAMWG2cVbvxG3dSqxKbxeLR1UMtu', onlytotal: true });
   * @param params
   * @param {string}   [params.address]         A raven address
   * @param {boolean=} [params.onlytotal=false] When false result is just a list of assets balances -- when true the result is just a single number representing the number of assets
   * @param {number=}  [params.count=50000]     Truncates results to include only the first _count_ assets found (MAX=50000)
   * @param {number=}  [params.start=0]         Results skip over the first _start_ assets found (if negative it skips back from the end)
   * @returns {Promise<any>} TODO: Get return data
   */
  listAssetBalancesByAddress(params: ListAssetBalanceByAddress): Promise<any> {
    if (!params.count) {
      params.count = 50000;
    }
    if (!params.start) {
      params.start = 0;
    }
    return this._client.request('listassetbalancesbyaddress', params);
  }

  /**
   * Returns assets metadata if that asset exists
   * @example
   * client.assets.getAssetData({ asset_name: 'FE271D55A604409E8C48' });
   * @param params
   * @param {string} params.asset_name The name of the asset
   * @returns {Promise<GetAssetDataResponse>} Asset data
   */
  getAssetData(params: GetAssetData): Promise<GetAssetDataResponse> {
    return this._client.request('getassetdata', params);
  }

  /**
   * Returns a list of all address that own the given asset (with balances).  (requires assetindex to be enabled)
   *
   * Or returns the total size of how many address own the given asset
   * @example
   * client.assets.listAddressesByAsset({ asset_name: 'FE271D55A604409E8C48' });
   * @param params
   * @param {string}  params.asset_name        Name of asset
   * @param {string=} [params.onlytotal=false] When false result is just a list of addresses with balances -- when true the result is just a single number representing the number of addresses
   * @param {string=} [params.count=50000]     Truncates results to include only the first _count_ assets found (MAX=50000)
   * @param {string=} [params.start=0]         Results skip over the first _start_ assets found (if negative it skips back from the end)
   * @returns {Promise<any>} TODO: Get return type
   */
  listAddressesByAsset(params: ListAddressesByAsset): Promise<any> {
    if (!params.count) {
      params.count = 50000;
    }
    if (!params.start) {
      params.start = 0;
    }
    return this._client.request('listaddressesbyasset', params);
  }

  /**
   * Transfer a quantity of an owned asset in a specific address to a given address
   * @example
   * client.assets.transferFromAddress({ asset_name: 'FE271D55A604409E8C48', from_address: 'n1VH67GpxMxgsEAPWNhGKcnZVdNSZpMXHZ', qty: 1, to_address: 'mwc5mCPAMWG2cVbvxG3dSqxKbxeLR1UMtu' });
   * @param params
   * @param {string}  params.asset_name                Name of asset
   * @param {string}  params.from_address              Address that the asset will be transferred from
   * @param {number}  params.qty                       Number of assets you want to send to the address
   * @param {string}  params.to_address                Address to send the asset to
   * @param {string=} params.message                   Once RIP5 is voted in ipfs hash or txid hash to send along with the transfer
   * @param {number=} params.expire_time               UTC timestamp of when the message expires
   * @param {string=} [params.rvn_change_address='']   The transaction RVN change will be sent to this address
   * @param {string=} [params.asset_change_address=''] The transaction Asset change will be sent to this address
   * @returns {Promise<string | string[]>} txid
   */
  transferFromAddress(params: TransferFromAddress): Promise<string | string[]> {
    return this._client.request('transferfromaddress', params);
  }

  /**
   * Transfer a quantity of an owned asset in specific address(es) to a given address
   * @example
   * client.assets.transferFromAddresses({ asset_name: 'FE271D55A604409E8C48', from_addresses: ['mwc5mCPAMWG2cVbvxG3dSqxKbxeLR1UMtu'], qty: 1, to_address: 'n1VH67GpxMxgsEAPWNhGKcnZVdNSZpMXHZ' });
   * @param params
   * @param {string}  params.asset_name                Name of asset
   * @param {Array}   params.from_addresses            List of from addresses to send from
   * @param {number}  params.qty                       Number of assets you want to send to the address
   * @param {string}  params.to_address                Address to send the asset to
   * @param {string=} params.message                   Once RIP5 is voted in ipfs hash or txid hash to send along with the transfer
   * @param {number=} params.expire_time               UTC timestamp of when the message expires
   * @param {string=} [params.rvn_change_address='']   The transactions RVN change will be sent to this address
   * @param {string=} [params.asset_change_address=''] The transactions Asset change will be sent to this address
   * @returns {Promise<string | string[]>} txid or array of txid
   */
  transferFromAddresses(
    params: TransferFromAddresses
  ): Promise<string | string[]> {
    return this._client.request('transferfromaddresses', params);
  }

  /**
   * Transfers a quantity of an owned asset to a given address
   * @example
   * client.assets.transfer({ asset_name: 'FE271D55A604409E8C48', qty: 1, to_address: 'n1VH67GpxMxgsEAPWNhGKcnZVdNSZpMXHZ' });
   * @param params
   * @param {string}  params.asset_name                Name of asset
   * @param {number}  params.qty                       Number of assets you want to send to the address
   * @param {string}  params.to_address                Address to send the asset to
   * @param {string=} params.message                   Once RIP5 is voted in ipfs hash or txid hash to send along with the transfer
   * @param {number=} params.expire_time               UTC timestamp of when the message expires
   * @param {string=} [params.change_address='']       The transactions RVN change will be sent to this address
   * @param {string=} [params.asset_change_address=''] The transactions Asset change will be sent to this address
   * @returns {Promise<string | string[]>} txid or array of txid
   */
  transfer(params: Transfer): Promise<string | string[]> {
    return this._client.request('transfer', params);
  }

  /**
   * Reissues a quantity of an asset to an owned address if you own the Owner Token.
   *
   * Can change the reissuable flag during reissuance.
   *
   * Can change the ipfs hash during reissuance.
   * @example
   * client.assets.reissue({ asset_name: 'FE271D55A604409E8C48', qty: 1, to_address: 'n1VH67GpxMxgsEAPWNhGKcnZVdNSZpMXHZ' });
   * @param params
   * @param {string}   params.asset_name        Name of asset that is being reissued
   * @param {number}   params.qty               Number of assets to reissue
   * @param {string}   params.to_address        Address to send the asset to
   * @param {string=}  params.change_address    Address that the change of the transaction will be sent to
   * @param {boolean=} [params.reissuable=true] Whether future reissuance is allowed
   * @param {number=}  [params.new_units=1]     The new units that will be associated with the asset
   * @param {string=}  [params.new_ipfs='']     Whether to update the current ipfs hash or txid once RIP5 is active
   * @returns {Promise<string>} txid
   */
  reissue(params: Reissue): Promise<string> {
    return this._client.request('reissue', params);
  }

  /**
   * Returns a list of all assets.
   * This could be a slow/expensive operation as it reads from the database.
   * @param params
   * @param {string=} [params.asset='*']     Filters results -- must be an asset name or a partial asset name followed by '*' ('*' matches all trailing characters)
   * @param {string=} [params.verbose=false] When false result is just a list of asset names -- when true results are asset name mapped to metadata
   * @param {string=} params.count           Truncates results to include only the first _count_ assets found
   * @param {string=} [params.start=0]       Results skip over the first _start_ assets found (if negative it skips back from the end)
   * @returns {Promise<string[] | ListAssetsResponse[]>} List of assets
   */
  listAssets(params?: ListAssets): Promise<string[] | ListAssetsResponse[]> {
    params = params || {};
    if ((params.verbose || params.count || params.start) && !params.asset) {
      params.asset = '*';
    }
    if ((params.count || params.start) && !params.verbose) {
      params.verbose = false;
    }
    if (params.start && !params.count) {
      throw new Error(
        'Count parameter is required when using the Start parameter'
      );
    }
    return this._client.request('listassets', params);
  }
  /**
   * Returns an array of a single cache object
   * @returns {Promise<GetCacheInfoResponse[]>}
   */
  getCacheInfo(): Promise<GetCacheInfoResponse[]> {
    return this._client.request('getcacheinfo');
  }

  /**
   * Transfer a qualifier asset owned by this wallet to the given address
   * @example
   * client.assets.transferQualifier({ qualifier_name: '#FE271D55A604409E8C48', qty: 1, to_address: 'mwc5mCPAMWG2cVbvxG3dSqxKbxeLR1UMtu' });
   * @param params
   * @param {string}  params.qualifier_name      Name of qualifier asset
   * @param {number}  params.qty                 Number of assets you want to send to the address
   * @param {string}  params.to_address          Address to send the asset to
   * @param {string=} [params.change_address=''] The transaction change will be sent to this address
   * @param {string=} params.message             Once RIP5 is voted in ipfs hash or txid hash to send along with the transfer
   * @param {number=} params.expire_time         UTC timestamp of when the message expires
   * @returns {Promise<string | string[]>} txid or array of txid
   */
  transferQualifier(params: TransferQualifier): Promise<string | string[]> {
    return this._client.request('transferqualifier', params);
  }

  /**
   * Issue a restricted asset.
   *
   * Restricted asset names must not conflict with any existing restricted asset.
   *
   * Restricted assets have units set to 0.
   *
   * Reissuable is true/false for whether additional asset quantity can be created and if the verifier string can be changed.
   * @param params
   * @param {string}  params.asset_name          unique name, starts with '$', if '$' is not there it will be added automatically
   * @param {number}  params.qty                 The quantity of the asset to be issued
   * @param {string}  params.verifier            Tthe verifier string that will be evaluated when restricted asset transfers are made
   * @param {string}  params.to_address          Address asset will be sent to, this address must meet the verifier string requirements
   * @param {string}  [params.change_address=''] Address that the rvn change will be sent to, if it is empty, change address will be generated for you
   * @param {number}  [params.units=0]           (min=0, max=8) The number of decimals precision for the asset (0 for whole units (\"1\"), 8 for max precision (\"1.00000000\")
   * @param {boolean} [params.reissuable=true]   (false for unique assets)) whether future reissuance is allowed
   * @param {boolean} [params.has_ipfs=false]    Whether an ipfs hash or txid hash is going to be added to the asset
   * @param {string}  params.ipfs_hash           Required if has_ipfs is true. An ipfs hash or a txid hash once RIP5 is activated
   * @returns {Promise<string>} txid
   */
  issueRestrictedAsset(params: IssueRestrictedAsset): Promise<string> {
    return this._client.request('issuerestrictedasset', params);
  }

  /**
   * Issue an qualifier or sub qualifier asset.
   *
   * If the '#' character isn't added, it will be added automatically.
   *
   * Amount is a number between 1 and 10.
   *
   * Asset name must not conflict with any existing asset..
   *
   * Unit is always set to Zero (0) for qualifier assets.
   *
   * Reissuable is always set to false for qualifier assets.
   * @example
   * client.assets.issueQualifierAsset({ asset_name: 'FE271D55A604409E8C48', qty: 1, to_address: 'n1VH67GpxMxgsEAPWNhGKcnZVdNSZpMXHZ' });
   * @param params
   * @param {string}  params.asset_name          A unique name
   * @param {string=} [params.qty=1]             The number of units to be issued
   * @param {string=} [params.to_address='']     Address asset will be sent to, if it is empty, address will be generated for you
   * @param {string=} [params.change_address=''] Address the the rvn change will be sent to, if it is empty, change address will be generated for you
   * @param {string=} [params.has_ipfs=false]    Whether ipfs hash is going to be added to the asset
   * @param {string=} params.ipfs_hash           Required if has_ipfs is true. An ipfs hash or a txid hash once RIP5 is activated
   * @returns {Promise<string>} txid
   */
  issueQualifierAsset(params: IssueQualifierAsset): Promise<string> {
    return this._client.request('issuequalifierasset', params);
  }

  /**
   * Reissue an already created restricted asset
   *
   * Reissuable is true/false for whether additional asset quantity can be created and if the verifier string can be changed.
   * @param params
   * @param {string}  params.asset_name              A unique name, starts with '$'
   * @param {number}  params.qty                     The additional quantity of the asset to be issued
   * @param {string}  params.to_address              Address asset will be sent to, this address must meet the verifier string requirements
   * @param {boolean} [params.change_verifier=false] If the verifier string will get changed
   * @param {string}  [params.new_verifier='']       The new verifier string that will be evaluated when restricted asset transfers are made
   * @param {string}  [params.change_address='']     Address that the rvn change will be sent to, if it is empty, change address will be generated for you
   * @param {number}  [params.new_units=-1]          The new units that will be associated with the asset
   * @param {boolean} [params.reissuable=true]       False for unique assets. Whether future reissuance is allowed
   * @param {string}  [params.new_ipfs='']           Whether to update the current ipfs hash or txid once RIP5 is active
   * @returns {Promise<string>} txid
   */
  reissueRestrictedAsset(params: ReissueRestrictedAsset): Promise<string> {
    return this._client.request('reissuerestrictedasset', params);
  }

  /**
   * Assign a tag to a address
   * @param params
   * @param {string}  param.tag_name       The name of the tag you are assigning to the address, if it doesn'thave '#' at the front it will be added
   * @param {string}  param.to_address     The address that will be assigned the tag
   * @param {string=} param.change_address The change address for the qualifier token to be sent to
   * @param {string=} param.asset_data     The asset data (ipfs or a hash) to be applied to the transfer of the qualifier token
   * @returns {Promise<string>} txid
   */
  addTagToAddress(params: AddTagToAddress): Promise<string> {
    return this._client.request('addtagtoaddress', params);
  }

  /**
   * Remove a tag from a address
   * @param params
   * @param {string}  param.tag_name       The name of the tag you are removing from the address
   * @param {string}  param.to_address     The address that the tag will be removed from
   * @param {string=} param.change_address The change address for the qualifier token to be sent to
   * @param {string=} param.asset_data     The asset data (ipfs or a hash) to be applied to the transfer of the qualifier token
   * @returns {Promise<string>} txid
   */
  removeTagFromAddress(params: RemoveTagFromAddress): Promise<string> {
    return this._client.request('removetagfromaddress', params);
  }

  /**
   * Freeze an address from transferring a restricted asset
   * @param params
   * @param {string}  params.asset_name     The name of the restricted asset you want to freeze
   * @param {string}  params.address        The address that will be frozen
   * @param {string=} params.change_address The change address for the owner token of the restricted asset
   * @param {string=} params.asset_data     The asset data (ipfs or a hash) to be applied to the transfer of the owner token
   * @returns {Promise<string>} txid
   */
  freezeAddress(params: FreezeAddress): Promise<string> {
    return this._client.request('freezeaddress', params);
  }

  /**
   * Unfreeze an address from transferring a restricted asset
   * @param params
   * @param {string}  params.asset_name     The name of the restricted asset you want to unfreeze
   * @param {string}  params.address        The address that will be unfrozen
   * @param {string=} params.change_address The change address for the owner token of the restricted asset
   * @param {string=} params.asset_data     The asset data (ipfs or a hash) to be applied to the transfer of the owner token
   * @returns {Promise<string>} txid
   */
  unfreezeAddress(params: UnfreezeAddress): Promise<string> {
    return this._client.request('unfreezeaddress', params);
  }

  /**
   * Freeze all trading for a specific restricted asset
   * @param params
   * @param {string}  params.asset_name     The name of the restricted asset you want to unfreeze
   * @param {string=} params.change_address The change address for the owner token of the restricted asset
   * @param {string=} params.asset_data     The asset data (ipfs or a hash) to be applied to the transfer of the owner token
   * @returns {Promise<string>} txid
   */
  freezeRestrictedAsset(params: FreezeRestrictedAsset): Promise<string> {
    return this._client.request('freezerestrictedasset', params);
  }

  /**
   * Unfreeze all trading for a specific restricted asset
   * @param params
   * @param {string}  params.asset_name     The name of the restricted asset you want to unfreeze
   * @param {string=} params.change_address The change address for the owner token of the restricted asset
   * @param {string=} params.asset_data     The asset data (ipfs or a hash) to be applied to the transfer of the owner token
   * @returns {Promise<string>} txid
   */
  unfreezeRestrictedAsset(params: UnfreezeRestrictedAsset): Promise<string> {
    return this._client.request('unfreezerestrictedasset', params);
  }

  /**
   * List all addresses that have been assigned a given tag
   * @example
   * client.assets.listAddressesForTag({ tag_name: '#ASSET_ONE' });
   * @param params
   * @param {string} params.tag_name The tag asset name to search for
   * @returns {Promise<any[]>} TODO: Get Address type
   */
  listAddressesForTag(params: ListAddressesForTag): Promise<any[]> {
    return this._client.request('listaddressesfortag', params);
  }

  /**
   * List all tags assigned to an address
   * @example
   * client.assets.listTagsForAddress({ address: 'mwc5mCPAMWG2cVbvxG3dSqxKbxeLR1UMtu' });
   * @param params
   * @param {string} params.address The address to list tags for
   * @returns {Promise<string[]>} Array of tag names
   */
  listTagsForAddress(params: ListTagsForAddress): Promise<string[]> {
    return this._client.request('listtagsforaddress', params);
  }

  /**
   * List all assets that have frozen this address
   * client.assets.listAddressRestrictions({ address: 'mwc5mCPAMWG2cVbvxG3dSqxKbxeLR1UMtu' })
   * @param params
   * @param {string} params.address The address to list restrictions for
   * @returns {Promise<string[]>} Array of asset names
   */
  listAddressRestrictions(params: ListAddressRestrictions): Promise<string[]> {
    return this._client.request('listaddressrestrictions', params);
  }

  /**
   * List all global restricted assets
   * @example
   * client.assets.listGlobalRestrictions();
   * @returns {Promise<string[]>} Array of asset names;
   */
  listGlobalRestrictions(): Promise<string[]> {
    return this._client.request('listglobalrestrictions', {});
  }

  /**
   * Retrieve the verifier string that belongs to the given restricted asset
   * @param params
   * @param {string} param.restricted_name The asset_name
   * @returns {Promise<string>} The verifier for the asset
   */
  getVerifierString(params: GetVerifierString): Promise<string> {
    return this._client.request('getverifierstring', params);
  }

  /**
   * Checks to see if an address has the given tag
   * @example
   * client.assets.checkAddressTag({ address: 'n1VH67GpxMxgsEAPWNhGKcnZVdNSZpMXHZ', tag_name: 'ASSET_ONE' });
   * @param params
   * @param {string} params.address  The RVN address to search
   * @param {string} params.tag_name The tag to search
   * @returns {Promise<boolean>} boolean - If the address has the tag
   */
  checkAddressTag(params: CheckAddressTag): Promise<boolean> {
    return this._client.request('checkaddresstag', params);
  }

  /**
   * Checks to see if an address has been frozen by the given restricted asset
   * @example
   * client.assets.checkAddressRestriction({ address: 'n1VH67GpxMxgsEAPWNhGKcnZVdNSZpMXHZ', restricted_name: 'FE271D55A604409E8C50' });
   * @param params
   * @param {string} params.address         The RVN address to search
   * @param {string} params.restricted_name The restricted asset to search
   * @returns {Promise<boolean>} boolean - If the address is frozen
   */
  checkAddressRestriction(params: CheckAddressRestriction): Promise<boolean> {
    return this._client.request('checkaddressrestriction', params);
  }

  /**
   * Checks to see if a restricted asset is globally frozen
   * @example
   * client.assets.checkGlobalRestriction({ restricted_name: 'FE271D55A604409E8C50' });
   * @param params
   * @param {string} params.restricted_name The restricted asset to search
   * @returns {Promise<boolean>} boolean - If the restricted asset is frozen globally
   */
  checkGlobalRestriction(params: CheckGlobalRestriction): Promise<boolean> {
    return this._client.request('checkglobalrestriction', params);
  }

  /**
   * Checks to see if the given verifier string is valid
   * @param params
   * @param {string} params.verifier_string The verifier string to check
   * @returns {Promise<string>} If the verifier string is valid, and the reason
   */
  isValidVerifierString(params: IsValidVerifierString): Promise<string> {
    return this._client.request('isvalidverifierstring', params);
  }

  /**
   * Returns details for the asset snapshot, at the specified height
   * @param params
   * @param {string} params.asset_name The name of the asset
   * @param {number} params.block_height The block height of the snapshot
   * @returns {Promise<GetSnapshotResponse>} name, height, owners: [{ address, amount_owned }]
   */
  getSnapshot(params: GetSnapshot): Promise<GetSnapshotResponse> {
    return this._client.request('getsnapshot', params);
  }

  /**
   * Removes details for the asset snapshot, at the specified height
   * @param params
   * @param {string} params.asset_name   The name of the asset
   * @param {number} params.block_height The block height of the snapshot
   * @returns {Promise<PurgeSnapshotResponse>} name, height
   */
  purgeSnapshot(params: PurgeSnapshot): Promise<PurgeSnapshotResponse> {
    return this._client.request('purgesnapshot', params);
  }
}
