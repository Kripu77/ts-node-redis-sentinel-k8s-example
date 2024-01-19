import { common } from "./common";
import { redis } from "./redis";
import * as dotenv from "dotenv";
dotenv.config();

export const config = {
  ...redis,
  ...common,
};
