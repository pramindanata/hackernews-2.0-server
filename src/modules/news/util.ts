import { Joi } from 'celebrate'

export const getWebFromUrl = (url: string): string => {
  return url
}

export const schema = {
  getOne: {
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
