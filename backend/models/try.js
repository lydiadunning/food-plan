const { Schema, model } = require('mongoose');

// could theoretically keep tries in an array under child
const trySchema = new Schema ({
  try: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
    required: true
  }
})

const Try = model('Try', trySchema)


const tryHintArraySchema = new Schema ({
  tries : [{
    type: Schema.Types.ObjectId,
    ref: 'Try'
  }]
})

const TryHintArray = model('TryHintArray', tryHintArraySchema)

module.exports = {
  Try,
  TryHintArray,
}