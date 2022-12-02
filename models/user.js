const Joi = require('joi')
const mongoose = require('mongoose')

const Nea = require('../models/nea')

const UsersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  } , 
  nickname: String,
  email: String,
  picture: String,
  affiliatedNumber: {
    type: Number,
    unique: true,
    required: true,
  },
  affiliationDate: Date,
  occupation: String,
  birthdate: Date,
  id_deg: String,
  neas_discovered: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Nea'
  }]
  
  
});
function validateUser(user){
  const schema = Joi.object({
    name: Joi.string().required(),
    nickname: Joi.string(),
    email: Joi.string(),
    picture: Joi.string(),
    affiliatedNumber: Joi.number(),
    affiliationDate: Joi.date(),
    occupation: Joi.string(),
    birthdate: Joi.date(),
    id_deg: Joi.string(),
    neas_discovered: Joi.exist(),
  })

  return schema.validate(user)
};

const User = mongoose.model('User', UsersSchema)
exports.validate = validateUser
exports.User = User