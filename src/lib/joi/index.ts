import Joi, { ValidationError } from '@hapi/joi'
import * as I from '~/interface'
import string from '~/lib/joi/extension/string'

export const config = {
  abortEarly: false,
  convert: true,
}

export const getMessages = (error: ValidationError): I.JoiErrorMessages => {
  const messages: I.JoiErrorMessages = error.details.reduce((prev: I.JoiErrorMessages, cur) => {
    const key: string = cur.path.join('.')

    if (prev[key] == null) {
      prev[key] = []
    } else {
      return prev
    }

    prev[key].push(cur.message)

    return prev
  }, {})

  return messages
}

const custom: I.CustomJoi = Joi.defaults(schema => schema.options(config)).extend(string)

export default custom
