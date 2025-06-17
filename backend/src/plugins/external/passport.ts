import fp from "fastify-plugin";
import { FastifyInstance } from "fastify";
import { Authenticator } from "@fastify/passport";
import {
  type Profile as GoogleProfile,
  Strategy as GoogleStrategy,
  StrategyOptions,
} from "passport-google-oauth20";
import { User } from "@/types/auth.js";

declare module "fastify" {
  interface FastifyInstance {
    passport: Authenticator;
  }

  interface PassportUser extends User {}
}

export const autoConfig = (server: FastifyInstance) => {
  return {
    clientID: server.config.GOOGLE_CLIENT_ID,
    clientSecret: server.config.GOOGLE_CLIENT_SECRET,
    callbackURL: server.config.GOOGLE_CALLBACK_URL,
  };
};

export default fp<StrategyOptions>(
  async (server, opts) => {
    const fastifyPassport = new Authenticator();

    server.register(fastifyPassport.initialize());
    server.register(fastifyPassport.secureSession());

    fastifyPassport.use(
      "google",
      new GoogleStrategy(opts, (_accessToken, _refreshToken, profile, cb) => {
        cb(undefined, profile);
      })
    );

    fastifyPassport.registerUserDeserializer(async (user: User, req) => {
      return user;
    });

    fastifyPassport.registerUserSerializer<GoogleProfile, User>(
      async (user, _req) => {
        const { id, emails, displayName } = user;
        return { id, displayName, email: emails?.[0]?.value ?? "" };
      }
    );

    server.decorate("passport", fastifyPassport);
  },
  { name: "passport", dependencies: ["session"] }
);
