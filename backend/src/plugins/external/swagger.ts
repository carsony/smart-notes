import fp from "fastify-plugin";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifySwagger from "@fastify/swagger";

export default fp(async function (fastify) {
  await fastify.register(fastifySwagger, {
    openapi: {
      info: {
        title: "Swagger API Test",
        description: "Testing the Fastify swagger API",
        version: "0.0.0",
      },
      tags: [{ name: "user", description: "User related end-points" }],
    },
  });

  await fastify.register(fastifySwaggerUi, {
    routePrefix: "/api/docs",
  });
});
