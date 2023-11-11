const { Schema, model } = require('mongoose');

// could theoretically keep outcomes in an array under kid
const outcomeSchema = new Schema ({
  outcome: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
    required: true
  }
})

const Outcome = model('Outcome', outcomeSchema)


const outcomeTipArraySchema = new Schema ({
  outcomes : [{
    type: Schema.Types.ObjectId,
    ref: 'Outcome'
  }]
})

const OutcomeTipArray = model('OutcomeTipArray', outcomeTipArraySchema)

module.exports = {
  Outcome,
  OutcomeTipArray,
}