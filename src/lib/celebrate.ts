import { RequestHandler } from 'express'
import { celebrate, SchemaOptions } from 'celebrate'
import { BaseValidationOptions } from '@hapi/joi'
import { config } from '~/lib/joi'

export default (schema: SchemaOptions): RequestHandler => {
  const joiOpt: BaseValidationOptions = config

  return celebrate(schema, joiOpt)
}
