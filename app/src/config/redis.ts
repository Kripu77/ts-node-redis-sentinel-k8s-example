import joi from "joi";

const envVarsSchema = joi
  .object({
    REDIS_MODE: joi.string().valid("standard", "sentinel").default("sentinel"),
    REDIS_HOST: joi.string().default("redis"),
    REDIS_PORT: joi.number().default(6379),
    REDIS_SENTINEL_NODES: joi.array().items(
      joi.object({
        host: joi.string().required(),
        port: joi.number().default(26379),
      })
    ),
    REDIS_MASTER_NAME: joi.string().default("mymaster"),
    REDIS_RETRY_TIMEOUT: joi.number().default(1000),
  })
  .unknown()
  .required();

const { error, value: envVars } = envVarsSchema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export type RedisMode = "standard" | "sentinel";

export type RedisConfig = {
  redis: {
    host: string;
    port: number;
    mode: string;
    retryTimeout: number;
    sentinel: {
      nodes: {
        host: string;
        port: number;
      }[];
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
      nodes: envVars.REDIS_SENTINEL_NODES || [],
      masterName: envVars.REDIS_MASTER_NAME,
    },
  },
};
