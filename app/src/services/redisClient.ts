import { Redis } from "ioredis";
import { config } from "../config";

const enum MODE {
  SENTINEL = "sentinel",
}

export const redisClient =
  config.redis.mode === MODE.SENTINEL
    ? new Redis({
        sentinels: config.redis.sentinel.nodes,
        name: config.redis.sentinel.masterName,
      })
    : new Redis({
        host: config.redis.host,
        port: config.redis.port,
      });

//random method to write the epoch string to redis
setInterval(async () => {
  await redisClient.set("timeStamp", new Date().toISOString());
}, 5000);
