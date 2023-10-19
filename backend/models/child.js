const { Schema, model } = require('mongoose');

const childSchema = new Schema ({
  name: {
    type: String,
    required: true
  },
  intros: [{ 
    type: 'ObjectId', 
    ref: 'Intro',
    required: false
  }],
  thresholds: [{
    type: 'ObjectId',
    ref: 'Threshold',
    required: false
  }]
})

module.exports = model('Child', childSchema)