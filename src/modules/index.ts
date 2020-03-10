import { Router } from 'express'
import auth from './auth'
import news from './news'

const router = Router()

router.use('/auth', auth)
router.use('/news', news)

export default router
