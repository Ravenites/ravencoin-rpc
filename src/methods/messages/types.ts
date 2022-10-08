/** ViewAllMessagesResponse */
export type ViewAllMessagesResponse = {
  /** The name of the asset the message was sent on */
  'Asset Name': string;
  /** The IPFS hash of the message */
  Message: string;
  /** The time as a date in the format (YY-mm-dd Hour-minute-second) */
  Time: Date;
  /** The height of the block the message was included in */
  'Block Height': number;
  /** Status of the message (READ, UNREAD, ORPHAN, EXPIRED, SPAM, HIDDEN, ERROR) */
  Status: string;
  /** If the message had an expiration date assigned, it will be shown here in the format (YY-mm-dd Hour-minute-second) */
  'Expire Time'?: Date;
  /** If the message contains an expire date that is too large, the UTC number will be displayed */
  'Expire UTC Time'?: Date;
};

/** ViewAllMessageChannelsResponse */
export type ViewAllMessageChannelsResponse = {
  /** The asset channel name */
  'Asset Name': string;
};

/** SubscribeToChannel */
export type SubscribeToChannel = {
  channel_name: string;
};

/** UnsubscribeFromChannel */
export type UnsubscribeFromChannel = {
  channel_name: string;
};

/** SendMessage */
export type SendMessage = {
  channel: string;
  ipfs_hash: string;
  expire_time?: number;
};

/** ViewMyTaggedAddressesResponse */
export type ViewMyTaggedAddressesResponse = {
  /** The address that was tagged */
  Address: string;
  /** The asset name */
  'Tag Name': string;
  /** The UTC datetime of the assignment or removal of the tag in the format (YY-mm-dd HH:MM:SS). (Only the most recent tagging/untagging event will be returned for each address) */
  Assigned?: Date;
  /** The UTC datetime of the assignment or removal of the tag in the format (YY-mm-dd HH:MM:SS). (Only the most recent tagging/untagging event will be returned for each address) */
  Removed?: Date;
};

/** ViewMyRestrictedAddressesResponse */
export type ViewMyRestrictedAddressesResponse = {
  /** The address that was restricted */
  Address: string;
  /** The asset that the restriction applies to */
  'Asset Name': string;
  /** The UTC datetime of the restriction or derestriction in the format (YY-mm-dd HH:MM:SS)). (Only the most recent restriction/derestriction event will be returned for each address) */
  Restricted?: Date;
  /** The UTC datetime of the restriction or derestriction in the format (YY-mm-dd HH:MM:SS)). (Only the most recent restriction/derestriction event will be returned for each address) */
  Derestricted?: Date;
};
