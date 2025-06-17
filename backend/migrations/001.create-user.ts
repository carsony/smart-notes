import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("user")
    .addColumn("user_id", "text")
    .addColumn("name", "text")
    .addColumn("email", "text", (col) => col.unique())
    .addColumn("created_at", "timestamp", (col) => col.defaultTo(sql`NOW()`))
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("user").execute();
}
