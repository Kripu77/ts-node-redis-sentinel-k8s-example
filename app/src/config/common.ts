import joi from "joi";

const envVarsSchema = joi
  .object({
    PORT: joi.number().default(8000),
  })
  .unknown()
  .required();

const { error, value: envVars } = envVarsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export type CommonConfig = {
  port: number;
};

export const common: CommonConfig = {
  port: envVars.PORT,
};
