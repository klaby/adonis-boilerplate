import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {
  createError,
  createResponse,
  handlerError,
} from 'http-handler-response'

import User from 'App/Models/User'

import UserValidator from 'App/Validators/UserValidator'

export default class UsersController {
  /**
   * @method index
   *
   * Search all registered users
   */
  public async index(ctx: HttpContextContract) {
    try {
      return await User.all()
    } catch (error) {
      handlerError(ctx.response, error)
    }
  }

  /**
   * @method show
   *
   * Search all registered users
   */
  public async show(ctx: HttpContextContract) {
    try {
      const user = await User.find(ctx.params.id)

      if (!user) {
        createError({ code: 404, detail: 'User not found.' })
      }

      return user?.toJSON()
    } catch (error) {
      handlerError(ctx.response, error)
    }
  }

  /**
   * @method store
   *
   * Register user
   */
  public async store(ctx: HttpContextContract) {
    try {
      const data = await ctx.request.validate(UserValidator)

      let user = new User()
      user.name = data.name
      user.email = data.email
      user.password = data.password
      await user.save()

      return createResponse(ctx.response, {
        code: 201,
        message: 'Successful registered user.',
      })
    } catch (error) {
      console.log(error)
      handlerError(ctx.response, error)
    }
  }

  /**
   * @method update
   *
   * Update user
   */
  public async update(ctx: HttpContextContract) {
    try {
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
    } catch (error) {
      handlerError(ctx.response, error)
    }
  }

  /**
   * @method delete
   *
   * Delete user
   */
  public async delete(ctx: HttpContextContract) {
    try {
      const user = await User.find(ctx.params.id)

      if (!user) {
        throw createError({ code: 404, detail: 'User not found.' })
      }

      await user.delete()

      return createResponse(ctx.response, {
        code: 200,
        message: 'User successfully deleted.',
      })
    } catch (error) {
      handlerError(ctx.response, error)
    }
  }
}
