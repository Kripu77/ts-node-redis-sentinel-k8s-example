import * as dotenv from "dotenv";
dotenv.config();

import { redis, express } from "./components";

export const config = {
  ...redis,
  ...express,
};
