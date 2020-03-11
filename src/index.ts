import 'module-alias/register'
import 'reflect-metadata'
import dotenv from 'dotenv'
import express from 'express'
import bodyParser from 'body-parser'
import helmet from 'helmet'

dotenv.config()

import config from '~/config'
import db from '~/db'
import modules from '~/modules'
import * as I from '~/interface'
import Boom from '~/lib/Boom'
import repository from '~/lib/repository'
import { getUserFromReq } from '~/util/auth'
import errors from '~/shared/middleware/errors'

const app = express()

db.then(con => {
  app.use(helmet())
  app.use(bodyParser.json())
  app.use('/static', express.static(config.app.public))

  // Set context
  app.use(async (req, res, next) => {
    req.ctx = {
      repo: repository.init(con),
    }
    res.boom = new Boom(res)

    try {
      const user: I.User | undefined = await getUserFromReq(req)
      req.ctx.user = user
    } catch (err) {
      next(err)
    }

    next()
  })

  // Register modules
  app.use(modules)
  app.use(errors())

  app.listen(config.app.port, () => {
    console.log(`Server listening on http://localhost:${config.app.port}`)
  })
})
