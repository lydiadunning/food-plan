const { Schema, model } = require('mongoose');

// I think I want to require either a food or a description
const introductionSchema = new Schema ({
  // haven't decided how to cross-reference schemas yet
  ingredient: { 
    type: Schema.Types.ObjectId, 
    ref: 'Ingredient', 
    required: true
  },
  description: {
    type: String,
    required: true
  },
  thresholdPassed: {
    type: Schema.Types.Mixed,
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

module.exports = model('Introduction', introductionSchema)