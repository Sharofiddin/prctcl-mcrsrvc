import Bluebird from 'bluebird'
import uuid from 'uuid'
function configureCreateSubscription({read, readLastMessage, write}) {
    return ({
        streamName,
        handlers,
        messagePerTick = 100,
        subscriberId,
        positionUpdateInterval = 100,
        tickIntervalMs = 100
    }) => {
       const subscriberStreamName = `subscriberPosition-${subscriberId}`
       let currentPosition = 0
       let messageSinceLastPositionWrite = 0
       let keepGoing = true

       function start() {
        console.log(`Started ${subscriberId}`)
        return poll()
    }
    
    function stop() {
        console.log(`Stopped ${subscriberId}`)
        keepGoing = false
    }
    
    function loadPosition(){
        return readLastMessage(subscriberStreamName).then(message=>{
            currentPosition = message ? message.data.position : 0
        })
    }

    function updateReadPosition(position){
        currentPosition = position
        messageSinceLastPositionWrite += 1
        if( messageSinceLastPositionWrite === positionUpdateInterval){
            messageSinceLastPositionWrite = 0
            return writePosition(position)
        }
        return Bluebird.resolve(true)
    }

    function writePosition(position){
        const positionEvent = {
            id: uuid(),
            type: 'Read',
            data: {position}
        }
        return write(subscriberStreamName, positionEvent)
    }
    function getNextBatchOfMessages(){
        return read(streamName, currentPosition+1, messagePerTick)
    }
    function processBatch(messages){
       return  Bluebird.each(messages, message => 
            handleMessage(message)
            .then(()=> updateReadPosition(message.globalPosition))
            .catch(err => {
                logError(message, err)
                throw err
            })).then(()=>messages.length)
    }
    function handleMessage(message) {
        const handler = handlers[message.type] || handlers.$any
        return handler ? handler(message) : Promise.resolve(true)
    }
    async function poll(){
        await loadPosition()
        while (keepGoing) {
            const messagesProcessed = await tick()
            if (messagesProcessed === 0){
                await Bluebird.delay(tickIntervalMs)
            }
        }
    }
    
    function tick() {
        return getNextBatchOfMessages()
          .then(processBatch)
          .catch(err => {
            console.error('Error processing batch', err)
            stop()
          })
    }
    function logError (lastMessage, error) {
        // eslint-disable-next-line no-console
        console.error(
          'error processing:\n',
          `\t${subscriberId}\n`,
          `\t${lastMessage.id}\n`,
          `\t${error}\n`
        )
      }

       return {
        loadPosition,
        start, 
        stop,
        tick,
        writePosition
       }
    }
}

export default configureCreateSubscription