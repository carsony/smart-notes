import { FastifyInstance } from "fastify";
import { afterAll, describe, beforeAll, expect, test } from "vitest";
import { build } from "./test/helpers.js";

describe("server", async () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = await build();
  });

  afterAll(async () => await app.close());

  test("with HTTP injection", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/",
    });
    expect(response.statusCode).toBe(200);
  });
});
