// serves the react app
const spaRouter = require("express").Router();
const path = require('path')

spaRouter.get('*', (request, response) => {
  response.redirect('/')
})

module.exports = spaRouter