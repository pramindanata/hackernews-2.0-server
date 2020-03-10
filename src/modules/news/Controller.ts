import { Request, Response } from 'express'
import * as RI from '~/interface'
import * as I from './interface'

class Controller {
  async index(req: Request, res: Response): Promise<Response> {
    const news: RI.News[] = await req.ctx.repo.news.find()

    return res.json({
      data: news,
    })
  }

  async show(req: Request<I.GetOne>, res: Response): Promise<Response> {
    const { params } = req
    const news: RI.News | undefined = await req.ctx.repo.news.findOne(params.id)

    if (!news) {
      return res.boom.notFound()
    }

    return res.json(news)
  }

  async store(req: Request, res: Response): Promise<Response> {
    const body = req.body as I.StoreInput
    const news = req.ctx.repo.news.create({
      title: body.title,
      url: body.url,
      source: body.url,
    })

    await req.ctx.repo.news.save(news)

    return res.json({
      data: news,
    })
  }
}

export default Controller
