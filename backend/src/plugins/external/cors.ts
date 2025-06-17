import fp from "fastify-plugin";
import { FastifyInstance } from "fastify";
import cors, { FastifyCorsOptions } from "@fastify/cors";

export const autoConfig = (fastify: FastifyInstance) => {
  return {
    methods: ["GET", "POST", "PUT", "DELETE"],
    origin: [fastify.config.CLIENT_URL],
    credentials: true,
  };
};

export default fp<FastifyCorsOptions>(async (fastify, opts) => {
  fastify.register(cors, opts);
});
