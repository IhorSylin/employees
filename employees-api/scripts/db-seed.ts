import getKnexInstance from "../src/db/knex";

async function seedDatabase() {
  const knexInstance = getKnexInstance();
  await knexInstance.seed.run();

  console.log("✅ database seeded");
  process.exit(0);
}

seedDatabase();
