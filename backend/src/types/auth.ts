import { Static, Type } from "@sinclair/typebox";
import { EmailSchema, IdSchema, StringSchema } from "./common.js";

export interface Email {
  value: string;
}

export const UserSchema = Type.Object({
  id: IdSchema,
  displayName: StringSchema,
  email: Type.Union([EmailSchema, Type.Null()]),
});

export type User = Static<typeof UserSchema>;
