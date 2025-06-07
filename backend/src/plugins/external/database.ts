import fp from "fastify-plugin";
import { FastifyInstance } from "fastify";
import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import { Database } from "@/types/database.js";

declare module "fastify" {
  export interface FastifyInstance {
    db: Kysely<Database>;
  }
}

export const autoConfig = (server: FastifyInstance) => {
  return {
    database: server.config.POSTGRES_DB,
    host: server.config.POSTGRES_HOST,
    port: server.config.POSTGRES_PORT,
    user: server.config.POSTGRES_USER,
    max: 10,
  };
};

export default fp(
  async (server: FastifyInstance, opts) => {
    const dialect = new PostgresDialect({
      pool: new Pool(opts),
    });

    const db = new Kysely<Database>({ dialect });
    server.decorate("db", db);

    server.addHook("onClose", async (instance) => {
      await instance.db.destroy();
    });
  },
  { name: "db" }
);
