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

    let getblockchaininfo;
    let getmininginfo;
    let getchaintxstats;
    let getinfo;

    getblockchaininfo = await redisClient.json.get(redisRef1);
    if (!getblockchaininfo) {
      const response =
        await rpcClients[blockchain].request("getblockchaininfo");
      if (!response.error) {
        getblockchaininfo = response;
        redisClient.json.set(redisRef1, "$", getblockchaininfo);
        redisClient.EXPIRE(redisRef1, 60);
      }
    }

    getmininginfo = await redisClient.json.get(redisRef2);
    if (!getmininginfo) {
      const response = await rpcClients[blockchain].request("getmininginfo");
      if (!response.error) {
        getmininginfo = response;
        redisClient.json.set(redisRef2, "$", getmininginfo);
        redisClient.EXPIRE(redisRef2, 60 * 5);
      }
    }

    getchaintxstats = await redisClient.json.get(redisRef3);
    if (!getchaintxstats) {
      const response = await rpcClients[blockchain].request("getchaintxstats");
      if (!response.error) {
        getchaintxstats = response;
        redisClient.json.set(redisRef3, "$", getchaintxstats);
        redisClient.EXPIRE(redisRef3, 60 * 5);
      }
    }

    getinfo = await redisClient.json.get(redisRef4);
    if (!getinfo) {
      const response = await rpcClients[blockchain].request("getinfo");
      if (!response.error) {
        getinfo = response;
        redisClient.json.set(redisRef4, "$", getinfo);
        redisClient.EXPIRE(redisRef4, 60 * 5);
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
