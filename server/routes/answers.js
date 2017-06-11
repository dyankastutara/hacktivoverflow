const express = require('express');
const router = express.Router()
const controllersAnswer = require('../controllers/answers')
const helpersJwt = require('../helpers/jwtVerify')

router.get('/', controllersAnswer.getAll)
router.get('/:id', controllersAnswer.getDetail)
router.post('/', helpersJwt.tokenVerify, controllersAnswer.insert)
router.delete('/:id', helpersJwt.tokenVerify, controllersAnswer.deleteAnswer)
router.delete('/question/:questionId', helpersJwt.tokenVerify, controllersAnswer.deleteAnswerByQuestionId)
router.put('/:id', helpersJwt.tokenVerify, controllersAnswer.updateAnswer)
router.patch('/voteDown/:id', helpersJwt.tokenVerify, controllersAnswer.updateVoteAnswer)
router.patch('/voteUp/:id', helpersJwt.tokenVerify, controllersAnswer.updateVoteAnswer)

module.exports = router
