import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import {
  createError,
  createResponse,
  handlerErrorAdonis,
} from 'http-handler-response'
export default class UsersController {
  /**
   * @method index
   *
   * Search all registered users
   */
  public async index({ response }: HttpContextContract) {
    try {
      return await User.all()
    } catch (error) {
      handlerErrorAdonis({ response, error })
    }
  }

  /**
   * @method show
   *
   * Search all registered users
   */
  public async show({ response, params }: HttpContextContract) {
    try {
      const user = await User.find(params.id)

      if (!user) {
        throw createError({ code: 404, detail: 'User not found.' })
      }

      return user?.toJSON()
    } catch (error) {
      handlerErrorAdonis({ response, error })
    }
  }

  /**
   * @method store
   *
   * Register user
   */
  public async store({ request, response }: HttpContextContract) {
    try {
      const data = request.only(['name', 'email'])

      let user = new User()
      user.name = data.name
      user.email = data.email
      await user.save()

      return response
        .status(201)
        .json(
          createResponse({ code: 201, message: 'Successful registered user.' }),
        )
    } catch (error) {
      handlerErrorAdonis({ response, error })
    }
  }

  /**
   * @method update
   *
   * Update user
   */
  public async update({ request, response }: HttpContextContract) {
    try {
      const data = request.only(['id', 'name', 'email'])

      const user = await User.find(data.id)

      if (!user) {
        throw createError({ code: 404, detail: 'User not found.' })
      }

      user.name = data.name
      user.email = data.email
      await user.save()

      return response.status(200).json(
        createResponse({
          code: 200,
          message: 'Successfully updated user.',
        }),
      )
    } catch (error) {
      handlerErrorAdonis({ response, error })
    }
  }

  /**
   * @method delete
   *
   * Delete user
   */
  public async delete({ response, params }: HttpContextContract) {
    try {
      const user = await User.find(params.id)

      if (!user) {
        throw createError({ code: 404, detail: 'User not found.' })
      }

      await user.delete()

      return response
        .status(200)
        .json(
          createResponse({ code: 200, message: 'User successfully deleted.' }),
        )
    } catch (error) {
      handlerErrorAdonis({ response, error })
    }
  }
}
