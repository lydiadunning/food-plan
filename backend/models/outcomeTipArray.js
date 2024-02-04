const { Schema, model } = require("mongoose");

const outcomeTipArraySchema = new Schema({
  tipType: {
    // to differentiate between different lists of tips
    type: String,
    required: false,
  },
  outcomeTips: [
    {
      outcome: {
        type: String,
        required: true,
      },
    },
  ],
});

const OutcomeTipArray = model("OutcomeTipArray", outcomeTipArraySchema);

outcomeTipArraySchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = OutcomeTipArray;
