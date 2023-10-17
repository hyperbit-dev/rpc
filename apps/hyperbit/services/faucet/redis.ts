import { createClient } from "redis";
import { Repository, Schema } from "redis-om";

export const userSchema = new Schema(
  "user",
  {
    ipAddress: { type: "string", path: "$.user.ipAddress" },
    coin: { type: "string", path: "$.user.coin" },
    time: { type: "string", path: "$.user.time" },
    amount: { type: "number", path: "$.user.amount" },
  },
  {
    dataStructure: "JSON",
  }
);

const redis = createClient({
  url: process.env.REDIS_HOST ?? "redis://localhost:6379",
});

redis.on("error", (err) => console.log("Redis Client Error", err));

export default async function getRedisUser() {
  if (!redis.isOpen) {
    await redis.connect();
  }

  const userRepository = new Repository(userSchema, redis);

  await userRepository.createIndex();

  return userRepository;
}
