import bcrypt from 'bcrypt'

const SALT_ROUNDS = 10

async function hashPassword(context) {
    const passwordHash = await bcrypt.hash(context.attributes.password, SALT_ROUNDS)
    context.attributes.passwordHash = passwordHash
    return context
}

export default hashPassword