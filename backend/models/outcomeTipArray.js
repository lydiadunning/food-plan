const { Schema, model } = require('mongoose');


const outcomeTipArraySchema = new Schema ({
  tipType: { // to differentiate between different lists of tips
    type: String,
    required: false
  },
  outcomeTips: [{
    outcome: {
      type: String,
      required: true,
    }
  }]
})

const OutcomeTipArray = model('OutcomeTipArray', outcomeTipArraySchema)

module.exports = OutcomeTipArray