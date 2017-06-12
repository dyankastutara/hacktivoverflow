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
      userId : req.decoded.id,
      vote : 0,
      voteUp : [],
      voteDown : []
    })
    .then(result=>{
      Answer.findById(result._id)
      .populate({
        path : 'questionId userId',
        populate : {
          path : 'userId'
        }
      })
      .then(response=>{
        res.send({
          result : response,
          msg : 'Your Answer has been added'
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
  deleteAnswer : (req, res)=>{
    Answer.remove({
      _id : req.params.id
    })
    .then(result=>{
      res.send({
        result : result,
        msg : 'Your Answer has been delete'
      })
    })
    .catch(err=>{
      res.send(err)
    })
  },
  deleteAnswerByQuestionId : (req, res)=>{
    Answer.remove({
      questionId : req.params.questionId
    })
    .then(result=>{
      res.send({
        result : result,
        msg : 'You delete the question along with the existing answer'
      })
    })
    .catch(err=>{
      res.send(err)
    })
  },
  updateVoteAnswer : (req, res)=>{
    Answer.findById(req.params.id)
    .then(result=>{
      result.update({
        _id : result._id,
        answer : result.answer,
        questionId : result.questionId,
        userId : result.userId,
        vote : req.body.vote,
        voteUp : req.body.voteUp || result.voteUp,
        voteDown : req.body.voteDown || result.voteDown
      })
      .then(result=>{
        Answer.find({})
        .populate({
          path : 'questionId userId',
          populate : {
            path : 'userId'
          }
        })
        .then(response=>{
          res.send({
            result : response,
            msg : 'You vote on this answer'
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
  },
  updateAnswer : (req, res)=>{
    Answer.findById(req.params.id)
    .then(result=>{
      result.update({
        _id : result._id,
        answer : req.body.answer || result.answer,
        questionId : req.body.questionId || result.questionId,
        userId : req.decoded.id || result.userId,
        vote : req.body.vote || result.vote,
        voteUp : req.body.voteUp || result.voteUp,
        voteDown : req.body.voteDown || result.voteDown
      })
      .then(response=>{
        res.send({
          result : response,
          msg : 'You change this answer'
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
