const Schema = require('mongoose').Schema

quotationSchema = new Schema({
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  active: {
    type: Boolean,
    default: true
  },
  quotSeller: String,
  quotPrefix: {
    type: String,
    default: 'COT'
  },
  quotCity: String,
  quotNumber: Number,
  quotDescription: String,
  quotAmount: Number,
  quotCounter: Number,
  quotVersion: Number
},{
  timestamps: {
    createdAt: true,
    updatedAt: true
  },
  versionKey: false
})

module.exports = require('mongoose').model('Quotation', quotationSchema)