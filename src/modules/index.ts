import { Router } from 'express'
import auth from './auth'
import news from './news'
import user from './user'
import vote from './vote'

const router = Router()

router.use('/auth', auth)
router.use('/news', news)
router.use('/news/:newsId/vote', vote)
router.use('/user', user)

export default router
