const mongoose = require('mongoose');
const Schema = mongoose.Schema
require('../config/db')

var answerSchema = new Schema({
  answer : {
    type : String,
    required:true
  },
  questionId : {
    type: Schema.Types.ObjectId,
    ref:'Question'
  },
  userId : {
    type:Schema.Types.ObjectId,
    ref:'User'
  }
})

var Answer = mongoose.model('Answer', answerSchema)
module.exports = Answer
