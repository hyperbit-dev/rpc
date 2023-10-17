export type GetPeerInfoResponse = {
  /** Peer index */
  id: number;
  /** The IP address and port of the peer */
  addr: string;
  /** Bind address of the connection to the peer */
  addrbind: string;
  /** Local address as reported by the peer */
  addrlocal: string;
  /** The services offered */
  services: string;
  /** Whether peer has asked us to relay transactions to it */
  relaytxes: boolean;
  /** The time in seconds since epoch (Jan 1 1970 GMT) of the last send */
  lastsend: number;
  /** The time in seconds since epoch (Jan 1 1970 GMT) of the last receive */
  lastrecv: number;
  /** The total bytes sent */
  bytessent: number;
  /** The total bytes received */
  bytesrecv: number;
  /** The connection time in seconds since epoch (Jan 1 1970 GMT) */
  conntime: number;
  /** The time offset in seconds */
  timeoffset: number;
  /** Ping time (if available) */
  pingtime: number;
  /** Minimum observed ping time (if any at all) */
  minping: number;
  /** Ping wait (if non-zero) */
  pingwait: number;
  /** The peer version, such as 7001 */
  version: number;
  /** The string version */
  subver: string;
  /** Inbound (true) or Outbound (false) */
  inbound: boolean;
  /** Whether connection was due to addnode/-connect or if it was an automatic/inbound connection */
  addnode: boolean;
  /** The starting height (block) of the peer */
  startingheight: number;
  /** The ban score */
  banscore: number;
  /** The last header we have in common with this peer */
  synced_headers: number;
  /** The last block we have in common with this peer */
  synced_blocks: number;
  /** The heights of blocks we're currently asking from this peer */
  inflight: number[];
  /** Whether the peer is whitelisted */
  whitelisted: boolean;
  bytessent_per_msg: {
    /** The total bytes sent aggregated by message type */
    addr: number;
  };
  bytesrecv_per_msg: {
    /** The total bytes received aggregated by message type */
    addr: number;
  };
};
