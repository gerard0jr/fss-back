const Schema = require('mongoose').Schema
const plm = require('passport-local-mongoose')

const profilePic = 'https://firebasestorage.googleapis.com/v0/b/fss-react.appspot.com/o/default-assets%2Fprofile.png?alt=media&token=e2cd9a67-5ae7-41b1-ae1f-32c745e2ad64'

const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: true
  },
  photoURL: {
    type: String,
    default: profilePic
  },
  role: {
    type: String,
    enum: ['Administrador', 'Vendedor', 'Director'],
    default: 'Vendedor'
  },
  active: {
    type: Boolean,
    default: true
  },
  leads: [{
    type: Schema.Types.ObjectId,
    ref: 'Lead'
  }],
  quotations: [{
    type: Schema.Types.ObjectId,
    ref: 'Quotation'
  }],
  orders: [{
    type: Schema.Types.ObjectId,
    ref: 'Order'
  }],
  bills: [{
    type: Schema.Types.ObjectId,
    ref: 'Bill'
  }]
},{
  timestamps: {
    createdAt: true,
    updatedAt: true
  },
  versionKey: false
})

userSchema.plugin(plm,{usernameField: 'email'})
module.exports = require('mongoose').model('User', userSchema)