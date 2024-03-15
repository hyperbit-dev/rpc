import { walletSchema } from "./schema";
import { addressService } from "@/_services/address-service";

export async function POST(
  request: Request,
  { params }: { params: { walletId: string } }
) {
  try {
    const res = await request.json();
    const { chainId, addresses } = await walletSchema.parse(res);

    const getAddresses = addressService.getAddresses({
      chainId,
      addresses,
    });

    return Response.json({ addresses: getAddresses });
  } catch (error) {
    console.log("error", error);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
  //   const searchParams = request.nextUrl.searchParams;
  //   const blockchain = searchParams.get("blockchain");

  //   if (!blockchain) {
  //     return Response.json({ message: "Missing blockchain query" });
  //   }

  //   const chain = config.blockchains.chains[blockchain];

  //   try {
  //     await connect();
  //     const redisRef = `market:${blockchain}`;
  //     const res = await redisClient.json.get(redisRef);

  //     if (res) {
  //       return Response.json(res, { status: 200 });
  //     }

  //     const data = await fetch(
  //       `https://api.coingecko.com/api/v3/coins/${chain.coinGeckoCoin}?tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false`
  //     ).then((res) => res.json());
  //     redisClient.json.set(redisRef, "$", data);
  //     redisClient.EXPIRE(redisRef, 60 * 5);
  //     return Response.json(data, { status: 200 });
  //   } catch (err) {
  //     return Response.json({ message: "Internal server error" }, { status: 500 });
  //   }
}
