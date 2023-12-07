import uuid from 'uuid/v4.js'
function primeRequestContext (req, res, next) {
req.context = {
  traceId: uuid()
  }
 next()
}
export default primeRequestContext
