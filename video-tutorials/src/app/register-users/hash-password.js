import bcrypt from 'bcrypt'

const SALT_ROUNDS = 10

function hashPassword(context) {
    return bcrypt.hash(context.attributes.password, SALT_ROUNDS)
    .then(passwordHash => {
        context.passwordHash = passwordHash
        return context
    })
}

export default hashPassword