const User = require("../models/user.js");
const userRouter = require("express").Router();
const Kid = require("../models/kid.js");
const logger = require("../utils/logger.js");
const bcrypt = require("bcryptjs");

userRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("kids");
  response.json(users);
});

userRouter.post("/", async (request, response, next) => {
  const { username, name, password, email } = request.body;

  if (!username || username.length < 3) {
    return response.status(400).json({
      error: username
        ? "username must be at least 3 characters long"
        : "username is required",
    });
  }

  if (!password || password.length < 3) {
    return response.status(400).json({
      error: password
        ? "password must be at least 3 characters long"
        : "password is required",
    });
  }

  const existingUser = User.find({name: username})
  if (existingUser) {
    return response.status(400).json({
      error: `username ${username} already in use`
    })
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
    email,
  });
  try {
    const savedUser = await user.save();
    response.status(201).json(savedUser);
  } catch (error) {
    logger.error(error);
    next(error);
  }
});

// not yet implemented.

// // change a user - add a kid - not create a kid
// userRouter.patch('/:id/addKid/:kidId', async (request, response) => {
//   // verify the kid exists
//   // verify the user exists
//   // add the kid to the user's list of kids
//   // return the updated user information or error
// })

// // change a user - remove a kid
// userRouter.patch('/:id/removeKid/:kidId', async (request, response) => {
//   // remove the kid from the user
//   // return the updated user info or error
// })

// // delete a user
// userRouter.delete('/:id', async (request, response) => {
//   // find the given user
//   // remove the user from the database
//   // return that the user is no longer in the database
//   // or a db error message
// })

module.exports = userRouter;
