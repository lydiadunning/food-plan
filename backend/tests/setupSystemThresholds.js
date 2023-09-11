// this only needs to happen once, barring database changes
const SystemThresholds = require('../model.js')

const setUpSystemThresholds = () => {
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