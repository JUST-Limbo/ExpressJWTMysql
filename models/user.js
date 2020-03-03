const mongoose = require('mongoose')
const DBconnect = require('../config/database.config')


mongoose.connect(DBconnect.URI, { useNewUrlParser: true });

var Schema = mongoose.Schema

var userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  nick_name: {
    type: String,
    default:""
  },
  created_name: {
    type: Date,
    default: Date.now
  },
  last_modified_time: {
    type: Date,
    default: Date.now
  },
  avatar: {
    type: String,
    default:""
  },
  gender: {
    type: String,
    enum: ["-1", "0", "1"],
    default: "0"
  },
  status: {
    type: String,
    enum: ["0", "1", "2"],
    default: "0"
  }
})

module.exports = mongoose.model('User', userSchema)
