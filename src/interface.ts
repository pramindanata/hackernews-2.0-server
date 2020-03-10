import { Repository } from 'typeorm'
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
}

export interface JoiErrorMessages {
  [key: string]: string[]
}
