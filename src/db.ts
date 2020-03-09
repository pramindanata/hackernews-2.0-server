import { createConnection } from 'typeorm'
import config from '~/config'
import News from '~/model/News'

const entities = [News]
const { db } = config
const connection = createConnection({
  type: 'postgres',
  host: db.host,
  port: +db.port,
  username: db.username,
  password: db.password,
  database: db.database,
  synchronize: true,
  logging: ['error'],
  entities,
})

export default connection
