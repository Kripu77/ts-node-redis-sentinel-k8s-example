import { z } from "zod";

type SentinelNode = {
  host?: string;
  port?: number;
};

const SentinelNodeSchema = z.object({
  host: z.string(),
  port: z.number().default(26379),
});

const SentinelNodesSchema = z.array(SentinelNodeSchema);

const envVarsSchema = z.object({
  REDIS_MODE: z.enum(["standard", "sentinel"]).default("sentinel"),
  REDIS_HOST: z.string().default("redis"),
  REDIS_PORT: z.number().default(6379),
  REDIS_SENTINEL_NODES: SentinelNodesSchema,
  REDIS_MASTER_NAME: z.string().default("mymaster"),
  REDIS_RETRY_TIMEOUT: z.number().default(1000),
});

const envVars = envVarsSchema.parse({
  REDIS_MODE: process.env.REDIS_MODE,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: parseInt(process.env.REDIS_PORT, 10),
  REDIS_SENTINEL_NODES: JSON.parse(process.env.REDIS_SENTINEL_NODES),
  REDIS_MASTER_NAME: process.env.REDIS_MASTER_NAME,
  REDIS_RETRY_TIMEOUT: parseInt(process.env.REDIS_RETRY_TIMEOUT, 10),
});

export type RedisConfig = {
  redis: {
    host: string;
    port: number;
    mode: string;
    retryTimeout: number;
    sentinel: {
      nodes: SentinelNode[];
      masterName: string;
    };
  };
};

export const redis: RedisConfig = {
  redis: {
    host: envVars.REDIS_HOST,
    port: envVars.REDIS_PORT,
    mode: envVars.REDIS_MODE,
    retryTimeout: envVars.REDIS_RETRY_TIMEOUT,
    sentinel: {
      nodes: envVars.REDIS_SENTINEL_NODES,
      masterName: envVars.REDIS_MASTER_NAME,
    },
  },
};

export type Redis = z.infer<typeof envVarsSchema>;
