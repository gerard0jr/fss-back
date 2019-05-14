const Schema = require('mongoose').Schema

clientSchema = new Schema({
  active: {
    type: Boolean,
    default: true
  },
  bussinessName: {
    type: String,
    required: true
  },
  bussinessID: String,
  bussinessRole: String,
  bussinessEmployees: Number,
  bussinessAddress: String,
  industry: String,
  origin: {
    type: String,
    enum: ['Nacional', 'Extranjero']
  }
},
{
  timestamps:{
    createdAt: true,
    updatedAt: true
  },
  versionKey: false
})

module.exports = require('mongoose').model('Client', clientSchema)