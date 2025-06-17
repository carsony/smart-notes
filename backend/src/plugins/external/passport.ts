import fp from "fastify-plugin";
import { FastifyInstance } from "fastify";
import { Authenticator } from "@fastify/passport";
import {
  Strategy as GoogleStrategy,
  StrategyOptions,
} from "passport-google-oauth20";

import { User } from "@/schemas/auth.js";
import { Database, InsertableUserRow, UserRow } from "@/types/database.js";
import { Kysely } from "kysely";

declare module "fastify" {
  interface FastifyInstance {
    passport: Authenticator;
  }
}

async function findUserById(
  db: Kysely<Database>,
  id: string
): Promise<UserRow | undefined> {
  const user = await db
    .selectFrom("user")
    .where("user_id", "=", id)
    .selectAll("user")
    .executeTakeFirst();

  return user;
}

async function insertUser(
  db: Kysely<Database>,
  user: InsertableUserRow
): Promise<UserRow> {
  const insertedUser = await db
    .insertInto("user")
    .values(user)
    .returningAll()
    .executeTakeFirstOrThrow();

  return insertedUser;
}

function userRowtoUser(user: UserRow): User {
  return {
    id: user.user_id,
    name: user.name,
    email: user.email,
  };
}

export const autoConfig = (fastify: FastifyInstance) => {
  return {
    clientID: fastify.config.GOOGLE_CLIENT_ID,
    clientSecret: fastify.config.GOOGLE_CLIENT_SECRET,
    callbackURL: fastify.config.GOOGLE_CALLBACK_URL,
  };
};

export default fp<StrategyOptions>(
  async (fastify, opts) => {
    const { db } = fastify;
    const fastifyPassport = new Authenticator();

    fastify.register(fastifyPassport.initialize());
    fastify.register(fastifyPassport.secureSession());

    fastifyPassport.use(
      "google",
      new GoogleStrategy(
        opts,
        async (_accessToken, _refreshToken, profile, cb) => {
          const { id } = profile;
          const user = await findUserById(db, id);

          if (!user) {
            const userRow = await insertUser(db, {
              user_id: profile.id,
              name: profile.displayName,
              email: profile.emails?.[0]?.value ?? "",
            });
            return cb(null, userRowtoUser(userRow));
          } else {
            return cb(null, userRowtoUser(user));
          }
        }
      )
    );

    fastifyPassport.registerUserDeserializer(async (id: string, _request) => {
      const user = await findUserById(db, id);
      if (user) {
        return userRowtoUser(user);
      }
      return null;
    });

    fastifyPassport.registerUserSerializer(async (user: User, _request) => {
      return user.id;
    });

    fastify.decorate("passport", fastifyPassport);
  },
  { name: "passport", dependencies: ["session", "db"] }
);
