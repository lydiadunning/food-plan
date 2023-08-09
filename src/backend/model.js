import mongoose from 'mongoose';
const { Schema } = mongoose;

const introductionSchema = new Schema ({
  ingredient: { type: Schema.Types.ObjectId, ref: 'Ingredient' },
  description: String,
  thresholdPassed: String,
  child: String,
  date: {
    type: Date,
    default: Date.now,
  }
})

const ingredientSchema = new Schema ({
  name: String,
  introductions: [{ type: Schema.Types.ObjectId, ref: 'Introduction' }],
})

const Introduction = mongoose.model('Introduction', introductionSchema)
const Ingredient = mongoose.model('Ingredient', ingredientSchema)

const childSchema = new Schema ({
  name: String,
  introductions: { type: 'ObjectId', ref: 'Introduction' },
  thresholds: [String],
  goal: {
    type: String,
    end: Date,
  },
})

module.exports = {
  Introduction,
  Ingredient
}

//https://github.com/Zwimber/mongoose-style-guide