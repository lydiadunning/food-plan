import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema ({
  // use a library for validation here, pass off as much user-creation work as possible to simplify and reduce risk.
  userName: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true,
  },
  password: String
})

const User = mongoose.model('User', userSchema)

const childSchema = new Schema ({
  name: {
    type: String,
    required: true
  },
  introductions: { 
    type: 'ObjectId', 
    ref: 'Introduction',
    required: false
  },
  thresholds: [{
    type: 'ObjectId',
    ref: 'Threshold',
    required: false
  }]
})

const Child = mongoose.model('Child', childSchema)

const foodSchema = new Schema ({
  name: {
    type: String,
    required: true
  },
  introductions: { 
    type: 'ObjectId', 
    ref: 'Introduction',
    required: false
  }
})

const Food = mongoose.model('Food', foodSchema)

const systemThresholdSchema = new Schema ({
  thresholds: [{ 
    type: String,
    required: true,
  }]
})

const SystemThreshold = mongoose.model('SystemThreshold', systemThresholdSchema)

const isSystemThresholdOrString = (value) => {
  // https://stackoverflow.com/questions/30334767/mongoose-schema-validate-xor-fields
  // keep using this 
  if (!value) return false
  return value instanceof String || value instanceof SystemThreshold
}

const thresholdSchema = new Schema ({
  // I want to be able to activate and deactivate thresholds, not sure how to structure this data so I can do that.
  threshold: {
    type: Schema.Types.Mixed,
    required: false,
    validate: [isSystemThresholdOrString, "Threshold must be a string or a SystemThreshold"],
  }
})

const Threshold = mongoose.model('Threshold', thresholdSchema)


// I think I want to require either a food or a description
const introductionSchema = new Schema ({
  // haven't decided how to cross-reference schemas yet
  ingredient: { 
    type: Schema.Types.ObjectId, 
    ref: 'Ingredient', 
    required: true
  },
  description: {
    type: String,
    required: true
  },
  thresholdPassed: {
    type: Schema.Types.Mixed,
    ref: 'Threshold',
    required: false
  },
  meal: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    default: Date.now,
    required: false
  }
})

const Introduction = mongoose.model('Introduction', introductionSchema)



module.exports = {
  User,
  Child,
  Food,
  Introduction,
  SystemThreshold,
  Threshold
}

//https://github.com/Zwimber/mongoose-style-guide