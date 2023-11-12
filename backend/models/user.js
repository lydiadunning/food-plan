const { Schema, model } = require('mongoose');


const userSchema = new Schema ({
  // use a library for validation here, pass off as much user-creation work as possible to simplify and reduce risk.
  userName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  kids: [{
    type: 'ObjectId',
    ref: 'Kid',
    required: true
  }]
})

module.exports = model('User', userSchema)

//https://github.com/Zwimber/mongoose-style-guide