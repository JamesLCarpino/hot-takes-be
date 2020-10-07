// Update with your config settings.
var dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

module.exports = {
  development: {
    client: "pg",

    connection: process.env.DATABASE_URL,

    migrations: {
      directory: "./database/migrations",
    },
    seeds: {
      directory: "./database/seeds",
    },

    pool: {
      min: 2,
      max: 10,
    },
  },

  test: {
    client: "pg",

    connection: process.env.DATABASE_URL,
    migrations: {
      filename: "./database/migrations",
    },
    seed: {
      directory: "./database/seeds",
    },
  },

  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: { directory: "./database/migrations" },
    seeds: { directory: "./database/seeds" },
  },
};
