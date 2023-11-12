const { Schema, model } = require('mongoose');


const outcomeTipArraySchema = new Schema ({
  tipType: String,
  outcomeTips: [{
    outcome: {
      type: String,
      required: true,
    }
  }]
})

const OutcomeTipArray = model('OutcomeTipArray', outcomeTipArraySchema)

module.exports = {
  OutcomeTipArray,
}