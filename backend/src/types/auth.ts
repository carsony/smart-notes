import { Static, Type } from "@sinclair/typebox";
import { EmailSchema, IdSchema, StringSchema } from "./common.js";

export interface Email {
  value: string;
}

export const UserSchema = Type.Object(
  {
    id: IdSchema,
    displayName: StringSchema,
    email: EmailSchema,
  },
  { $id: "User" }
);

export type User = Static<typeof UserSchema>;
