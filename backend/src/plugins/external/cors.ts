import fp from "fastify-plugin";
import { FastifyInstance } from "fastify";
import cors, { FastifyCorsOptions } from "@fastify/cors";

export const autoConfig = (server: FastifyInstance) => {
  return {
    methods: ["GET", "POST", "PUT", "DELETE"],
    origin: [server.config.CLIENT_URL],
    credentials: true,
  };
};

export default fp<FastifyCorsOptions>(async (server, opts) => {
  server.register(cors, opts);
});
