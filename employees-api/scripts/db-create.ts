import knex from "knex";
import knexConfig from "../knexconfig";

type envType = "development" | "production";
const env = (process.env.ENVIRONMENT as envType) ?? "development";

async function createDatabase() {
  const config = knexConfig[env];

  // @ts-ignore
  const dbName = config.connection.database;
  // @ts-ignore
  config.connection.database = undefined;

  const knexInstance = knex(config);
  await knexInstance.raw("CREATE DATABASE employees");
  console.log("✅ Database created");
  process.exit();
}

createDatabase();
