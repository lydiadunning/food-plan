const { Schema, model } = require('mongoose');

// outcomeSchema is a subdocument of kidSchema
const outcomeSchema = new Schema({
  outcome: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
    required: true
  }
})
const Outcome = model('Outcome', outcomeSchema)

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
    // outcomes: [{
    //   type: 'ObjectId',
    //   ref: 'Outcome',
    //   required: false
    // }],
    outcomes: [{
      type: String,
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
  ],
  users: [{
    type: 'ObjectId',
    ref: 'User',
    required: false
  }]
})

kidSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = model('Kid', kidSchema)