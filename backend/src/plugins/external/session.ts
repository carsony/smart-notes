import fp from "fastify-plugin";
import fastifySecureSession from "@fastify/secure-session";

export default fp(
  async (server) => {
    server.register(fastifySecureSession, {
      key: server.config.COOKIE_SECRET,
      cookie: {
        path: "/",
        httpOnly: true,
      },
    });
  },
  { name: "session" }
);
