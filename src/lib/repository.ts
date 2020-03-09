import { Connection } from 'typeorm'
import * as I from '~/interface'
import News from '~/model/News'

export function init(con: Connection): I.DBRepository {
  const news = con.getRepository(News)

  return {
    news,
  }
}

export default {
  init,
}
