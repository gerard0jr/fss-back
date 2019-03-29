const Schema = require('mongoose').Schema

leadSchema = new Schema ({
  active: {
    type: Boolean,
    default: true
  },
  clientName: {
    type: Schema.Types.ObjectId,
    ref: 'Client'
  },
  contactName: String,
  contactPosition: String,
  contactPhone: String,
  contactEmail: String,
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
  file0Name: String,
  fileURL1: String,
  file1Name: String,
  quotations: [{
    type: Schema.Types.ObjectId,
    ref: 'Quotation'
  }]
},
{
  timestamps: {
    createdAt: true,
    updatedAt: true
  },
  versionKey: false
})

module.exports = require('mongoose').model('Lead', leadSchema)