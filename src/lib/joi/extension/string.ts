import { Root, Extension } from '@hapi/joi'

export default (Joi: Root): Extension => {
  return {
    type: 'string',
    base: Joi.string(),
    messages: {
      'string.alphaDash': '{{#label}} may only contain alpha-numeric characters as well as dashes and underscores',
    },
    rules: {
      alphaDash: {
        method(): any {
          return this.$_addRule({
            name: 'alphaDash',
          })
        },
        validate(value, helpers): any {
          const alphaDashRegex = /^[a-zA-Z0-9-_]+$/

          if (alphaDashRegex.test(value)) {
            return value
          } else {
            return helpers.error('string.alphaDash')
          }
        },
      },
    },
  }
}
