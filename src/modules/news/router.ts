import { Router } from 'express'
import celebrate from '~/lib/celebrate'
import { wrapAsync } from '~/util/controller'

import Controller from './Controller'
import { schema } from './util'

const controller = new Controller()
const router = Router()

router.get('/', wrapAsync(controller.index))
router.get('/:id', celebrate(schema.getOne), wrapAsync(controller.show))
router.post('/', celebrate(schema.store), wrapAsync(controller.store))
router.put('/:id', celebrate(schema.update), wrapAsync(controller.update))
router.delete('/:id', celebrate(schema.delete), wrapAsync(controller.delete))

export default router
