import express from 'express'
// import { join } from 'path'
import path from 'path';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import mountMiddleware from './mount-middleware.js'
import mountRoutes from './mount-route.js'

function createExpressApp ({ config, env }) { // (1)
  const app = express() // (2)

  // Configure PUG
  app.set('views', path.join(__dirname, '..')) // (3)
  app.set('view engine', 'pug')

  mountMiddleware(app, env) // (4)
  mountRoutes(app, config)

  return app
}

export default createExpressApp
