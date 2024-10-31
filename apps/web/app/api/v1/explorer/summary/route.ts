import { connect, disconnect, redisClient } from "@/_lib/redis";
import { type NextRequest } from "next/server";
import { rpcClients } from "~/_api/rpcClient";

export async function GET(request: NextRequest): Promise<any> {
  const searchParams = request.nextUrl.searchParams;
  const blockchain = searchParams.get("blockchain");

  if (!blockchain) {
    return Response.json({ message: "Missing blockchain query" });
  }

  try {
    await connect();
    const redisRef1 = `rpc:${blockchain}:getblockchaininfo`;
    const redisRef2 = `rpc:${blockchain}:getmininginfo`;
    const redisRef3 = `rpc:${blockchain}:getchaintxstats`;
    const redisRef4 = `rpc:${blockchain}:getinfo`;
    const redisRef5 = `rpc:${blockchain}:getmempoolinfo`;

    let getblockchaininfo;
    let getmininginfo;
    let getchaintxstats;
    let getinfo;
    let getmempoolinfo;

    getblockchaininfo = await redisClient.json.get(redisRef1);
    if (!getblockchaininfo || getblockchaininfo?.status === 500) {
      const response =
        await rpcClients[blockchain].request("getblockchaininfo");
      if (!response.error && response?.status !== 500) {
        getblockchaininfo = response;
        redisClient.json.set(redisRef1, "$", getblockchaininfo);
        redisClient.EXPIRE(redisRef1, 60);
      }
    }

    getmininginfo = await redisClient.json.get(redisRef2);
    if (!getmininginfo || getmininginfo?.status === 500) {
      const response = await rpcClients[blockchain].request("getmininginfo");
      if (!response.error && response?.status !== 500) {
        getmininginfo = response;
        redisClient.json.set(redisRef2, "$", getmininginfo);
        redisClient.EXPIRE(redisRef2, 60 * 5);
      }
    }

    getchaintxstats = await redisClient.json.get(redisRef3);
    if (!getchaintxstats || getchaintxstats?.status === 500) {
      const response = await rpcClients[blockchain].request("getchaintxstats");
      if (!response.error && response?.status !== 500) {
        getchaintxstats = response;
        redisClient.json.set(redisRef3, "$", getchaintxstats);
        redisClient.EXPIRE(redisRef3, 60 * 5);
      }
    }

    getinfo = await redisClient.json.get(redisRef4);
    if (!getinfo || getinfo?.status === 500) {
      const response = await rpcClients[blockchain].request("getinfo");
      if (!response.error && response?.status !== 500) {
        getinfo = response;
        redisClient.json.set(redisRef4, "$", getinfo);
        redisClient.EXPIRE(redisRef4, 60 * 5);
      }
    }

    getmempoolinfo = await redisClient.json.get(redisRef5);
    if (!getmempoolinfo || getmempoolinfo?.status === 500) {
      const response = await rpcClients[blockchain].request("getmempoolinfo");
      if (!response.error && response?.status !== 500) {
        getmempoolinfo = response;
        redisClient.json.set(redisRef5, "$", getmempoolinfo);
        redisClient.EXPIRE(redisRef5, 60 * 5);
      }
    }

    if (getchaintxstats?.code === 500) {
      getchaintxstats = {
        time: 0,
        txcount: 0,
        window_block_count: 0,
        window_tx_count: 0,
        window_interval: 0,
        txrate: 0,
      };
    }

    const response = {
      blockchainInfo: getblockchaininfo,
      miningInfo: getmininginfo,
      blockchainTxStats: getchaintxstats,
      version: getinfo?.version,
    };
    return Response.json(response);
  } catch (err) {
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
