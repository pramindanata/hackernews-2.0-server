import { Response } from 'express'
import { Request } from 'express-serve-static-core'
import parseDomain from 'parse-domain'
import { SelectQueryBuilder } from 'typeorm'
import * as RI from '~/interface'
import * as I from './interface'

class Controller {
  async index(req: Request, res: Response): Promise<Response> {
    const { query }: { query: I.IndexQuery } = req
    const { user } = req.ctx
    const sortKey = query.sort === 'published' ? 'news.createdAt' : '"voteCount"'
    let newsQryBuilder: SelectQueryBuilder<RI.News> = req.ctx.repo.news.createQueryBuilder('news')

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
      .skip(query.skip)
      .take(query.limit)
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

  async show(req: Request<I.GetOneParams>, res: Response): Promise<Response> {
    const { params } = req
    const news: RI.News | undefined = await req.ctx.repo.news.findOne(params.id, {
      relations: ['user'],
    })

    if (!news) {
      return res.boom.notFound()
    }

    return res.json({
      id: news.id,
      title: news.title,
      domain: news.domain,
      url: news.url,
      user: { id: news.user.id, username: news.user.username },
      createdAt: news.createdAt,
    })
  }

  async store(req: Request<any, any, I.StoreBody>, res: Response): Promise<Response> {
    const { body } = req
    const parsedDomain = parseDomain(body.url)
    const news = req.ctx.repo.news.create({
      title: body.title,
      url: body.url,
      domain: `${parsedDomain?.domain}.${parsedDomain?.tld}`,
      user: { id: req.ctx.user?.id },
    })

    await req.ctx.repo.news.save(news)

    return res.json({
      data: {
        id: news.id,
        title: news.title,
        domain: news.domain,
        url: news.url,
        createdAt: news.createdAt,
      },
    })
  }

  async update(req: Request<I.UpdateParams, any, I.UpdateBody>, res: Response): Promise<Response> {
    const { params, body } = req
    const news: RI.News | undefined = await req.ctx.repo.news.findOne(params.id)

    if (!news) {
      return res.boom.notFound()
    }

    if (news.userId !== req.ctx.user?.id) {
      return res.boom.forbidden()
    }

    const parsedDomain = parseDomain(body.url)
    const updated = await req.ctx.repo.news.save({
      ...news,
      title: body.title,
      url: body.url,
      domain: `${parsedDomain?.domain}.${parsedDomain?.tld}`,
    })

    return res.json({
      data: {
        id: updated.id,
        title: updated.title,
        domain: updated.domain,
        url: updated.url,
        createdAt: updated.createdAt,
      },
    })
  }

  async delete(req: Request<I.DeleteParams>, res: Response): Promise<Response> {
    const { params } = req
    const news: RI.News | undefined = await req.ctx.repo.news.findOne(params.id)

    if (!news) {
      return res.boom.notFound()
    }

    if (news.userId !== req.ctx.user?.id) {
      return res.boom.forbidden()
    }

    await req.ctx.repo.news.delete(news.id)

    return res.json({
      id: news.id,
      title: news.title,
      domain: news.domain,
      url: news.url,
      createdAt: news.createdAt,
    })
  }
}

export default Controller
