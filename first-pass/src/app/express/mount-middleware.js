import path from 'path';
import express from 'express';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import attachLocals from './attach-locals.js'
import lastResortErrorHandler from './last-resort-error-handler.js'
import primeRequestContext from './prime-request-context.js'
function mountMiddleware (app, env) {
  app.use(lastResortErrorHandler)
  app.use(primeRequestContext)
  app.use(attachLocals)
  app.use(express.static(path.join(__dirname, '..', 'public'), { maxAge: 86400000 }))
}

export default mountMiddleware
