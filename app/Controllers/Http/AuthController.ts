import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { handlerError } from 'http-handler-response'

import AuthValidator from 'App/Validators/AuthValidator'

export default class AuthController {
  /**
   * @method auth
   *
   * User Authentication
   */
  public async auth(ctx: HttpContextContract) {
    try {
      const data = await ctx.request.validate(AuthValidator)

      return await ctx.auth.attempt(data.email, data.password)
    } catch (error) {
      handlerError(ctx.response, error)
    }
  }
}
