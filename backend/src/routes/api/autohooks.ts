import { FastifyInstance } from "fastify";

export default async function (server: FastifyInstance) {
  server.addHook("preValidation", async (req, res) => {
    if (
      req.url.startsWith("/api/auth/login") ||
      req.url.startsWith("/api/auth/google/callback")
    ) {
      return;
    }

    if (!req.isAuthenticated()) {
      res.unauthorized();
    }
  });
}
