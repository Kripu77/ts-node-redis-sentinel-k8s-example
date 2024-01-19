import Express, { Request, Response } from "express";
import { redisClient } from "./services";
import { config } from "./config";
const app = Express();
const PORT: number = config.port;

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
const test = [
  {
    host: "ts-node-redis-sentinel-k8s-example-node-0.ts-node-redis-sentinel-k8s-example-headless.ts-node-redis-sentinel-k8s-example.cluster.local",
    port: 26379,
  },
  {
    host: "ts-node-redis-sentinel-k8s-example-node-1.ts-node-redis-sentinel-k8s-example-headless.ts-node-redis-sentinel-k8s-example.cluster.local",
    port: 26379,
  },
];
//listen for incomming requests
app.listen(PORT, () => {
  console.log("Server running");
});
