const { Schema, model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new Schema({
  // use a library for validation here, pass off as much user-creation work as possible to simplify and reduce risk.
  username: {
    type: String,
    unique: true,
    minlength: 3,
    required: true,
  },
  name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    unique: true,
    minlength: 5,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  kids: [
    {
      type: "ObjectId",
      ref: "Kid",
    },
  ],
});

userSchema.plugin(uniqueValidator);
userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash;
  },
});

module.exports = model("User", userSchema);

//https://github.com/Zwimber/mongoose-style-guide
