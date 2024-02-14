module.exports = {
  "outcomes": [
    {
      "outcome": "touched",
      "id": "451"
    },
    {
      "outcome": "sniffed",
      "id": "788"
    },
    {
      "outcome": "tasted",
      "id": "231"
    },
    {
      "outcome": "bit",
      "id": "633"
    },
    {
      "outcome": "ate",
      "id": "642"
    }
  ]
}

// const { Schema, model } = require("mongoose");

// const outcomeTipArraySchema = new Schema({
//   tipType: {
//     // to differentiate between different lists of tips
//     type: String,
//     required: false,
//   },
//   outcomeTips: [
//     {
//       outcome: {
//         type: String,
//         required: true,
//       },
//     },
//   ],
// });

// const OutcomeTipArray = model("OutcomeTipArray", outcomeTipArraySchema);

// outcomeTipArraySchema.set("toJSON", {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString();
//     delete returnedObject._id;
//     delete returnedObject.__v;
//   },
// });

// module.exports = OutcomeTipArray;
