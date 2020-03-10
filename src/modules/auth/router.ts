import { Router } from 'express'
import { wrapAsync } from '~/util/controller'
import Controller from './Controller'

const router = Router()
const controller = new Controller()

router.post('/register', wrapAsync(controller.register))
router.post('/login', wrapAsync(controller.login))

export default router
