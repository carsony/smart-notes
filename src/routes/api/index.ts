import { FastifyPluginAsync } from "fastify";

const plugin: FastifyPluginAsync = async (server, opts): Promise<void> => {
  server.get("/", async (req, res) => {
    return { message: "/api" };
  });
};

export default plugin;
