import { Repository } from 'typeorm'
import News from '~/model/News'
import Boom from '~/lib/Boom'

export { News, Boom }

export interface DBRepository {
  news: Repository<News>
}

export interface RequestContext {
  repo: DBRepository
}
