import mongoose from 'mongoose';
const { Schema } = mongoose;

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

module.exports = mongoose.model('Child', childSchema)