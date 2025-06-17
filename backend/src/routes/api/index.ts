import { FastifyPluginAsync } from "fastify";

const plugin: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/", async (request, reply) => {
    return { message: "/api" };
  });
};

export default plugin;
