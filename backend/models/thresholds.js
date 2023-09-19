const { Schema, model } = require('mongoose');


const systemThresholdSchema = new Schema ({
  thresholds: [{ 
    type: String,
    required: true,
  }]
})

const SystemThreshold = model('SystemThreshold', systemThresholdSchema)

const isSystemThresholdOrString = (value) => {
  // https://stackoverflow.com/questions/30334767/mongoose-schema-validate-xor-fields
  // keep using this 
  if (!value) return false
  return value instanceof String || value instanceof SystemThreshold
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
  Threshold
}