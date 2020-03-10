import { Router } from 'express'
import { wrapAsync } from '~/util/controller'
import Controller from './Controller'

const router = Router()
const controller = new Controller()

router.get('/', wrapAsync(controller.index))
router.get('/:id', wrapAsync(controller.show))

export default router
