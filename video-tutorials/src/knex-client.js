import bluebird from "bluebird";
import knex from "knex";
const { resolve } = bluebird;
async function createKnexClient({ connectionString, migrationsTableName }) {
  const client = knex(connectionString);

  const migrationOptions = {
    tableName: migrationsTableName || "knex_migrations",
  };

  // Wrap in Bluebird.resolve to guarantee a Bluebird Promise down the chain
  await resolve(client.migrate.latest(migrationOptions));
    return client;
}

export default createKnexClient;
