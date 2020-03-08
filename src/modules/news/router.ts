import { Router } from 'express'
import Controller from './Controller'

const controller = new Controller()
const router = Router()

router.get('/', controller.index)

export default router
