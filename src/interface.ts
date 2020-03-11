import { Repository } from 'typeorm'
import { Root as JoiRoot, StringSchema } from '@hapi/joi'
import News from '~/model/News'
import User from '~/model/User'
import Boom from '~/lib/Boom'

export { User, News, Boom }

export interface DBRepository {
  news: Repository<News>
  user: Repository<User>
}

export interface RequestContext {
  repo: DBRepository
  user?: User
}

export interface JoiErrorMessages {
  [key: string]: string[]
}

interface JoiStringSchema extends StringSchema {
  alphaDash(): this
}

export interface CustomJoi extends JoiRoot {
  string: () => JoiStringSchema
}

export interface JWTPayload {
  sub: number
  iat: number
}
