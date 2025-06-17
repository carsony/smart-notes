import fp from "fastify-plugin";
import fastifySecureSession from "@fastify/secure-session";

export default fp(
  async (fastify) => {
    fastify.register(fastifySecureSession, {
      key: fastify.config.COOKIE_SECRET,
      cookie: {
        path: "/",
        httpOnly: true,
      },
    });
  },
  { name: "session" }
);
