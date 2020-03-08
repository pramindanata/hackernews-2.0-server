import 'module-alias/register'
import 'reflect-metadata'
import dotenv from 'dotenv'
import express from 'express'
import bodyParser from 'body-parser'
import helmet from 'helmet'

dotenv.config()

import config from '~/config'

const app = express()

app.use(helmet())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  return res.json({
    msg: 'Hello',
  })
})

app.listen(config.app.port, () => {
  console.log(`Server listening on http://localhost:${config.app.port}`)
})
