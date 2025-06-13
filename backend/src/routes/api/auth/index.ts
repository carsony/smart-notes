import { FastifyPluginAsync } from "fastify";

const plugin: FastifyPluginAsync = async (server) => {
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

  server.get("/user", async (req, _res) => {
    return { user: req.user };
  });
};

export default plugin;
