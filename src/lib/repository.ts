import { Connection } from 'typeorm'
import * as I from '~/interface'

import News from '~/model/News'
import User from '~/model/User'

export function init(con: Connection): I.DBRepository {
  const news = con.getRepository(News)
  const user = con.getRepository(User)

  return {
    news,
    user,
  }
}

export default {
  init,
}
