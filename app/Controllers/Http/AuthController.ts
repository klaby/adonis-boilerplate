import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import AuthValidator from 'App/Validators/AuthValidator'

export default class AuthController {
  /**
   * @method auth
   *
   * User Authentication
   */
  public async auth(ctx: HttpContextContract) {
    const data = await ctx.request.validate(AuthValidator)

    return await ctx.auth.attempt(data.email, data.password)
  }
}
