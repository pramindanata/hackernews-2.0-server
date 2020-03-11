import { Joi } from 'celebrate'

export const schema = {
  index: {
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
  show: {
    params: Joi.object({
      id: Joi.number().required(),
    }),
  },
  store: {
    body: Joi.object({
      title: Joi.string().required(),
      url: Joi.string()
        .uri()
        .required(),
    }),
  },
  update: {
    params: Joi.object({
      id: Joi.number().required(),
    }),
    body: Joi.object({
      title: Joi.string().required(),
      url: Joi.string()
        .uri()
        .required(),
    }),
  },
  delete: {
    params: Joi.object({
      id: Joi.number().required(),
    }),
  },
}
