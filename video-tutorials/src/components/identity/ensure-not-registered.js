import AlreadyRegisteredError from './already-registered-error.js'

function ensureNotRegistered(context){
    console.log(context.identity)
    if(context.identity.isRegistered){
        throw new AlreadyRegisteredError()
    }
    return context
}

export default ensureNotRegistered