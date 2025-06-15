import { UserSchema } from "@/types/auth.js";
import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";

const plugin: FastifyPluginAsyncTypebox = async (server) => {
  const { passport } = server;

  server.get(
    "/login",
    passport.authenticate("google", {
      authInfo: false,
      scope: ["profile", "email"],
    })
  );

  server.get(
    "/google/callback",
    {
      preValidation: passport.authenticate("google", {
        authInfo: false,
        scope: ["profile", "email"],
      }),
    },
    async (_req, res) => {
      res.redirect(`${server.config.CLIENT_URL}/login/success`);
    }
  );

  server.get(
    "/user",
    {
      schema: {
        description: "Get current user",
        response: {
          200: UserSchema,
        },
      },
    },
    async (req, _res) => {
      if (req.user) {
        return req.user;
      }
    }
  );
};

export default plugin;
