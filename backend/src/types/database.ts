import { Generated, Insertable, Selectable, Updateable } from "kysely";

export interface Database {
  user: UserTable;
}

export interface UserTable {
  user_id: string;
  name: string;
  email: string;
  created_at: Generated<Date>;
}

export type UserRow = Selectable<UserTable>;
export type InsertableUserRow = Insertable<UserTable>;
export type UpdateableUserRow = Updateable<UserTable>;
