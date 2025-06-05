import fp from "fastify-plugin";
import fastifySecureSession from "@fastify/secure-session";

export default fp(
  async (server) => {
    const { config } = server;
    server.register(fastifySecureSession, {
      key: config.COOKIE_SECRET,
    });
  },
  {
    name: "session",
    dependencies: ["config"],
  }
);
