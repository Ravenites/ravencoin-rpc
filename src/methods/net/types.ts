export type GetPeerInfoResponse = {
  id: number; // Peer index
  addr: string; // The IP address and port of the peer
  addrbind: string; // Bind address of the connection to the peer
  addrlocal: string; // Local address as reported by the peer
  services: string; // The services offered
  relaytxes: boolean; // Whether peer has asked us to relay transactions to it
  lastsend: number; // The time in seconds since epoch (Jan 1 1970 GMT) of the last send
  lastrecv: number; // The time in seconds since epoch (Jan 1 1970 GMT) of the last receive
  bytessent: number; // The total bytes sent
  bytesrecv: number; // The total bytes received
  conntime: number; // The connection time in seconds since epoch (Jan 1 1970 GMT)
  timeoffset: number; // The time offset in seconds
  pingtime: number; // Ping time (if available)
  minping: number; // Minimum observed ping time (if any at all)
  pingwait: number; // Ping wait (if non-zero)
  version: number; // The peer version, such as 7001
  subver: string; // The string version
  inbound: boolean; // Inbound (true) or Outbound (false)
  addnode: boolean; // Whether connection was due to addnode/-connect or if it was an automatic/inbound connection
  startingheight: number; // The starting height (block) of the peer
  banscore: number; // The ban score
  synced_headers: number; // The last header we have in common with this peer
  synced_blocks: number; // The last block we have in common with this peer
  inflight: number[]; // The heights of blocks we're currently asking from this peer
  whitelisted: boolean; // Whether the peer is whitelisted
  bytessent_per_msg: {
    addr: number; // The total bytes sent aggregated by message type
  };
  bytesrecv_per_msg: {
    addr: number; // The total bytes received aggregated by message type
  };
};

export type AddNode = {
  node: string;
  command: 'add' | 'remove' | 'onetry';
};

export type DisconnectNode = {
  address?: string;
  nodeid?: number;
};

export type GetAddedNodeInfo = {
  node?: string;
};

export type GetAddedNodeInfoResponse = {
  addednode: string; // The node IP address or name (as provided to addnode)
  connected: boolean; // If connected
  addresses?: GetAddedNodeInfoResponseAddress[]; // Only when connected = true
};

type GetAddedNodeInfoResponseAddress = {
  address: string; // The raven server IP and port we're connected to
  connected: string; // connection, inbound or outbound
};

export type GetNetTotalsresponse = {
  totalbytesrecv: number; // Total bytes received
  totalbytessent: number; // Total bytes sent
  timemillis: number; // Current UNIX time in milliseconds
  uploadtarget: GetNetTotalsresponseUploadTarget;
};

export type GetNetTotalsresponseUploadTarget = {
  timeframe: number; // Length of the measuring timeframe in seconds
  target: number; // Target in bytes
  target_reached: boolean; // True if target is reached
  serve_historical_blocks: boolean; // True if serving historical blocks
  bytes_left_in_cycle: number; // Bytes left in current time cycle
  time_left_in_cycle: number; // Seconds left in current time cycle
};

export type GetNetworkInfoResponse = {
  version: number; // The server version
  subversion: string; // Satoshi:x.x.the server subversion string
  protocolversion: number; // The protocol version
  localservices: string; // The services we offer to the network
  localrelay: boolean; // True if transaction relay is requested from peers
  timeoffset: number; // The time offset
  connections: number; // The number of connections
  networkactive: boolean; // Whether p2p networking is enabled
  networks: GetNetworkInfoResponseNetwork[]; // Information per network
  relayfee: number; // Minimum relay fee for transactions in " + CURRENCY_UNIT + "/kB
  incrementalfee: number; // Minimum fee increment for mempool limiting or BIP 125 replacement in " + CURRENCY_UNIT + "/kB
  localaddresses: GetNetworkInfoResponseLocalAddress[]; // List of local addresses
  warnings: string; // Any network and blockchain warnings
};

type GetNetworkInfoResponseNetwork = {
  name: string; // Network (ipv4, ipv6 or onion)
  limited: boolean; // Is the network limited using -onlynet?
  reachable: boolean; // Is the network reachable?
  proxy: string; // The proxy that is used for this network, or empty if none
  proxy_randomize_credentials: string; // Whether randomized credentials are used
};

type GetNetworkInfoResponseLocalAddress = {
  address: string; // Network address
  port: number; // Network port
  score: number; // Relative score
};

export type SetBan = {
  subnet: string;
  command: string;
  bantime?: number;
  absolute?: boolean;
};

export type ListBannedResponse = {
  address: string;
  banned_until: number;
  ban_created: number;
  ban_reason: string;
};

export type SetNetworkActive = {
  state: boolean;
};
