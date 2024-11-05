import { NextRequest } from "next/server";
import { handleResponse } from "@/_api/validation";
import rpcClients from "~/_api/rpcClient";
import { connect, redisClient } from "@/_lib/redis";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const blockchain = searchParams.get("blockchain");

    if (!blockchain) {
      return Response.json({ message: "Missing blockchain query" });
    }

    await connect();
    let data;
    const redisRef = `rpc:${blockchain}:getblockchaininfo`;
    data = await redisClient.json.get(redisRef);
    if (!data || data?.status === 500) {
      data = await rpcClients[blockchain].request("getblockchaininfo");
      redisClient.json.set(redisRef, "$", data);
      // Expire shorter than standard to get faster blocks
      redisClient.EXPIRE(redisRef, 60 * 5 * 1000);
    }

    let blockHeaders: any[] = [];

    switch (blockchain) {
      case "pgn":
      case "tpgn":
        const redisRef1 = `rpc:${blockchain}:getblockstats:${data.blocks === 0 ? data.blocks : data.blocks - 9}`;
        const res1 = await redisClient.json.get(redisRef1);
        const redisRef2 = `rpc:${blockchain}:getblockheaders:${res1.blockhash}:10`;
        const res2 = await redisClient.json.get(redisRef2);

        if (res2) {
          blockHeaders = res2.reverse();
        } else {
          const blockStats = await rpcClients[blockchain].request(
            "getblockstats",
            [data.blocks === 0 ? data.blocks : data.blocks - 9],
          );
          const res = await rpcClients[blockchain].request("getblockheaders", [
            blockStats.blockhash,
            10,
          ]);
          blockHeaders = res.reverse();
          await redisClient.json.set(redisRef1, "$", blockStats);
          await redisClient.EXPIRE(redisRef1, 60 * 5 * 1000);
          await redisClient.json.set(redisRef2, "$", res);
          await redisClient.EXPIRE(redisRef2, 60 * 5 * 1000);
          break;
        }

      default:
        blockHeaders = await getBlockHeaders(blockchain, data.bestblockhash);
        break;
    }

    let blocks: any[] = [];

    if (data.blocks > 0) {
      const promises: any[] = [];
      blockHeaders.forEach(async (blockHeader: any) => {
        promises.push(getBlockStats(blockchain, blockHeader));
      });

      blocks = await Promise.all(promises);
    }
    return handleResponse<any>(blocks);
    <any>blocks;
  } catch (err) {
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}

async function getBlockHeaders(blockchain: string, hash: any): Promise<any> {
  const blockHeaders: any[] = [];
  let blockhash = hash;
  for (let i = 0; i < 10; i++) {
    const redisRef = `rpc:${blockchain}:getblockheader:${blockhash}`;
    const data = await redisClient.json.get(redisRef);

    if (data) {
      blockHeaders.push(data);
      blockhash = data.previousblockhash;
    } else {
      const blockHeader = await rpcClients[blockchain].request(
        "getblockheader",
        [blockhash],
      );
      await redisClient.json.set(redisRef, "$", blockHeader);
      await redisClient.EXPIRE(redisRef, 60 * 5 * 1000);
      blockHeaders.push(blockHeader);
      blockhash = blockHeader.previousblockhash;
    }
  }
  return blockHeaders;
}

async function getBlockStats(blockchain: string, blockHeader: any) {
  switch (blockchain) {
    case "pgn":
    case "tpgn": {
      const redisRef = `rpc:${blockchain}:getblockstats:${blockHeader}:${blockHeader.height}`;
      const data = await redisClient.json.get(redisRef);

      if (data) {
        return {
          blockHeader,
          blockStats: data,
        };
      } else {
        const data = await rpcClients[blockchain].request("getblockstats", [
          blockHeader.height,
        ]);

        await redisClient.json.set(redisRef, "$", data);
        await redisClient.EXPIRE(redisRef, 60 * 5 * 1000);
        return {
          blockHeader,
          blockStats: data,
        };
      }
    }
    default: {
      const redisRef = `rpc:${blockchain}:getblock:${blockHeader.hash}:2`;
      const data = await redisClient.json.get(redisRef);

      if (data) {
        return {
          blockHeader,
          blockStats: data,
        };
      } else {
        const data = await rpcClients[blockchain].request("getblock", [
          blockHeader.hash,
          2,
        ]);
        await redisClient.json.set(redisRef, "$", data);
        await redisClient.EXPIRE(redisRef, 60 * 5 * 1000);
        return {
          blockHeader,
          blockStats: data,
        };
      }
    }
  }
}
