const mongoose = require('mongoose');
const Schema = mongoose.Schema
require('../config/db')

var voteAnswerSchema = new Schema({
  vote : {
    type : Number,
    enum : [1, -1],
    required : true
  },
  answerId : {
    type: Schema.Types.ObjectId,
    ref:'Answer'
  },
  userId : {
    type:Schema.Types.ObjectId,
    ref:'User'
  }
})

var VoteAnswer = mongoose.model('VoteAnswer', voteAnswerSchema)
module.exports = VoteAnswer
