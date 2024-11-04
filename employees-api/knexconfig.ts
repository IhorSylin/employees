export default {
  development: {
    client: "mysql2",
    version: "8.0",
    migrations: {
      directory: "./src/db/migrations",
    },
    seeds: {
      directory: "./src/db/seeds",
    },
    connection: {
      host: "localhost",
      user: "root",
      password: "password",
      database: "posts",
      charset: "utf8",
    },
  },
  production: {
    client: "mysql2",
    version: "8.0",
    migrations: {
      directory: "./src/db/migrations",
    },
    seeds: {
      directory: "./src/db/seeds",
    },
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      charset: "utf8",
    },
  },
  test: {
    client: "sqlite3",
    connection: { filename: ":memory:" },
    useNullAsDefault: true,
  },
};
