import { NextFunction, Request, Response } from "express";
import Redis from "ioredis";
import { RateLimiterRedis } from "rate-limiter-flexible";
import { AppError } from "@shared/errors/AppError";

const redisClient = new Redis({
  host: "redis_sgq",
  port: 6379,
  enableOfflineQueue: false,
});

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: "rateLimiter",
  points: 5,
  duration: 5000,
});

export default async function rateLimiter(
  request: Request,
  reponse: Response,
  next: NextFunction,
) {
  try {
    await limiter.consume(request.ip);

    return next();
  } catch (error) {
    throw new AppError("Too many requests Will", 429);
  }
}
