import { createClient } from "redis";
import { config } from "@/_config";

declare const global: {
  [key: string]: any;
};

const url =
  (config.redis?.url ||
    `redis://${config.redis.user}:${config.redis.password}@${config.redis.host}:${config.redis.port}`) ??
  "redis://localhost:6379";

let client = global.redis;

if (!client) {
  client = global.redis = createClient({ url });
}

//Open connection only when there is no existing connection
export const connect = async () => {
  if (client.isOpen) {
    console.log("Already connected to Redis");
    return;
  }

  await client.connect();
  console.log("Connected successfully.");
};

//Close connection only when there is an existing connection
export const disconnect = async () => {
  if (!client.isOpen) {
    return;
  }
  await client.quit();
  console.log("Disconnected.");
};

export { client as redisClient };
