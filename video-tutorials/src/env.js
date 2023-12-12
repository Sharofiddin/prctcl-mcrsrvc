import red_cl from 'colors/safe.js';
const { red } = red_cl;
import { config } from 'dotenv'
import packageJson from '../package.json' assert {type:"json"} 


const envResult = config()

if (envResult.error) {
  // eslint-disable-next-line no-console
  console.error(
    `${red('[ERROR] env failed to load:')} ${envResult.error}`
  )

  process.exit(1)
}

function requireFromEnv (key) {
  if (!process.env[key]) {
    console.error(`${red('[APP ERROR] Missing env variable:')} ${key}`)

    return process.exit(1)
  }
  console.log(key + ":" +process.env[key])
  return process.env[key]
}

const appName = requireFromEnv('APP_NAME')
const env = requireFromEnv('NODE_ENV')
const databaseUrl = requireFromEnv('DATABASE_URL')
const port = parseInt(requireFromEnv('PORT'), 10)
const messageStoreConnectionString = requireFromEnv('MESSAGE_STORE_CONNECTION_STRING')
const version = packageJson.version
export default {
 appName,
 env ,
 databaseUrl,
 messageStoreConnectionString,
 port
}

