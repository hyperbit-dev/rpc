import { blockchainSchema } from "@/_config";
import { connect, redisClient } from "@/_lib/redis";
import { NextRequest } from "next/server";
import rpcClients from "~/_api/rpcClient";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const blockchain = searchParams.get("blockchain");
  if (!blockchain) {
    return new Response(`blockchain is required`, {
      status: 400,
    });
  }

  try {
    await blockchainSchema.parse({ blockchain });

    await connect();

    const redisRef1 = `faucet:${blockchain}:getbalance`;
    const redisRef2 = `faucet:${blockchain}:listmyassets`;
    const redisRef3 = `faucet:${blockchain}:getaccountaddress`;
    let balance,
      assets = {},
      address;

    balance = await redisClient.json.get(redisRef1);
    if (!balance) {
      balance = await rpcClients[blockchain].request("getbalance", {});
      redisClient.json.set(redisRef1, "$", balance);
      redisClient.EXPIRE(redisRef1, 60 * 5);
    }

    assets = await redisClient.json.get(redisRef2);
    if (!assets) {
      assets = await rpcClients[blockchain].request("listmyassets", {});
      redisClient.json.set(redisRef2, "$", assets);
      redisClient.EXPIRE(redisRef2, 60 * 5);
    }

    address = await redisClient.json.get(redisRef3);
    if (!address) {
      address = await rpcClients[blockchain].request("getaccountaddress", {
        account: "",
      });
      redisClient.json.set(redisRef3, "$", address);
      redisClient.EXPIRE(redisRef3, 60 * 5);
    }

    Object.keys(assets).forEach((key) => {
      if (key.endsWith("!") || key.startsWith("$")) {
        delete assets[key as keyof typeof assets];
      }
    });

    const response = {
      address: address?.code === 500 ? {} : address,
      balance: Number(balance) ? balance : 0,
      // @ts-ignore
      assets: assets?.code === 500 ? {} : assets,
    };

    return Response.json(response);
  } catch (err) {
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
