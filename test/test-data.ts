import { FastifyInstance } from "fastify";

const EMPLOYEES_TABLE = "employees";
const TRIBES_TABLE = "tribes";

export async function generateTestDb(fastify: FastifyInstance) {
  console.log("Db")
  await createDb(fastify);
  await generateData(fastify);
}

export async function destroyTestDb(fastify: FastifyInstance) {
  await fastify.tars.schema.dropTable(EMPLOYEES_TABLE);
  await fastify.tars.schema.dropTable(TRIBES_TABLE);
}

export async function createDb(fastify: FastifyInstance) {
  await fastify.tars.schema.createTable(TRIBES_TABLE, (table) => {
    table.increments("id").primary();
    table.text("tribe_name").notNullable();
    table.text("department").notNullable();
  });

  await fastify.tars.schema.createTable(EMPLOYEES_TABLE, (table) => {
    table.increments("id").primary();
    table.text('employee_name').notNullable();
    table.text("title").notNullable();
    table
      .integer("tribe_id")
      .index()
      .unsigned()
      .references("id").inTable("tribes");
  });
}

export async function generateData(fastify: FastifyInstance) {
  const tribesSeedData = [
    { tribe_name: "Internstellar", department: "Other Engineering" },
    { tribe_name: "Billing", department: "Product Platform" },
    { tribe_name: "Gears", department: "Product Platform" },
  ];

  const employeesSeedData = [
    { employee_name: "Cooper", title: "Software Engineer", tribe_id: 1 },
    { employee_name: "Murph", title: "Software Engineer", tribe_id: 1 },
    { employee_name: "TARS", title: "Designer", tribe_id: 1 },
    { employee_name: "The Bride", title: "Software Engineer", tribe_id: 2 },
    { employee_name: "Pai Mei", title: "EM", tribe_id: 2 },
    { employee_name: "Bill", title: "PM", tribe_id: 2 },
    { employee_name: "Hattori Hanzo", title: "DevOps Engineer", tribe_id: 2 },
    { employee_name: "Jeremy Clarkson", title: "Software Engineer", tribe_id: 3 },
    { employee_name: "Richard Hammond", title: "Designer", tribe_id: 3 },
    { employee_name: "James May", title: "DevOps Engineer", tribe_id: 3 },
  ];

  await fastify.tars.from(TRIBES_TABLE).insert(tribesSeedData);
  await fastify.tars.from(EMPLOYEES_TABLE).insert(employeesSeedData);
}