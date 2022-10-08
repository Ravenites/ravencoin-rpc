// https://github.com/RavenProject/Ravencoin/blob/master/src/rpc/rewards.cpp

import { IClient } from '@/types';
import {
  CancelSnapshotRequest,
  CancelSnapshotRequestResponse,
  DistributeReward,
  DistributeRewardResponse,
  GetDistributeStatus,
  GetDistributeStatusResponse,
  GetSnapshotRequest,
  GetSnapshotRequestResponse,
  ListSnapshotRequests,
  ListSnapshotRequestsResponse,
  RequestSnapshot,
  RequestSnapshotResponse,
} from './types';

/**
 * @class Rewards
 * @subcategory Client
 */
export class Rewards {
  private _client: IClient;

  constructor(client: IClient) {
    this._client = client;
  }

  /**
   * Schedules a snapshot of the specified asset at the specified block height.
   * @param params
   * @param {string} params.asset_name   The asset name for which the snapshot will be taken
   * @param {number} params.block_height The block height at which the snapshot will be take
   * @returns {Promise} Object - { request_status: 'Added' }
   */
  requestSnapshot(
    params: RequestSnapshot
  ): Promise<RequestSnapshotResponse> {
    return this._client.request('requestsnapshot', params);
  }

  /**
   * Retrieves the specified snapshot request details.
   * @param params
   * @param {string} params.asset_name   The asset name for which the snapshot will be taken
   * @param {number} params.block_height The block height at which the snapshot will be take
   * @returns {Promise} Returns the asset_name and block_height
   */
  getSnapshotRequest(
    params: GetSnapshotRequest
  ): Promise<GetSnapshotRequestResponse> {
    return this._client.request('getsnapshotrequest', params);
  }

  /**
   * List snapshot request details.
   * @param params
   * @param {string=} params.asset_name   List only requests for a specific asset (default is \"\" for ALL)
   * @param {number=} params.block_height List only requests for a particular block height (default is 0 for ALL)
   * @returns {Promise} Array of objects containing asset_name and block_height
   */
  listSnapshotRequests(
    params: ListSnapshotRequests
  ): Promise<ListSnapshotRequestsResponse[]> {
    return this._client.request('listsnapshotrequests', params);
  }

  /**
   * Cancels the specified snapshot request.
   * @param params
   * @param {string} params.asset_name   The asset name for which the snapshot will be taken
   * @param {number} params.block_height The block height at which the snapshot will be take
   * @returns {Promise} Returns the request status
   */
  cancelSnapshotRequest(
    params: CancelSnapshotRequest
  ): Promise<CancelSnapshotRequestResponse> {
    return this._client.request('cancelsnapshotrequest', params);
  }

  /**
   * Splits the specified amount of the distribution asset to all owners of asset_name that are not in the optional exclusion_addresses
   * @param params
   * @param {string}  params.asset_name                The reward will be distributed all owners of this asset
   * @param {number}  params.snapshot_height           The block height of the ownership snapshot
   * @param {string}  params.distribution_asset_name   The name of the asset that will be distributed, or RVN
   * @param {number}  params.gross_distribution_amount The amount of the distribution asset that will be split amongst all owners
   * @param {string=} params.exception_addresses       Ownership addresses that should be excluded
   * @param {string=} params.change_address            If the rewards can't be fully distributed. The change will be sent to this address
   * @returns {Promise}
   */
  distributeReward(
    params: DistributeReward
  ): Promise<DistributeRewardResponse> {
    return this._client.request('distributereward', params);
  }

  /**
   * Give information about the status of the distribution
   * @param params
   * @param {string}  parasm.asset_name                The reward will be distributed all owners of this asset\n"
   * @param {number}  parasm.snapshot_height           The block height of the ownership snapshot\n"
   * @param {string}  parasm.distribution_asset_name   The name of the asset that will be distributed, or RVN\n"
   * @param {number}  parasm.gross_distribution_amount The amount of the distribution asset that will be split amongst all owners\n"
   * @param {string=} parasm.exception_addresses       Ownership addresses that should be excluded\n"
   * @returns {Promise}
   */
  getDistributeStatus(
    params: GetDistributeStatus
  ): Promise<string | GetDistributeStatusResponse> {
    return this._client.request('getdistributestatus', params);
  }
}
