import { Entity, EntityId } from "redis-om";
import getRedisFaucet from "./redis";

async function findInCache(
  ipAddress: string,
  // coin = process.env.NEXT_PUBLIC_BLOCKCHAIN_TICKER ?? ""
  coin = "",
) {
  const faucetRepository = await getRedisFaucet();

  return faucetRepository
    .search()
    .where("ipAddress")
    .equals(ipAddress)
    .and("coin")
    .equals(coin)
    .return.first();
}

// type BaseFaucet = {
//   faucet: FaucetData;
//   cached: boolean;
//   time: number;
// };

// type Faucet = Entity & {
//   faucet: FaucetData;
//   cached: boolean;
//   time: number;
// };

type FaucetData = {
  ipAddress: string;
  blockchain: string;
  amount: number;
  time: number | string;
};

async function storeInCache(data: Entity): Promise<Entity> {
  const faucetRepository = await getRedisFaucet();
  if (data[EntityId]) {
    await faucetRepository.save(data);
    return data;
  } else {
    const faucet = await faucetRepository.save({
      ipAddress: data.ipAddress,
      amount: data.amount,
      count: data.count,
      time: data.time,
    });

    const ttlInSeconds = 24 * 60 * 60; // 24 hours
    // @ts-ignore
    const id = faucet[EntityId] as string;

    await faucetRepository.expire(id, ttlInSeconds);
    return faucet;
  }
}

export async function getFaucet({
  ipAddress,
  blockchain,
  amount,
}: {
  ipAddress: string;
  blockchain: string;
  amount: number;
}): Promise<Entity> {
  const start = Date.now();
  const redisFaucet = await findInCache(ipAddress, blockchain);

  if (redisFaucet) {
    redisFaucet.amount = Number(redisFaucet.amount) + Number(amount);
    redisFaucet.coin = blockchain;
    await storeInCache(redisFaucet);

    return {
      faucet: redisFaucet,
      cached: true,
      time: Date.now() - start,
    };
  }

  const faucetData = {
    ipAddress,
    blockchain,
    amount,
    time: Date.now() - start,
  };

  const data = await storeInCache(faucetData);

  return {
    faucet: faucetData,
    cached: false,
    time: data.time,
  };
}
