export type ViewAllMessagesResponse = {
  'Asset Name': string; // The name of the asset the message was sent on
  Message: string; // The IPFS hash of the message
  Time: Date; // The time as a date in the format (YY-mm-dd Hour-minute-second)
  'Block Height': number; // The height of the block the message was included in
  Status: string; // Status of the message (READ, UNREAD, ORPHAN, EXPIRED, SPAM, HIDDEN, ERROR)
  'Expire Time'?: Date; // optional) If the message had an expiration date assigned, it will be shown here in the format (YY-mm-dd Hour-minute-second)
  'Expire UTC Time'?: Date; // optional) If the message contains an expire date that is too large, the UTC number will be displayed
};

export type ViewAllMessageChannelsResponse = {
  'Asset Name': string; // The asset channel name
};

export type SubscribeToChannel = {
  channel_name: string;
};

export type UnsubscribeFromChannel = {
  channel_name: string;
};

export type SendMessage = {
  channel: string;
  ipfs_hash: string;
  expire_time?: number;
};

export type ViewMyTaggedAddressesResponse = {
  Address: string; // The address that was tagged
  'Tag Name': string; // The asset name
  Assigned?: Date; // The UTC datetime of the assignment or removal of the tag in the format (YY-mm-dd HH:MM:SS). (Only the most recent tagging/untagging event will be returned for each address)
  Removed?: Date; // The UTC datetime of the assignment or removal of the tag in the format (YY-mm-dd HH:MM:SS). (Only the most recent tagging/untagging event will be returned for each address)
};

export type ViewMyRestrictedAddressesResponse = {
  Address: string; // The address that was restricted
  'Asset Name': string; // The asset that the restriction applies to
  Restricted?: Date; // The UTC datetime of the restriction or derestriction in the format (YY-mm-dd HH:MM:SS)). (Only the most recent restriction/derestriction event will be returned for each address)
  Derestricted?: Date; // The UTC datetime of the restriction or derestriction in the format (YY-mm-dd HH:MM:SS)). (Only the most recent restriction/derestriction event will be returned for each address)
};
