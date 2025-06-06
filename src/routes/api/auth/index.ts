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
        successRedirect: "/api/protected",
        scope: ["profile", "email"],
      }),
    },
    async () => {}
  );
};

export default plugin;
