import { uuid } from 'uuid'
function writeRegisterCommand(context) {
    const userId = context.attributes.userId
    const stream = `identity:command-${userId}`
    const command = {
        id: uuid(),
        type: 'Register',
        metadata: {
            traceId: context.traceId,
            userId
        },
        data:{
            userId,
            email: context.attributes.email,
            passwordHash: context.attributes.passwordHash
        }
    }
    return context.messageStore.write(stream, command)
}
export default writeRegisterCommand