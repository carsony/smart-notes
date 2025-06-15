import { Type } from "@sinclair/typebox";

export const EmailSchema = Type.String({
  format: "email",
  minLength: 1,
  maxLength: 255,
});

export const IdSchema = Type.String({ maxLength: 255 });

export const StringSchema = Type.String({
  minLength: 1,
  maxLength: 255
})