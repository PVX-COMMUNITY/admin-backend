import type { HttpContext } from '@adonisjs/core/http'
import Member from '#models/member'
import { createMemberValidator, updateMemberValidator } from '#validators/member'
import { HandleErrors } from '../decorators.js'

@HandleErrors()
export default class MembersController {
  async index({ response }: HttpContext) {
    const members = await Member.all()
    return response.json(members)
  }

  async store({ request, response }: HttpContext) {
    const payload = await createMemberValidator.validate(request.all())
    const member = await Member.create(payload)
    return response.json(member)
  }

  async show({ params, response }: HttpContext) {
    const member = await Member.findOrFail(params.id)
    return response.json(member)
  }

  async update({ params, request, response }: HttpContext) {
    const payload = await updateMemberValidator.validate(request.all())
    const member = await Member.findOrFail(params.id)
    await member.merge(payload).save()
    return response.json(member)
  }

  async destroy({ params, response }: HttpContext) {
    const member = await Member.findOrFail(params.id)
    await member.delete()
    return response.noContent()
  }
}
