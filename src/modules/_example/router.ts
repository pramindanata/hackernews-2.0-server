import { Router } from 'express'
import celebrate from '~/lib/celebrate'
import { wrapAsync } from '~/util/controller'
import auth from '~/shared/middleware/auth'

import Controller from './Controller'
import { schema } from './util'

const controller = new Controller()
const router = Router()

router.get('/', celebrate(schema.index), wrapAsync(controller.index))
router.get('/:id', celebrate(schema.show), wrapAsync(controller.show))
router.post('/', auth(), celebrate(schema.store), wrapAsync(controller.store))
router.put('/:id', auth(), celebrate(schema.update), wrapAsync(controller.update))
router.delete('/:id', auth(), celebrate(schema.delete), wrapAsync(controller.delete))

export default router
