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

export const autoConfig = (fastify: FastifyInstance) => {
  return {
    clientID: fastify.config.GOOGLE_CLIENT_ID,
    clientSecret: fastify.config.GOOGLE_CLIENT_SECRET,
    callbackURL: fastify.config.GOOGLE_CALLBACK_URL,
  };
};

export default fp<StrategyOptions>(
  async (fastify, opts) => {
    const fastifyPassport = new Authenticator();

    fastify.register(fastifyPassport.initialize());
    fastify.register(fastifyPassport.secureSession());

    fastifyPassport.use(
      "google",
      new GoogleStrategy(opts, (_accessToken, _refreshToken, profile, cb) => {
        cb(undefined, profile);
      })
    );

    fastifyPassport.registerUserDeserializer(async (user: User, _request) => {
      return user;
    });

    fastifyPassport.registerUserSerializer<GoogleProfile, User>(
      async (user, _request) => {
        const { id, emails, displayName } = user;
        return { id, displayName, email: emails?.[0]?.value ?? "" };
      }
    );

    fastify.decorate("passport", fastifyPassport);
  },
  { name: "passport", dependencies: ["session"] }
);
