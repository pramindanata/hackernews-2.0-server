import { Router } from 'express'
import celebrate from '~/lib/celebrate'
import { wrapAsync } from '~/util/controller'
import auth from '~/shared/middleware/auth'
import newsExists from './middleware/newsExists'
import voteExists from './middleware/voteExists'
import Controller from './Controller'
import { schema } from './util'

const router = Router({ mergeParams: true })
const controller = new Controller()

router.post('/', auth(), celebrate(schema.store), newsExists(), voteExists('no'), wrapAsync(controller.store))
router.delete('/', auth(), celebrate(schema.delete), newsExists(), voteExists('yes'), wrapAsync(controller.delete))

export default router
