import { Router } from 'express'
import celebrate from '~/lib/celebrate'
import { wrapAsync } from '~/util/controller'
import Controller from './Controller'
import { schema } from './util'

const router = Router()
const controller = new Controller()

router.get('/', celebrate(schema.index), wrapAsync(controller.index))
router.get('/:id', celebrate(schema.show), wrapAsync(controller.show))

export default router
