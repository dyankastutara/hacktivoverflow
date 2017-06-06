const VoteAnswer = require('../models/answer')

module.exports = {
  getAll : (req, res)=>{
    VoteAnswer.find({})
    .populate({
      path : 'answerId userId',
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
    VoteAnswer.findById(req.params.id)
    .populate({
      path : 'answerId userId',
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
    VoteAnswer.create({
      vote: req.body.vote,
      answerId : req.body.answerId,
      userId : req.decoded.id
    })
    .then(result=>{
      res.send({
        result : result,
        msg : 'Vote Answer Added'
      })
    })
    .catch(err=>{
      res.send(err)
    })
  },
  deleteVoteAnswer : (req, res)=>{
    VoteAnswer.remove({
      _id : req.params.id
    })
    .then(result=>{
      res.send({
        result : result,
        msg : 'Your delete Vote Answer'
      })
    })
    .catch(err=>{
      res.send(err)
    })
  },
  updateVoteAnswer : (req, res)=>{
    VoteAnswer.findById(req.params.id)
    .then(result=>{
      result.update({
        vote : req.body.vote || result.vote,
        answerId : req.body.answerId || result.answerId,
        userId : req.decoded.id || result.userId
      })
      .then(response=>{
        res.send({
          result : response,
          msg : 'Your Updated this Vote Answer'
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
