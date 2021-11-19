const { Controller } = require('vertex360')({ site_id: process.env.TURBO_APP_ID })
const Shirt = require('../models/Shirt')

class ShirtController extends Controller {
  constructor () {
    super(Shirt, process.env)
  }

  async get (params) {
    const shirts = await Shirt.find(params, Controller.parseFilters(params))
    return Shirt.convertToJson(shirts)
  }

  async getById (id) {
    const shirt = await Shirt.findById(id)
    if (shirt == null) {
      throw new Error(`${Shirt.resourceName} ${id} not found.`)
    }

    return shirt.summary()
  }

  async post (body) {

    if (body.name != null) {
      body.slug = utils.slugVersion(body.name, 6)
    }

    const shirt = await Shirt.create(body)
    return shirt.summary()
  }

  async put (id, params) {
    const shirt = await Shirt.findByIdAndUpdate(id, params, { new: true })
    return shirt.summary()
  }

  async delete (id) {
    const shirt = await Shirt.findByIdAndRemove(id)
    return shirt
  }
}

module.exports = new ShirtController()

