import { Router } from 'express'
import Controller from './Controller'
import { wrapAsync } from '~/util/controller'

const controller = new Controller()
const router = Router()

router.get('/', wrapAsync(controller.index))
router.get('/:id', wrapAsync(controller.show))
router.post('/', wrapAsync(controller.store))

export default router
