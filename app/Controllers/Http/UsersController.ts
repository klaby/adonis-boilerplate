import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

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
      response.status(500).json({
        status: 500,
        message: 'Internal server error.',
      })
    }
  }

  /**
   * @method show
   *
   * Search all registered users
   */
  public async show({ response, params }: HttpContextContract) {
    try {
      return await User.find(params.id)
    } catch (error) {
      response.status(500).json({
        status: 500,
        message: 'Internal server error.',
      })
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

      return response.status(201).json({
        status: 201,
        message: 'Successfully registered user.',
      })
    } catch (error) {
      response.status(500).json({
        status: 500,
        message: 'Internal server error.',
      })
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
        throw {
          status: 404,
          message: 'User not found.',
        }
      }

      user.name = data.name
      user.email = data.email
      await user.save()

      return response.status(200).json({
        status: 200,
        message: 'Successfully updated user.',
      })
    } catch (error) {
      response.status(500).json({
        status: 500,
        message: 'Internal server error.',
      })
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
        throw {
          status: 404,
          message: 'User not found.',
        }
      }

      await user.delete()

      return response.status(200).json({
        status: 200,
        message: 'User successfully deleted.',
      })
    } catch (error) {
      response.status(500).json({
        status: 500,
        message: 'Internal server error.',
      })
    }
  }
}
