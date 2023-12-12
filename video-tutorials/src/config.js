import createKnexClient from "./knex-client.js";
import createHomeApp from "./app/home/index.js";
import createPostgresClient from './postgres-client.js'
import createMessageStore from './message-store/index.js'
import createRecordViewingsApp from './app/record-viewings/index.js'
import createHomePageAggregator from './aggregators/home-page.js'
function createConfig({ env }) {
  console.log("dbUrl: " + env.databaseUrl)
  console.log("msgStoreUrl: " + env.messageStoreConnectionString)
  const knexClient = createKnexClient({
    connectionString: env.databaseUrl,
  });
  const postgresClient = createPostgresClient({
    connectionString: env.messageStoreConnectionString
  })
  const messageStore = createMessageStore({
    db: postgresClient
  })
  const homeApp = createHomeApp({ db:knexClient });
  const recordViewingsApp = createRecordViewingsApp({messageStore})
  const homePageAggregator = createHomePageAggregator({
    db: knexClient,
    messageStore})
  const aggregators = [
    homePageAggregator
  ]
  const components = [

  ]
  return {
    db: knexClient,
    homeApp,
    recordViewingsApp,
    messageStore,
    homePageAggregator,
    aggregators,
    components
  };
  
}
export default createConfig;
