import { Entity, EntityId } from "redis-om";
import getRedisUser from "./redis";

async function findInCache(
  ipAddress: string,
  coin = process.env.NEXT_PUBLIC_BLOCKCHAIN_TICKER ?? ""
) {
  const userRepository = await getRedisUser();

  return userRepository
    .search()
    .where("ipAddress")
    .equals(ipAddress)
    .and("coin")
    .equals(coin)
    .return.first();
}

type BaseUser = {
  user: UserData;
  cached: boolean;
  time: number;
};

type User = Entity & {
  user: UserData;
  cached: boolean;
  time: number;
};

type UserData = {
  ipAddress: string;
  blockchain: string;
  amount: number;
  time: number | string;
};

async function storeInCache(data: Entity): Promise<Entity> {
  const userRepository = await getRedisUser();
  if (data[EntityId]) {
    await userRepository.save(data);
    return data;
  } else {
    const user = await userRepository.save({
      ipAddress: data.ipAddress,
      amount: data.amount,
      count: data.count,
      time: data.time,
    });

    const ttlInSeconds = 24 * 60 * 60; // 24 hours
    const id = user[EntityId] as string;

    await userRepository.expire(id, ttlInSeconds);
    return user;
  }
}

export async function getUser({
  ipAddress,
  blockchain,
  amount,
}: {
  ipAddress: string;
  blockchain: string;
  amount: number;
}): Promise<Entity> {
  const start = Date.now();
  const redisUser = await findInCache(ipAddress, blockchain);

  if (redisUser) {
    redisUser.amount = Number(redisUser.amount) + Number(amount);
    redisUser.coin = blockchain;
    await storeInCache(redisUser);

    return {
      user: redisUser,
      cached: true,
      time: Date.now() - start,
    };
  }

  const userData = {
    ipAddress,
    blockchain,
    amount,
    time: Date.now() - start,
  };

  const data = await storeInCache(userData);

  return {
    user: userData,
    cached: false,
    time: data.time,
  };
}
