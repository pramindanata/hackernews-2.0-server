import { Router } from 'express'
import Controller from './Controller'
import { wrapAsync } from '~/util/controller'

const router = Router()
const controller = new Controller()

router.post('/', wrapAsync(controller.store))
router.delete('/', wrapAsync(controller.delete))

export default router
