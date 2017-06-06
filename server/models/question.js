const mongoose = require('mongoose');
const Schema = mongoose.Schema
require('../config/db')

var questionSchema = new Schema({
  question : {
    type : String,
    required: true
  },
  userId : {
    type : Schema.Types.ObjectId,
    ref : 'User'
  }
})

var Question = mongoose.model('Question',questionSchema)
module.exports = Question
