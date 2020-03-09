import { Router } from 'express'
import news from './news'

const router = Router()

router.use('/news', news)

export default router
