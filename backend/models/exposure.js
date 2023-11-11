const Outcome = require('./outcome.js')
const { Schema, model } = require('mongoose');

// I think I want to require either a food or a description
const exposureSchema = new Schema ({
  // haven't decided how to cross-reference schemas yet
  food: { 
    type: 'String', 
    required: true
  },
  description: {
    type: String,
    required: true
  },
  outcome: {
    type: 'ObjectId',
    ref: 'Outcome',
    required: false
  },
  meal: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    default: Date.now,
    required: false
  }
})

module.exports = model('Exposure', exposureSchema)