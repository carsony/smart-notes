import * as path from "node:path";
import AutoLoad from "@fastify/autoload";
import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const options = {
  ajv: {
    customOptions: {
      removeAdditional: "all",
    },
  },
};

export default async function app(
  fastify: FastifyInstance,
  opts: FastifyPluginOptions
) {
  delete opts.skipOverride; // This option only serves testing purpose

  await fastify.register(AutoLoad, {
    dir: path.join(__dirname, "plugins/external"),
    options: opts,
    forceESM: true,
  });

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "routes"),
    options: opts,
    autoHooks: true,
    cascadeHooks: true,
    forceESM: true,
  });

  fastify.setErrorHandler((err, request, reply) => {
    fastify.log.error(
      {
        err,
        request: {
          method: request.method,
          url: request.url,
          query: request.query,
          params: request.params,
        },
      },
      "Unhandled error occurred"
    );

    reply.code(err.statusCode ?? 500);

    return err.statusCode && err.statusCode < 500
      ? { message: err.message }
      : { message: "Internal Server Error" };
  });

  fastify.setNotFoundHandler(
    {
      preHandler: fastify.rateLimit(),
    },
    (request, reply) => {
      request.log.warn(
        {
          request: {
            method: request.method,
            url: request.url,
            query: request.query,
            params: request.params,
          },
        },
        "Resource not found"
      );
      
      reply.code(404).send({ message: "Not Found" });
    }
  );
}
