import ValidationError from "../errors/validation-error";

function ensureThereWasNoExistingIdentity(context) {
    if(context.existingIdentity){
        throw new ValidationError({email: ['already taken']})
    }
    return context
}

export default ensureThereWasNoExistingIdentity