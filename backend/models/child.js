const { Schema, model } = require('mongoose');

const childSchema = new Schema ({
  name: {
    type: String,
    required: true
  },
  introductions: { 
    type: 'ObjectId', 
    ref: 'Introduction',
    required: false
  },
  thresholds: [{
    type: Schema.Types.Mixed,
    ref: 'Threshold',
    required: false
  }]
})

module.exports = model('Child', childSchema)