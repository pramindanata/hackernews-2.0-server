import Joi from '@hapi/joi'
import * as I from '~/interface'
import string from '~/lib/joi/extension/string'

export const config = {
  abortEarly: false,
  convert: true,
}

const custom: I.CustomJoi = Joi.defaults(schema => schema.options(config)).extend(string)

export default custom
