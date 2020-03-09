import { Router } from 'express'
import Controller from './Controller'
import { wrapAsync } from '~/util/controller'

const controller = new Controller()
const router = Router()

router.get('/', wrapAsync(controller.index))

export default router
