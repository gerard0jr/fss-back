const Schema = require('mongoose').Schema

leadSchema = new Schema ({
  active: {
    type: Boolean,
    default: true
  },
  bussinessName: String,
  bussinessRole: String,
  bussinessEmployees: Number,
  bussinessAddress: String,
  contactName: String,
  contactPosition: String,
  contactPhone: String,
  contactEmail: String,
  industry: String,
  origin: {
    type: String,
    enum: ['Nacional', 'Extranjero']
  },
  status: {
    type: String,
    enum: ['Propuesta', 'Negociación, Confirmación de pedido, Perdida, Primer Cobro'],
    default: 'Propuesta'
  },
  meetingDate: Date,
  commentPostedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  commentText: {
    type: String,
    default: 'Sin comentarios'
  },
  prefix: String,
  seller: String,
  number: Number,
  fileURL0: String,
  fileURL1: String
},
{
  timestamps: {
    createdAt: true,
    updatedAt: true
  },
  versionKey: false
})

module.exports = require('mongoose').model('Lead', leadSchema)