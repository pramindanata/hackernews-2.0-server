import { Router } from 'express'
import { Joi } from 'celebrate'
import Controller from './Controller'
import celebrate from '~/lib/celebrate'
import { wrapAsync } from '~/util/controller'

const controller = new Controller()
const router = Router()

router.get('/', wrapAsync(controller.index))
router.get('/:id', wrapAsync(controller.show))
router.post(
  '/',
  celebrate({
    body: Joi.object({
      title: Joi.number().required(),
      url: Joi.number().required(),
    }),
  }),
  wrapAsync(controller.store),
)

export default router
