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
    async (req, res) => {
      return { message: "protected" };
    }
  );
};

export default plugin;
