const Schema = require('mongoose').Schema

clientSchema = new Schema({
  active: {
    type: Boolean,
    default: true
  },
  clientName: {
    type: String,
    required: true
  },
  clientAddress: String,
  clientContact: String,
  clientDate: Date,
  folio: String,
  reqType: String,

},
{
  timestamps:{
    createdAt: true,
    updatedAt: true
  },
  versionKey: false
})