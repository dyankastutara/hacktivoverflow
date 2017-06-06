const Question = require('../models/question')

module.exports = {
  getAll : (req, res)=>{
    Question.find({})
    .populate('userId')
    .then(response=>{
      res.send(response)
    })
    .catch(err=>{
      res.send(err)
    })
  },
  getDetail : (req, res)=>{
    Question.findById(req.params.id)
    .populate('userId')
    .then(result=>{
      res.send(result)
    })
    .catch(err=>{
      res.send(err)
    })
  },
  insert : (req, res)=>{
    Question.create({
      question: req.body.question,
      userId : req.decoded.id
    })
    .then(result=>{
      res.send({
        result : result,
        msg : 'Question Added'
      })
    })
    .catch(err=>{
      res.send(err)
    })
  },
  deleteQuestion : (req, res)=>{
    Question.remove({
      _id : req.params.id
    })
    .then(result=>{
      res.send({
        result : result,
        msg : 'Your delete Question'
      })
    })
    .catch(err=>{
      res.send(err)
    })
  },
  updateQuestion : (req, res)=>{
    Question.findById(req.params.id)
    .then(result=>{
      result.update({
        question : req.body.question || result.question,
        userId : req.decoded.id || result.userId
      })
      .then(response=>{
        res.send({
          result : response,
          msg : 'Your Updated this Question'
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
