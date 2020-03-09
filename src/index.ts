import 'module-alias/register'
import 'reflect-metadata'
import dotenv from 'dotenv'
import express from 'express'
import bodyParser from 'body-parser'
import helmet from 'helmet'

dotenv.config()

import config from '~/config'
import db from '~/db'
import repository from '~/lib/repository'
import modules from '~/modules'

const app = express()

db.then(con => {
  app.use(helmet())
  app.use(bodyParser.json())

  // Set context
  app.use((req, res, next) => {
    req.ctx = {
      repo: repository.init(con),
    }

    next()
  })

  // Register modules
  app.use(modules)

  app.listen(config.app.port, () => {
    console.log(`Server listening on http://localhost:${config.app.port}`)
  })
})
