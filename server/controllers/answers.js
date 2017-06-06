const Answer = require('../models/answer')

module.exports = {
  getAll : (req, res)=>{
    Answer.find({})
    .populate({
      path : 'questionId userId',
      populate : {
        path : 'userId'
      }
    })
    .then(response=>{
      res.send(response)
    })
    .catch(err=>{
      res.send(err)
    })
  },
  getDetail : (req, res)=>{
    Answer.findById(req.params.id)
    .populate({
      path : 'questionId userId',
      populate : {
        path : 'userId'
      }
    })
    .then(result=>{
      res.send(result)
    })
    .catch(err=>{
      res.send(err)
    })
  },
  insert : (req, res)=>{
    Answer.create({
      answer: req.body.answer,
      questionId : req.body.questionId,
      userId : req.decoded.id
    })
    .then(result=>{
      res.send({
        result : result,
        msg : 'Answer Added'
      })
    })
    .catch(err=>{
      res.send(err)
    })
  },
  deleteAnswer : (req, res)=>{
    Answer.remove({
      _id : req.params.id
    })
    .then(result=>{
      res.send({
        result : result,
        msg : 'Your delete Answer'
      })
    })
    .catch(err=>{
      res.send(err)
    })
  },
  updateAnswer : (req, res)=>{
    Answer.findById(req.params.id)
    .then(result=>{
      result.update({
        answer : req.body.answer || result.answer,
        questionId : req.body.questionId || result.questionId,
        userId : req.decoded.id || result.userId
      })
      .then(response=>{
        res.send({
          result : response,
          msg : 'Your Updated this Answer'
        })
      })
      .catch(error=>{
        res.send(error)
      })
    })
    .catch(err=>{
      res.send(err)
    })
  }
}
