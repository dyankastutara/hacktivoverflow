const express = require('express');
const router = express.Router()
const controllersQuestion = require('../controllers/questions')
const helpersJwt = require('../helpers/jwtVerify')

router.get('/', controllersQuestion.getAll)
router.get('/:id', controllersQuestion.getDetail)
router.post('/', helpersJwt.tokenVerify, controllersQuestion.insert)
router.delete('/:id', helpersJwt.tokenVerify, controllersQuestion.deleteQuestion)
router.put('/:id', helpersJwt.tokenVerify, controllersQuestion.updateQuestion)
router.patch('/voteDown/:id', helpersJwt.tokenVerify, controllersQuestion.updateVoteQuestion)
router.patch('/voteUp/:id', helpersJwt.tokenVerify, controllersQuestion.updateVoteQuestion)
module.exports = router
