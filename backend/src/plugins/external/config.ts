import env from "@fastify/env";

declare module "fastify" {
  export interface FastifyInstance {
    config: {
      CLIENT_URL: string;
      POSTGRES_HOST: string;
      POSTGRES_PORT: number;
      POSTGRES_DB: string;
      POSTGRES_USER: string;
      POSTGRES_PASSWORD: string;
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
      GOOGLE_CALLBACK_URL: string;
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
    "CLIENT_URL",
    "POSTGRES_HOST",
    "POSTGRES_PORT",
    "POSTGRES_DB",
    "POSTGRES_USER",
    "POSTGRES_PASSWORD",
    "GOOGLE_CLIENT_ID",
    "GOOGLE_CLIENT_SECRET",
    "GOOGLE_CALLBACK_URL",
    "COOKIE_SECRET",
    "COOKIE_NAME",
    "COOKIE_SECURED",
    "FASTIFY_CLOSE_GRACE_DELAY",
    "LOG_LEVEL",
  ],
  properties: {
    CLIENT_URL: {
      type: "string",
    },
    POSTGRES_HOST: {
      type: "string",
    },
    POSTGRES_PORT: {
      type: "number",
      default: 5432,
    },
    POSTGRES_DB: {
      type: "string",
    },
    POSTGRES_USER: {
      type: "string",
    },
    POSTGRES_PASSWORD: {
      type: "string",
    },
    GOOGLE_CLIENT_ID: {
      type: "string",
    },
    GOOGLE_CLIENT_SECRET: {
      type: "string",
    },
    GOOGLE_CALLBACK_URL: {
      type: "string",
    },
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

export const autoConfig = {
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

export default env;
