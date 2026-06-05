const Redis = require("ioredis");

const redis = process.env.REDIS_PASSWORD
  ? new Redis({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASSWORD,
      tls: {}
    })
  : new Redis({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    });

redis.on("connect", () => console.log("Redis connected"));
redis.on("error", (err) => console.log("Redis error", err));

module.exports = redis;