import createWrite from './write.js'

function createMessageStore({db}){
    const write = createWrite({db})
    return {write:write}
}

export default createMessageStore