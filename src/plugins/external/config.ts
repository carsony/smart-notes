import fp from "fastify-plugin";
import env from "@fastify/env";
import { FastifyInstance } from "fastify";

declare module "fastify" {
  export interface FastifyInstance {
    config: {
      COOKIE_SECRET: string;
      COOKIE_NAME: string;
      COOKIE_SECURED: boolean;
      RATE_LIMIT_MAX: number;
      FASTIFY_CLOSE_GRACE_DELAY: number;
      LOG_LEVEL: string;
      PORT: number;
    };
  }
}

const schema = {
  type: "object",
  required: [
    "COOKIE_SECRET",
    "COOKIE_NAME",
    "COOKIE_SECURED",
    "FASTIFY_CLOSE_GRACE_DELAY",
    "LOG_LEVEL",
  ],
  properties: {
    // Security
    COOKIE_SECRET: {
      type: "string",
    },
    COOKIE_NAME: {
      type: "string",
    },
    COOKIE_SECURED: {
      type: "boolean",
      default: true,
    },
    RATE_LIMIT_MAX: {
      type: "number",
      default: 100,
    },
    FASTIFY_CLOSE_GRACE_DELAY: {
      type: "number",
      default: 500,
    },
    LOG_LEVEL: {
      type: "string",
      default: "info",
    },
    PORT: {
      type: "number",
      default: 3000,
    },
  },
};

export const options = {
  // Decorate Fastify instance with `config` key
  // Optional, default: 'config'
  confKey: "config",
  // Schema to validate
  schema,
  // Needed to read .env in root folder
  dotenv: true,
  data: process.env,
  removeAdditional: true,
  encapsulate: false,
};

export default fp(
  async (server: FastifyInstance) => {
    server.register(env, options);
  },
  { name: "config" }
);
