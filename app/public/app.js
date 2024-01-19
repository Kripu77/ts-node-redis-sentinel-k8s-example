"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ioredis_1 = require("ioredis");
const app = (0, express_1.default)();
const PORT = 8000;
//sentinel Nodes
const sentinelNodes = [
    {
        host: "test-redis-node-0.test-redis-headless.em-svc-dev.svc.cluster.local",
        port: 26379,
    },
    {},
    {
        host: "test-redis-node-0.test-redis-headless.em-svc-dev.svc.cluster.local",
        port: 26379,
    },
    {
        host: "test-redis-node-2.test-redis-headless.em-svc-dev.svc.cluster.local",
        port: 26379,
    },
];
//redis client
const redisClient = new ioredis_1.Redis({
    sentinels: sentinelNodes,
    name: "myMaster",
});
setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
    yield redisClient.set("timeStamp", new Date().toISOString());
}), 5000);
function getTimeStampFromRedis() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield redisClient.get("timeStamp");
    });
}
//get data
app.get("/station", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const redisTimeStamp = yield getTimeStampFromRedis();
    return res.status(200).json({
        success: true,
        data: redisTimeStamp,
    });
}));
//catch all routes
app.use("*", (req, res) => {
    return res.status(400).send("Invalid routes, please try later");
});
//listen for incomming requests
app.listen(PORT, () => {
    console.log("Server running");
});
