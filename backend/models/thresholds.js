const { Schema, model } = require('mongoose');

const systemThresholdSchema = new Schema ({
  threshold: { 
    type: String,
    required: true,
  }
})

const SystemThreshold = model('SystemThreshold', systemThresholdSchema)

const SystemThresholdArraySchema = new Schema ({
  thresholds : [{
    type: Schema.Types.ObjectId,
    ref: 'SystemThreshold'
  }]
})

const SystemThresholdArray = model('SystemThresholdArray', SystemThresholdArraySchema)

const isSystemThresholdOrString = (value) => {
  // https://stackoverflow.com/questions/30334767/mongoose-schema-validate-xor-fields
  // keep using this 
  if (!value) return false
  return value instanceof String || value instanceof SystemThreshold
  // I want for this to be the same type as an item in the threshold string
}

// could theoretically keep thresholds in an array under child
const thresholdSchema = new Schema ({
  // I want to be able to activate and deactivate thresholds, not sure how to structure this data so I can do that.
  threshold: {
    type: Schema.Types.Mixed,
    required: false,
    validate: [isSystemThresholdOrString, "Threshold must be a string or a SystemThreshold"],
  }
})

const Threshold = model('Threshold', thresholdSchema)

module.exports = {
  SystemThreshold,
  SystemThresholdArray,
  Threshold
}