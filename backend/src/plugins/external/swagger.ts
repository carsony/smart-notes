import fp from "fastify-plugin";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifySwagger from "@fastify/swagger";

export default fp(async function (fastify) {
  // @ts-ignore
  await fastify.register(fastifySwagger, {
    hideUntagged: true,
    openapi: {
      info: {
        title: "Smart Notes",
        description: "API for Smart Notes",
        version: "0.0.0",
      },
      tags: [{ name: "auth", description: "Auth related end-points" }],
    },
    refResolver: {
      buildLocalReference(json, _baseUri, _fragment, i) {
        return json.$id || `my-fragment-${i}`;
      },
    },
  });

  await fastify.register(fastifySwaggerUi, {
    routePrefix: "/api/docs",
  });
});
