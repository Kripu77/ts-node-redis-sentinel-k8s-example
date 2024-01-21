import Express, { Request, Response } from "express";
import { redisClient } from "./services";
import { config } from "./config";
const app = Express();
const PORT: number = config.port;

console.log(process.env);

async function getTimeStampFromRedis() {
  return await redisClient.get("timeStamp");
}

app.get("/", async (req: Request, res: Response) => {
  const redisTimeStamp = await getTimeStampFromRedis();
  return res.status(200).json({
    success: true,
    message: "Last Updated on:",
    data: redisTimeStamp,
  });
});

//catch all routes
app.use("*", (req: Request, res: Response) => {
  return res.status(400).send("Invalid routes, please try later");
});

//listen for incomming requests
app.listen(PORT, () => {
  console.log(config.redis.sentinel);
  console.log("Server running");
});
