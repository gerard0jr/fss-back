const Schema = require('mongoose').Schema

billSchema = new Schema ({
  active: {
    type: Boolean,
    default: true
  },
  id: String,
  order: String,
  client: {
    type: Schema.Types.ObjectId,
    ref: 'Client'
  },
  contact: String,
  responsible: String,
  status: {
    type: String,
    enum: ['Generada', 'Enviada', 'Pagada'],
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

module.exports = require('mongoose').model('Bill', billSchema)