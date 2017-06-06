const express = require('express');
const router = express.Router()
const controllersVoteAnswer = require('../controllers/vote_answers')
const helpersJwt = require('../helpers/jwtVerify')

router.get('/', controllersVoteAnswer.getAll)
router.get('/:id', controllersVoteAnswer.getDetail)
router.post('/', helpersJwt.tokenVerify, controllersVoteAnswer.insert)
router.delete('/:id', helpersJwt.tokenVerify, controllersVoteAnswer.deleteVoteAnswer)
router.put('/:id', helpersJwt.tokenVerify, controllersVoteAnswer.updateVoteAnswer)

module.exports = router
