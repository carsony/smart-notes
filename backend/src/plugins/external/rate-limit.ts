import fastifyRateLimit from "@fastify/rate-limit";
import { FastifyInstance } from "fastify";

export const autoConfig = (server: FastifyInstance) => {
  return {
    max: server.config.RATE_LIMIT_MAX,
    timeWindow: "1 second",
  };
};

export default fastifyRateLimit;
