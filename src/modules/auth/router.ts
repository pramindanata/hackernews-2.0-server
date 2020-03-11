import { Router } from 'express'

import celebrate from '~/lib/celebrate'
import { wrapAsync } from '~/util/controller'
import auth from '~/shared/middleware/auth'

import Controller from './Controller'
import { schema } from './util'
import credentialExists from './middleware/credentialExists'

const router = Router()
const controller = new Controller()

router.get('/me', auth(), wrapAsync(controller.me))
router.post('/register', celebrate(schema.register), credentialExists(), wrapAsync(controller.register))
router.post('/login', celebrate(schema.login), wrapAsync(controller.login))

export default router
