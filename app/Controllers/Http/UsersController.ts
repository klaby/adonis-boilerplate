import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, validator, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'
import {
  createError,
  createResponse,
  handlerError,
} from 'http-handler-response'
export default class UsersController {
  /**
   * @public schemaValidation
   *
   * Validation scheme
   */
  public schemaValidation = validator.compile(
    schema.create({
      name: schema.string({ trim: true, escape: true }, [rules.required()]),
      email: schema.string({ trim: true, escape: true }, [
        rules.required(),
        rules.email(),
      ]),
    }),
  )

  /**
   * @public messages
   *
   * Personalized messages
   */
  public messages = {
    'name.required': 'You must enter the name of the user.',
    'name.string': 'The value entered for the user name is not valid.',
    'email.required': 'You must enter the email of the user.',
    'email.string': 'The value entered for the user email is not valid.',
    'email.email': 'The email informed is invalid.',
  }

  /**
   * @method index
   *
   * Search all registered users
   */
  public async index({ response }: HttpContextContract) {
    try {
      return await User.all()
    } catch (error) {
      handlerError(response, error)
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
      handlerError(response, error)
    }
  }

  /**
   * @method store
   *
   * Register user
   */
  public async store({ request, response }: HttpContextContract) {
    try {
      const data = await request.validate({
        schema: this.schemaValidation,
        messages: this.messages,
      })

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
      handlerError(response, error)
    }
  }

  /**
   * @method update
   *
   * Update user
   */
  public async update({ request, response, params }: HttpContextContract) {
    try {
      const data = await request.validate({
        schema: this.schemaValidation,
        messages: this.messages,
      })

      const user = await User.find(params.id)

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
      handlerError(response, error)
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
      handlerError(response, error)
    }
  }
}
