/** RequestSnapshot */
export type RequestSnapshot = {
  asset_name: string;
  block_height: number;
};

/** RequestSnapshotResponse */
export type RequestSnapshotResponse = {
  request_status: string;
};

/** GetSnapshotRequest */
export type GetSnapshotRequest = {
  asset_name: string;
  block_height: number;
};

/** GetSnapshotRequestResponse */
export type GetSnapshotRequestResponse = {
  asset_name: string;
  block_height: number;
};

/** ListSnapshotRequests */
export type ListSnapshotRequests = {
  asset_name?: string;
  block_height?: number;
};

/** ListSnapshotRequestsResponse */
export type ListSnapshotRequestsResponse = {
  asset_name: string;
  block_height: number;
};

/** CancelSnapshotRequest */
export type CancelSnapshotRequest = {
  asset_name: string;
  block_height: number;
};

/** CancelSnapshotRequestResponse */
export type CancelSnapshotRequestResponse = {
  request_status: string;
};

/** DistributeReward */
export type DistributeReward = {
  asset_name: string;
  snapshot_height: number;
  distribution_asset_name: string;
  gross_distribution_amount: number;
  exception_addresses: string;
  change_address: string;
};

/** DistributeRewardResponse */
export type DistributeRewardResponse = {
  error_txn_gen_failed?: string;
  error_nsf?: string;
  error_rejects?: string;
  error_db_update?: string;
  batch_results?: BatchResults[];
};

/** BatchResults */
type BatchResults = {
  transaction_id: string;
  error_txn_rejected: string;
  total_amount: number;
  fee: number;
  expected_count: number;
  actual_count: number;
};

/** GetDistributeStatus */
export type GetDistributeStatus = {
  asset_name: string;
  snapshot_height: number;
  distribution_asset_name: string;
  gross_distribution_amount: number;
  exception_addresses?: string;
};

/** GetDistributeStatusResponse */
export type GetDistributeStatusResponse = {
  'Asset Name': string;
  Height: string;
  'Distribution Name': string;
  'Distribution Amount': number;
  Status: number;
};
