import { FastifyPluginAsync } from "fastify";

const plugin: FastifyPluginAsync = async (server) => {
  server.get(
    "/",
    {
      preValidation: (req, res, done) => {
        if (!req.isAuthenticated()) {
          return res.redirect("/api/auth/login");
        }
        done();
      },
    },
    async () => "protected"
  );
};

export default plugin;
