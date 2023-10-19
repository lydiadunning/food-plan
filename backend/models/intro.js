const Threshold = require('../models/threshold.js')
const { Schema, model } = require('mongoose');

// I think I want to require either a food or a description
const introSchema = new Schema ({
  // haven't decided how to cross-reference schemas yet
  food: { 
    type: 'String', 
    required: true
  },
  description: {
    type: String,
    required: true
  },
  thresholdPassed: {
    type: 'ObjectId',
    ref: 'Threshold',
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

module.exports = model('Intro', introSchema)