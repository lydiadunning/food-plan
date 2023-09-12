// this only needs to happen once, barring database changes
const SystemThresholds = require('../model.js')

const setUpSystemThresholds = async () => {
  await SystemThresholds.create([
    'on the plate',
    'poke with a fork',
    'pick up with a fork', 
    'smell', 
    'touch', 
    'lick', 
    'place in mouth', 
    'bite',
    'multiple bites',
    'eat small portion',
    'eat average portion'
  ]);
}

const getSystemThresholdIDList = async () => {
  const systemThresholds = await SystemThresholds.find({})
  return systemThresholds.map(st => st.id)
}

const createThresholdMix = async () => {
  const ids = getSystemThresholdIDList()
  await Threshold.create(
    {s}
    author: author._id // assign the _id from the person

  )
}