const mongoose = require('mongoose')

const neasSchema = new mongoose.Schema({
  designation:  String, 
  price: String,
  discovery_date: String,
  h_mag:   String,
  moid_au: String,
  q_au_1: String,
  q_au_2: String,
  period_ys: String,
  id_deg: String,
  pha: String,
  orbit_class: String,
});

const Nea = mongoose.model('Nea', neasSchema)

module.exports = Nea