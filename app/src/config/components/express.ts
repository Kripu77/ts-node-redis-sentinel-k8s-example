import { z as zod } from "zod";

const envVarsSchema = zod.object({
  EXPRESS_PORT: zod.number().default(8000),
});

const envVars = envVarsSchema.parse(process.env);

export const express = {
  express: {
    port: envVars.EXPRESS_PORT,
  },
};
