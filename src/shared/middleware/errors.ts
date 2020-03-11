import { Request, Response, NextFunction } from 'express'
import { isCelebrate, CelebrateInternalError } from 'celebrate'
import { JsonWebTokenError } from 'jsonwebtoken'
import { getMessages } from '~/lib/joi'

export default () => (err: any, req: Request, res: Response, next: NextFunction): void | Response => {
  if (isCelebrate(err)) {
    const { joi, meta }: CelebrateInternalError = err
    const messages = getMessages(joi)

    return res.boom.badData({
      [meta.source]: messages,
    })
  }

  if (err instanceof JsonWebTokenError) {
    return res.boom.forbidden('Invalid token given')
  }

  next(err)
}
