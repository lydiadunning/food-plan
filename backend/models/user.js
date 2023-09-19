import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema ({
  // use a library for validation here, pass off as much user-creation work as possible to simplify and reduce risk.
  userName: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true,
  },
  password: String
})

module.exports = mongoose.model('User', userSchema)

//https://github.com/Zwimber/mongoose-style-guide