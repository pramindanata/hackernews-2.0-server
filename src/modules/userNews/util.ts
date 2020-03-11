import { Joi } from 'celebrate'

export const schema = {
  index: {
    params: Joi.object({
      userId: Joi.number().required(),
    }),
    query: Joi.object({
      search: Joi.string()
        .optional()
        .empty(''),
      sort: Joi.string()
        .valid('published', 'vote')
        .default('published'),
      order: Joi.string()
        .uppercase()
        .valid('ASC', 'DESC')
        .default('DESC'),
      limit: Joi.number()
        .min(0)
        .max(15)
        .default(10),
      offset: Joi.number()
        .min(0)
        .default(0),
    }),
  },
}
