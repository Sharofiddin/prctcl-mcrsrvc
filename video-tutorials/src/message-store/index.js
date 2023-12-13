import createWrite from "./write.js";
import createRead from "./read.js";
import configureCreateSubscription from "./subscribe.js";
function createMessageStore({ db }) {
  const read = createRead({ db });
  const write = createWrite({ db });
  const createSubscription = configureCreateSubscription({
    read: read.read,
    readLastMessage: read.readLastMessage,
    write: write,
  })
  return {
    write: write,
    createSubscription,
    read: read,
    readLastMessage: read.readLastMessage,
  }
}

export default createMessageStore;
