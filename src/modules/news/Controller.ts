import { Response } from 'express'
import { Request } from 'express-serve-static-core'
import parseDomain from 'parse-domain'
import { ILike } from '~/lib/typeorm'
import * as RI from '~/interface'
import * as I from './interface'

class Controller {
  async index(req: Request, res: Response): Promise<Response> {
    const { query }: { query: I.IndexQuery } = req
    const sortKey = 'createdAt'
    let where

    if (query.search) {
      const like = `%${query.search}%`
      where = [{ title: ILike(like) }, { url: ILike(like) }, { domain: ILike(like) }]
    }

    const news: RI.News[] = await req.ctx.repo.news.find({
      where,
      order: {
        [sortKey]: query.order,
      },
      skip: query.skip,
      take: query.limit,
    })
    const total: number = await req.ctx.repo.news.count()

    return res.json({
      total,
      data: news,
    })
  }

  async show(req: Request<I.GetOneParams>, res: Response): Promise<Response> {
    const { params } = req
    const news: RI.News | undefined = await req.ctx.repo.news.findOne(params.id)

    if (!news) {
      return res.boom.notFound()
    }

    return res.json(news)
  }

  async store(req: Request<any, any, I.StoreBody>, res: Response): Promise<Response> {
    const { body } = req
    const parsedDomain = parseDomain(body.url)
    const news = req.ctx.repo.news.create({
      title: body.title,
      url: body.url,
      domain: `${parsedDomain?.domain}.${parsedDomain?.tld}`,
    })

    await req.ctx.repo.news.save(news)

    return res.json({
      data: news,
    })
  }

  async update(req: Request<I.UpdateParams, any, I.UpdateBody>, res: Response): Promise<Response> {
    const { params, body } = req
    const news: RI.News | undefined = await req.ctx.repo.news.findOne(params.id)

    if (!news) {
      return res.boom.notFound()
    }

    const parsedDomain = parseDomain(body.url)
    const updated = await req.ctx.repo.news.save({
      ...news,
      title: body.title,
      url: body.url,
      domain: `${parsedDomain?.domain}.${parsedDomain?.tld}`,
    })

    return res.json({
      data: updated,
    })
  }

  async delete(req: Request<I.DeleteParams>, res: Response): Promise<Response> {
    const { params } = req
    const news: RI.News | undefined = await req.ctx.repo.news.findOne(params.id)

    if (!news) {
      return res.boom.notFound()
    }

    await req.ctx.repo.news.delete(news.id)

    return res.json({
      data: news,
    })
  }
}

export default Controller
