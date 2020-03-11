import { Router } from 'express'
import celebrate from '~/lib/celebrate'
import { wrapAsync } from '~/util/controller'
import Controller from './Controller'
import userExists from './middleware/userExists'
import { schema } from './util'

const router = Router()
const controller = new Controller()

router.get('/:userId/news', celebrate(schema.index), userExists(), wrapAsync(controller.index))

export default router
