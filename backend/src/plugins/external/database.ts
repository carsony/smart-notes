import fp from "fastify-plugin";
import { FastifyInstance } from "fastify";
import { Kysely, PostgresDialect } from "kysely";
import { Pool, PoolConfig } from "pg";
import { Database } from "@/types/database.js";

declare module "fastify" {
  export interface FastifyInstance {
    db: Kysely<Database>;
  }
}

export const autoConfig = (fastify: FastifyInstance) => {
  return {
    database: fastify.config.POSTGRES_DB,
    host: fastify.config.POSTGRES_HOST,
    port: fastify.config.POSTGRES_PORT,
    user: fastify.config.POSTGRES_USER,
    max: 10,
  };
};

export default fp<PoolConfig>(
  async (fastify: FastifyInstance, opts) => {
    const dialect = new PostgresDialect({
      pool: new Pool(opts),
    });

    const db = new Kysely<Database>({ dialect });
    fastify.decorate("db", db);

    fastify.addHook("onClose", async (instance) => {
      await instance.db.destroy();
    });
  },
  { name: "db" }
);
