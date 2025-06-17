import * as dotenv from "dotenv";
import { ConnectionConfig } from "pg";

dotenv.config();

export interface Config {
  readonly database: ConnectionConfig;
}

export const config: Config = Object.freeze({
  database: Object.freeze({
    database: getEnvVariable("POSTGRES_DB"),
    host: getEnvVariable("POSTGRES_HOST"),
    user: getEnvVariable("POSTGRES_USER"),
    password: getEnvVariable("POSTGRES_PASSWORD"),
  }),
});

function getEnvVariable(name: string): string {
  if (!process.env[name]) {
    throw new Error(`environment variable ${name} not found`);
  }

  return process.env[name]!;
}
