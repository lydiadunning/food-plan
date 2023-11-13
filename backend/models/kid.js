const { Schema, model } = require('mongoose');

// outcomeSchema is a subdocument of kidSchema
const outcomeSchema = new mongoose.Schema({
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
const Outcome = mongoose.model('Outcome', outcomeSchema)

const kidSchema = new Schema ({
  name: {
    type: String,
    required: true
  },

  exposures: [{
    // haven't decided how to cross-reference schemas yet
    food: { 
      type: String, 
      required: true
    },
    description: {
      type: String,
      required: false
    },
    outcomes: [{
      type: 'ObjectId',
      ref: 'Outcome',
      required: false
    }],
    meal: {
      type: String,
      required: false
    },
    date: {
      type: Date,
      default: Date.now,
      required: true
    }
  }],
  outcomeOptions: [
    outcomeSchema
  ]
})

module.exports = model('Kid', kidSchema)