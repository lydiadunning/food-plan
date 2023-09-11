const { Child, Ingredient, Introduction } = require('model.js')
const router = require('express').Router()


router.get('/child', async (request, response) => {
  const children = await Child.find({})

  response.json(children)
})

router.get('/introduction', async (request, response) => {
  const intros = await Introduction.find({})

  response.json(intros)
})

const addIngredient = () => {
  
}