// serves the react app
const spaRouter = require("express").Router();
const path = require('path')

spaRouter.get('*', (request, resolve) => {
  resolve.sendFile(path.resolve(process.cwd(), 'index.html'))
})

module.exports = spaRouter