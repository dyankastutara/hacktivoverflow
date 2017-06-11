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
      title : req.body.title,
      question: req.body.question,
      userId : req.decoded.id,
      vote : req.body.vote || 0,
      voteUp : req.body.voteUp || [],
      voteDown : req.body.voteDown || []
    })
    .then(result=>{
      Question.findById(result._id)
      .populate('userId')
      .then(response=>{
        res.send({
          result : response,
          msg : 'Question Added'
        })
      })
      .catch(err=>{
        res.send(err)
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
        title : req.body.title || result.title,
        question : req.body.question || result.question,
        userId : req.decoded.id || result.userId,
        vote : result.vote,
        voteUp : result.voteUp,
        voteDown : result.voteDown
      })
      .then(result=>{
        Question.findById(req.params.id)
        .populate('userId')
        .then(response=>{
          res.send({
            result : response,
            msg : 'Your Updated this Question'
          })
        })
        .catch(err=>{
          res.send(err)
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
