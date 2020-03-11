import { Router } from 'express'
import auth from './auth'
import news from './news'
import user from './user'
import vote from './vote'

const router = Router()

// /auth
router.use('/auth', auth)
// /news
router.use('/news', news)
// /news/:newsId/vote
router.use('/news', vote)
// /user
router.use('/user', user)

export default router
