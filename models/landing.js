const mongoose = require('mongoose')

const landingsSchema = new mongoose.Schema({
  name:  String, 
  id: String,
  nametype: String,
  recclass: String,
  mass: String,
  fall: String,
  year: String,
  reclat: String,
  id_deg: String,
  reclong: String,
  geolocation: {latitude: String, longitude: String},
});

const Landing = mongoose.model('Landing', landingsSchema)
module.exports = Landing