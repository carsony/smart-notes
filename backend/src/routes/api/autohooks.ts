import { FastifyInstance } from "fastify";

export default async function (fastify: FastifyInstance) {
  fastify.addHook("preValidation", async (request, reply) => {
    if (
      request.url.startsWith("/api/auth/login") ||
      request.url.startsWith("/api/auth/google/callback")
    ) {
      return;
    }

    if (!request.isAuthenticated()) {
      reply.unauthorized();
    }
  });
}
