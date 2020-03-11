import path from 'path'

const env = process.env

export default {
  app: {
    port: env.APP_PORT || 4000,
    public: path.join(__dirname, 'public'),
    secretKey: env.APP_SECRET_KEY || 'secret',
  },
  db: {
    host: env.DB_HOST || 'localhost',
    port: env.DB_PORT || 5432,
    username: env.DB_USERNAME || 'postgres',
    password: env.DB_PASSWORD || '',
    database: env.DB_NAME || 'hackernews',
  },
}
