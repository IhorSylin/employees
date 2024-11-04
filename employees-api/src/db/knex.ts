import knex from "knex";
import knexConfig from "../../knexconfig";

type envType = "development" | "production";
const env = (process.env.ENVIRONMENT as envType) ?? "development";

export default function getKnexInstance() {
  console.log("💾 db connection initialized....");
  console.log(`db environment: ${env}`);

  const config = knexConfig[env];
  const knexInstance = knex(config);

  return knexInstance;
}
