import { Router } from 'express'
import auth from './auth'
import news from './news'
import user from './user'

const router = Router()

router.use('/auth', auth)
router.use('/news', news)
router.use('/user', user)

export default router
