const { Schema, model } = require('mongoose');

const foodSchema = new Schema ({
  name: {
    type: String,
    required: true
  },
  introductions: { 
    type: 'ObjectId', 
    ref: 'Introduction',
    required: false
  }
})

module.exports = model('Food', foodSchema)