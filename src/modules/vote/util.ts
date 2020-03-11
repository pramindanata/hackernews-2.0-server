import Joi from '@hapi/joi'

export const schema = {
  store: {
    params: Joi.object({
      newsId: Joi.number().required(),
    }),
  },
  delete: {
    params: Joi.object({
      newsId: Joi.number().required(),
    }),
  },
}
