import vine from '@vinejs/vine'

export enum RpcCommands {
  GET_BLOCK = 'getblock',
  GET_BLOCK_COUNT = 'getblockcount',
  DECODE_BLOCK = 'decodeblock',
  GET_BEST_BLOCK_HASH = 'getbestblockhash',
  GET_BLOCKCHAIN_INFO = 'getblockchaininfo',
  GET_BLOCK_DELTAS = 'getblockdeltas',
  GET_BLOCK_HASH = 'getblockhash',
  GET_BLOCK_HEADER = 'getblockheader',
  GET_CHAIN_TIPS = 'getchaintips',
  GET_DIFFICULTY = 'getdifficulty',
  DECODE_RAW_TRANSACTION = 'decoderawtransaction',
  DECODE_SCRIPT = 'decodescript',
  GET_RAW_TRANSACTION = 'getrawtransaction',
  GET_ADDRESS_BALANCE = 'getaddressbalance',
  GET_ADDRESS_TX_IDS = 'getaddresstxids',
  GET_ADDRESS_UTXOS = 'getaddressutxos',
  GET_ADDRESS_DELTAS = 'getaddressdeltas',
  VALIDATE_ADDRESS = 'validateaddress',
  VERIFY_MESSAGE = 'verifymessage',
  LIST_ASSETS = 'listassets',
  LIST_ADDRESSES_BY_ASSET = 'listaddressesbyasset',
  CHECK_ADDRESS_RESTRICTION = 'checkaddressrestriction',
  LIST_ADDRESS_RESTRICTIONS = 'listaddressrestrictions',
  LIST_ASSET_BALANCE_BY_ADDRESS = 'listassetbalancebyaddress',
  GET_VERIFIER_STRING = 'getverifierstring',
  GET_SNAPSHOT = 'getsnapshot',
  GET_ASSET_DATA = 'getassetdata',
  GET_BALANCE = 'getbalance',
  GET_BLOCK_TEMPLATE = 'getblocktemplate',
  GET_MINING_INFO = 'getmininginfo',
  GET_NETWORK_HASH_PS = 'getnetworkhashps',
  ESTIMATE_SMART_FEE = 'estimatesmartfee',
  SUBMIT_BLOCK = 'submitblock',
}

export type RpcCommand = `${RpcCommands}`;

export const rpcCommandValidator = vine.enum(RpcCommands)
