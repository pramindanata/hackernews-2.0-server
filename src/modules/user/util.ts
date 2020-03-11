import Joi from '@hapi/joi'

export const schema = {
  index: {
    query: Joi.object({
      search: Joi.string()
        .optional()
        .empty(''),
      sort: Joi.string()
        .valid('username', 'join')
        .default('join'),
      order: Joi.string()
        .uppercase()
        .valid('ASC', 'DESC')
        .default('DESC'),
      limit: Joi.number()
        .min(0)
        .max(15)
        .default(10),
      skip: Joi.number()
        .min(0)
        .default(0),
    }),
  },
  show: {
    params: Joi.object({
      id: Joi.number().required(),
    }),
  },
}
