import fp from "fastify-plugin";
import { FastifyInstance } from "fastify";
import { Authenticator } from "@fastify/passport";
import {
  Strategy as GoogleStrategy,
  StrategyOptions,
} from "passport-google-oauth20";

declare module "fastify" {
  export interface FastifyInstance {
    passport: Authenticator;
  }
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

    fastifyPassport.registerUserDeserializer(async (user, req) => {
      return user;
    });

    fastifyPassport.registerUserSerializer(async (user, req) => {
      return user;
    });

    server.decorate("passport", fastifyPassport);
  },
  { name: "passport", dependencies: ["session"] }
);
