import { config } from "~/_config";
import { connect, redisClient } from "@/_lib/redis";
import { rpcClients } from "~/_api/rpcClient";

export async function GET(): Promise<any> {
  await connect();
  try {
    const results: {
      [key: string]: {
        name: string;
        network: string;
        symbol: string;
        blockchainInfo: any;
      };
    }[] = [];
    const promises: any[] = [];

    Object.keys(rpcClients).forEach(async (key) => {
      const redisRef = `rpc:${key}:getblockchaininfo`;
      promises.push(redisClient.json.get(redisRef));
      promises.push(rpcClients[key].request("getblockchaininfo"));
      promises.push(
        fetch(
          `http://localhost:3000/api/v1/market/latest?blockchain=${key}`
        ).then((res) => res.json())
      );
    });
    const response = await Promise.all(promises);
    const groupedResponse = [];
    while (response.length) {
      groupedResponse.push(response.splice(0, 3));
    }
    groupedResponse.forEach((group, index) => {
      const key = Object.keys(rpcClients)[index];
      const chain = config.blockchains.chains?.[key];
      const blockchainInfo = group[0]?.latestBlock ? group[0] : group[1];
      results.push({
        name: chain.name,
        network: chain.network,
        unit: chain.unit,
        latestBlock: blockchainInfo.blocks,
        market: group[2],
      });
      const redisRef = `rpc:${key}:getblockchaininfo`;
      redisClient.json.set(redisRef, "$", blockchainInfo);
      redisClient.EXPIRE(redisRef, 60);
    });

    return Response.json(results);
  } catch (err) {
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
