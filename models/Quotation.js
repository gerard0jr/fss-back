const Schema = require('mongoose').Schema

quotationSchema = new Schema({
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  quotSeller: String,
  quotPrefix: String,
  quotCity: String,
  quotNumber: Number,
  quotDate: Date,
  quotBussinessName: String,
  quotBussinessAddr: String,
  quotContactName: String,
  quotCommentText: String
},{
  timestamps: {
    createdAt: true,
    updatedAt: true
  },
  versionKey: false
})

module.exports = require('mongoose').model('Quotation', quotationSchema)