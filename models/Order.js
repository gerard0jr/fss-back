const Schema = require('mongoose').Schema

orderSchema = new Schema ({
  active: {
    type: Boolean,
    default: true
  },
  id: {
    type: String,
    default: 0
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: 'Client'
  },
  area: String,
  contact: String,
  responsible: String,
  seller: String,
  status: {
    type: String,
    enum: ['Generada', 'Enviada', 'Facturada'],
    default: 'Generada'
  }
},
{
  timestamps: {
    createdAt: true,
    updatedAt: true
  },
  versionKey: false
})

module.exports = require('mongoose').model('Order', orderSchema)