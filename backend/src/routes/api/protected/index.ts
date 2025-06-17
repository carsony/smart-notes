import { FastifyPluginAsync } from "fastify";

const plugin: FastifyPluginAsync = async (fastify) => {
  fastify.get(
    "/",
    {
      preValidation: (request, reply, done) => {
        if (!request.isAuthenticated()) {
          return reply.redirect("/api/auth/login");
        }
        done();
      },
    },
    async (request, reply) => {
      return { message: "protected" };
    }
  );
};

export default plugin;
