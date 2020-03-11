import { Connection } from 'typeorm'
import * as I from '~/interface'

import News from '~/model/News'
import User from '~/model/User'
import Vote from '~/model/Vote'

export function init(con: Connection): I.DBRepository {
  const news = con.getRepository(News)
  const user = con.getRepository(User)
  const vote = con.getRepository(Vote)

  return {
    news,
    user,
    vote,
  }
}

export default {
  init,
}
