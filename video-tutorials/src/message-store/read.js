import Bluebird from 'bluebird'
import deserializeMessage from './deserialize-message.js'
const getLastMessageSql = 'SELECT * FROM get_last_stream_message($1)'
const getStreamMessagesSql ='SELECT * FROM get_stream_messages($1,$2,$3)'
const getCategoryMessagesSql = 'SELECT * FROM get_category_messages($1,$2,$3)'

function project(events, projection) {
    return events.reduce((entity, event) => {
        if(!projection[entity.type]){
            return entity
        }
        return projection[entity.type](entity,event)
    }, projection.$init())
}
function createRead({db}){
    function readLastMessage(streamName) {
        return db.query(getLastMessageSql, [streamName]).then(res => deserializeMessage(res.rows[0]))
    }

    function read(streamName, fromPosition = 0, maxMessages = 1000) {
        let query = null
        let values =[]
    
        if (streamName.includes('-')){
            query = getStreamMessagesSql
        } else {
            query = getCategoryMessagesSql;
        }
        values = [streamName, fromPosition, maxMessages]
        return db.query(query,values).then(res=>res.rows.map(deserializeMessage))
    }

    function fetch(streamName, projection) {
        return read(streamName).then(messages => project(messages, projection))
    }


    return {
        read,
        readLastMessage,
        fetch
    }
}

export default createRead