const mongoose = require('mongoose');
const Schema = mongoose.Schema
require('../config/db')

var questionSchema = new Schema({
  title : {
    type : String,
    required: true
  },
  question : {
    type : String,
    required: true
  },
  userId : {
    type : Schema.Types.ObjectId,
    ref : 'User'
  },
  vote : Number,
  voteUp : [{
    type : Schema.Types.ObjectId,
    ref : 'User'
  }],
  voteDown : [{
    type : Schema.Types.ObjectId,
    ref : 'User'
  }]
})

var Question = mongoose.model('Question',questionSchema)
module.exports = Question
