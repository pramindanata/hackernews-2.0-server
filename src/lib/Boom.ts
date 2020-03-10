import { Response } from 'express'

export default class Boom {
  private res: Response

  constructor(res: Response) {
    this.res = res
  }

  unauthenticate(message?: string): Response {
    const status = 401
    const baseMessage = 'Unauthenticated'

    return this.res.status(status).json({
      code: status,
      message: message || baseMessage,
    })
  }

  forbidden(message?: string): Response {
    const status = 403
    const baseMessage = 'Forbidden'

    return this.res.status(status).json({
      code: status,
      message: message || baseMessage,
    })
  }

  notFound(message?: string): Response {
    const status = 404
    const baseMessage = 'Data not found'

    return this.res.status(status).json({
      code: status,
      message: message || baseMessage,
    })
  }

  badData(data?: any, message?: string): Response {
    const status = 422
    const baseMessage = 'Bad data'

    return this.res.status(status).json({
      code: status,
      message: message || baseMessage,
      data,
    })
  }
}
