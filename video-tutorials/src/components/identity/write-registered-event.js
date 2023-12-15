import uuid from 'uuid'
function writeRegisteredEvent(context, err) {
    const command = context.command
    const registeredEvent = {
        id: uuid(),
        type: 'Registered',
        data: {
            userId: command.data.userId,
            email: command.data.email,
            passwordHash: command.data.passwordHash
        },
        metadata: {
            traceId: command.metadata.traceId,
            userId :command.metadata.userId
        }
    }
    const identityStreamName = `identity-${command.data.userId}`

    return context.messageStore.write(identityStreamName, registeredEvent).then(() => context)
}

export default writeRegisteredEvent