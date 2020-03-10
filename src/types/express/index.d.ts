declare namespace Express {
  interface Request {
    ctx: import('../../interface').RequestContext
  }

  interface Response {
    boom: import('../../interface').Boom
  }
}
