import Bluebird from "bluebird";
import loadIdentity from "./load-identity.js";
import ensureNotRegistered from "./ensure-not-registered.js";
import writeRegisteredEvent from "./write-registered-event.js";
import AlreadyRegisteredError from "./already-registered-error.js";


function createIdentityCommandHandlers({ messageStore }) {
    return {
        Register: command => {
            const context = {
                messageStore: messageStore,
                command,
                identityId: command.data.userId
            }
            return Bluebird.resolve(context)
            .then(loadIdentity)
            .then(ensureNotRegistered)
            .then(writeRegisteredEvent)
            .catch(AlreadyRegisteredError, () => {})
        }
    }
}
function build({ messageStore }) {
  const identityCommandHandlers = createIdentityCommandHandlers({
    messageStore,
  });
  const identityCommandSubscription = messageStore.createSubscription({
    streamName: "identity:command",
    handlers: identityCommandHandlers,
    subscriberId: "components:identity:command",
  });
  function start() {
    identityCommandSubscription.start();
  }

  return {
    identityCommandHandlers,
    start,
  };
}

export default build;
