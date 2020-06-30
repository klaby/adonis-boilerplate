import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { createError, createResponse } from 'http-handler-response'
import Event from '@ioc:Adonis/Core/Event'

import User from 'App/Models/User'

import UserValidator from 'App/Validators/UserValidator'

export default class UsersController {
  /**
   * @method index
   *
   * Search all registered users
   */
  public async index() {
    return await User.all()
  }

  /**
   * @method show
   *
   * Search all registered users
   */
  public async show(ctx: HttpContextContract) {
    const user = await User.find(ctx.params.id)

    if (!user) {
      createError({ code: 404, detail: 'User not found.' })
    }

    return user?.toJSON()
  }

  /**
   * @method store
   *
   * Register user
   */
  public async store(ctx: HttpContextContract) {
    const data = await ctx.request.validate(UserValidator)

    let user = new User()
    user.name = data.name
    user.email = data.email
    user.password = data.password
    await user.save()

    Event.emit('user:send_mail', user.email)

    return createResponse(ctx.response, {
      code: 201,
      message: 'Successful registered user.',
    })
  }

  /**
   * @method update
   *
   * Update user
   */
  public async update(ctx: HttpContextContract) {
    const data = await ctx.request.validate(new UserValidator(ctx))

    const user = await User.find(ctx.params.id)

    if (!user) {
      createError({ code: 404, detail: 'User not found.' })
    }

    user.name = data.name
    user.email = data.email
    await user.save()

    return createResponse(ctx.response, {
      code: 200,
      message: 'Successfully updated user.',
    })
  }

  /**
   * @method delete
   *
   * Delete user
   */
  public async delete(ctx: HttpContextContract) {
    const user = await User.find(ctx.params.id)

    if (!user) {
      throw createError({ code: 404, detail: 'User not found.' })
    }

    await user.delete()

    return createResponse(ctx.response, {
      code: 200,
      message: 'User successfully deleted.',
    })
  }
}
