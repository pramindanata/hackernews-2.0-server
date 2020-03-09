import { Repository } from 'typeorm'
import News from '~/model/News'

export interface DBRepository {
  news: Repository<News>
}

export interface RequestContext {
  repo: DBRepository
}
