const writeFunctionSql = 'SELECT message_store.write_message($1,$2,$3,$4,$5,$6)'
import VersionConflictError from './version-conflict-error.js'
const VersionConflictErrorRegex = /^Wrong.*Stream Version: (\d+)\)/
function createWrite( {db} ){
    return (streamName, message, expectedVersion)=>{
      if( !message.type ){
        throw new Error('Message must have a type')
      }
      const values = [
        message.id,
        streamName,
        message.type,
        message.data,
        message.metadata,
        expectedVersion
      ]
      return db.query(writeFunctionSql,values)
          .catch(err => {
            const errorMatch = err.message.match(VersionConflictErrorRegex)
            const notVersionConflict = errorMatch === null
            if(notVersionConflict){
              throw err
            }
            const actualVersion = parseInt(errorMatch[1], 10)
            const versionConflictError = new VersionConflictError(
              streamName,
              actualVersion,
              expectedVersion
            )
          versionConflictError.stack = err.stack
          throw versionConflictError
          })
    }
}

export default createWrite
