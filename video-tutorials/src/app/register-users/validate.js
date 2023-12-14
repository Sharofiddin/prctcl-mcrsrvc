import { validate } from "validate.js";

import ValidationError from '../errors/validation-error.js'

const constraints ={
  email :{
    email: true,
    presence: true
  },
  password: {
    length: {minimum: 8},
    presence: true
  }
}

function v (context) {
    const validationErrors = validate(context.attributes, constraints)
    if (validationErrors){
        throw new ValidationError(validationErrors)
    }
    return context
}

export default v
