const { Schema, model } = require('mongoose');

// could theoretically keep thresholds in an array under child
const thresholdSchema = new Schema ({
  threshold: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
    required: true
  }
})

const Threshold = model('Threshold', thresholdSchema)


const thresholdHintArraySchema = new Schema ({
  thresholds : [{
    type: Schema.Types.ObjectId,
    ref: 'Threshold'
  }]
})

const ThresholdHintArray = model('ThresholdHintArray', thresholdHintArraySchema)

module.exports = {
  Threshold,
  ThresholdHintArray,
}