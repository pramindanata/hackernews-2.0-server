import { RequestHandler, Request, Response, NextFunction } from 'express'
import { celebrate, SchemaOptions, isCelebrate, CelebrateInternalError } from 'celebrate'
import { BaseValidationOptions, ValidationError } from '@hapi/joi'
import { config } from '~/lib/joi'

import * as I from '~/interface'

function getMessages(error: ValidationError): I.JoiErrorMessages {
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

export default (schema: SchemaOptions): RequestHandler => {
  const joiOpt: BaseValidationOptions = config

  return celebrate(schema, joiOpt)
}

export const errors = () => (err: any, req: Request, res: Response, next: NextFunction): Response => {
  if (!isCelebrate(err)) {
    next(err)
  }

  const { joi, meta }: CelebrateInternalError = err
  const messages = getMessages(joi)

  return res.boom.badData({
    [meta.source]: messages,
  })
}
