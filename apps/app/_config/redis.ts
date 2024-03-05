type Redis = {
  host: string;
  port: string;
  user: string;
  password: string;
};

export const redis: Redis = {
  host: process.env.REDIS_HOST!,
  port: process.env.REDIS_PORT!,
  user: process.env.REDIS_USER!,
  password: process.env.REDIS_PASSWORD!,
};
