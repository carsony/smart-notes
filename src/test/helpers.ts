import { FastifyInstance } from "fastify";
import { build as buildApplication } from "fastify-cli/helper.js";
import { options as serverOptions } from "../app.js";

declare module "fastify" {
  interface FastifyInstance {}
}

export function config() {
  return {
    skipOverride: true, // Register our application with fastify-plugin
  };
}

export async function build() {
  const argv = ["dist/app.js"];

  return (await buildApplication(
    argv,
    config(),
    serverOptions
  )) as FastifyInstance;
}
