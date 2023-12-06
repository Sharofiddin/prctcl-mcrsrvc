const express = require('express')
const { join } = require('path')

const mountMiddleware = require('./mount-middleware')


function createExpressApp ({ config, env }) { // (1)
  const app = express() // (2)

  // Configure PUG
  app.set('views', join(__dirname, '..')) // (3)
  app.set('view engine', 'pug')

  mountMiddleware(app, env) // (4)


  return app
}

module.exports = createExpressApp
