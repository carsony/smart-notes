import { UserSchema } from "@/schemas/auth.js";
import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { passport } = fastify;

  fastify.addSchema(UserSchema);

  fastify.get(
    "/login",
    passport.authenticate("google", {
      authInfo: false,
      scope: ["profile", "email"],
    })
  );

  fastify.get(
    "/google/callback",
    {
      preValidation: passport.authenticate("google", {
        authInfo: false,
        scope: ["profile", "email"],
      }),
    },
    async (_request, reply) => {
      reply.redirect(`${fastify.config.CLIENT_URL}/login/success`);
    }
  );

  fastify.get(
    "/user",
    {
      schema: {
        description: "Get current user",
        tags: ["auth"],
        operationId: "getUser",
        response: {
          "2XX": { $ref: "User" },
        },
      },
    },
    async (request, _reply) => {
      if (request.user) {
        return request.user;
      }
    }
  );
};

export default plugin;
