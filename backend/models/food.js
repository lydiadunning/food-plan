import mongoose from 'mongoose';
const { Schema } = mongoose;

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

module.exports = mongoose.model('Food', foodSchema)