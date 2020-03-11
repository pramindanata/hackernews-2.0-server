import { Response } from 'express'
import { Request } from 'express-serve-static-core'
import { SelectQueryBuilder } from 'typeorm'
import * as RI from '~/interface'
import * as I from './interface'

class Controller {
  async index(req: Request<I.IndexParams, any>, res: Response): Promise<Response> {
    const { params } = req
    const query: I.IndexQuery = req.query

    const { user } = req.ctx
    const sortKey = query.sort === 'published' ? 'news.createdAt' : '"voteCount"'
    let newsQryBuilder: SelectQueryBuilder<RI.News> = req.ctx.repo.news
      .createQueryBuilder('news')
      .where('news.userId = :userId', { userId: params.userId })

    if (query.search) {
      const like = `%${query.search}%`

      newsQryBuilder = newsQryBuilder
        .where('news.title ILIKE :title', { title: like })
        .orWhere('news.domain ILIKE :domain', { domain: like })
        .orWhere('news.url ILIKE :url', { url: like })
    }

    const totalQryBuilder = newsQryBuilder

    newsQryBuilder = newsQryBuilder
      .addSelect('COUNT(vote.id)', 'voteCount')
      .leftJoinAndSelect('news.user', 'user')
      .leftJoin('news.votes', 'vote')

    if (user) {
      newsQryBuilder = newsQryBuilder
        .addSelect('COUNT(my_vote.id)', 'upvoted')
        .leftJoin('news.votes', 'my_vote', 'my_vote.userId = :userId', { userId: user?.id })
    }

    const newsPromise: Promise<any[]> = newsQryBuilder
      .offset(query.offset)
      .limit(query.limit)
      .orderBy(sortKey, query.order)
      .groupBy('news.id')
      .addGroupBy('user.id')
      .getRawMany()

    const totalPromise: Promise<number> = totalQryBuilder.getCount()
    const [news, total] = await Promise.all([newsPromise, totalPromise])

    return res.json({
      total,
      data: news.map(raw => ({
        id: raw.news_id,
        title: raw.news_title,
        domain: raw.news_domain,
        url: raw.news_url,
        user: { id: raw.user_id, username: raw.user_username },
        voteCount: +raw.voteCount,
        upvoted: +raw.upvoted > 0 || false,
        createdAt: raw.news_createdAt,
      })),
    })
  }
}

export default Controller
