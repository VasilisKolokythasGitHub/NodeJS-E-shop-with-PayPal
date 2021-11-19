 const { Model } = require('vertex360')({ site_id: process.env.TURBO_APP_ID })

const props = {
  image: { type: String, default: '' },
  name: { type: String, default: '', display:true },
  price: { type: Number, default: 0 },
  slug: { type: String , default: '', immutable: true},
  description: { type: String, default: '' },
  images: { type: Array, default: [] },
  schema: { type: String, default: 'shirt', immutable: true},
  timestamp: { type: Date, default: new Date(), immutable: true}
}

class Shirt extends Model {
  constructor () {
    super()
    this.schema(props)
  }
}

module.exports = Shirt
