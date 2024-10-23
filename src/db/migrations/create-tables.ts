import { Knex } from "knex";

export async function up(knex: Knex) {
  await knex.schema.createTable("tribes", (table) => {
    table.increments("id").primary();
    table.text("name").notNullable();
    table.text("department").notNullable();
  });
  
  await knex.schema.createTable("employees", (table) => {
    table.increments("id").primary();
    table.text('name').notNullable();
    table.text("title").notNullable();
    table
      .integer("tribe_id")
      .index()
      .unsigned()
      .references("id").inTable("tribes");
  });


}
export async function down(knex: Knex) {
  await knex.schema.dropTable("employees");
  await knex.schema.dropTable("tribes");
}
