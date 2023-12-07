import createKnexClient from "./knex-client.js";
import createHomeApp from "./app/home/index.js";
import camelcaseKeys from "camelcase-keys";
import createRecordViewingsApp from './app/record-viewings/index.js'
function createConfig({ env }) {
  console.log("dbUrl: " + env.databaseUrl)
  const db = createKnexClient({
    connectionString: env.databaseUrl,
  });
  const homeApp = createHomeApp({ db });
  const recordViewingsApp = createRecordViewingsApp({db})
  return {
    // ...
    db,
    homeApp,
    recordViewingsApp
  };
  
}
export default createConfig;
