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
  interested: Boolean,
  meetingDate: Date,
  comments: {
    postedBy: String,
    date: Date
  }
},
{
  timestamps: {
    createdAt: true,
    updatedAt: true
  },
  versionKey: false
})

module.exports = require('mongoose').model('Lead', leadSchema)