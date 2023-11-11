const { Schema, model } = require('mongoose');

const kidSchema = new Schema ({
  name: {
    type: String,
    required: true
  },
  exposures: [{ 
    type: 'ObjectId', 
    ref: 'Exposure',
    required: false
  }],
  outcomes: [{
    type: 'ObjectId',
    ref: 'Outcome',
    required: false
  }]
})

module.exports = model('Kid', kidSchema)