const express = require('express');
const router = express.Router()
const controllersAnswer = require('../controllers/answers')
const helpersJwt = require('../helpers/jwtVerify')

router.get('/', controllersAnswer.getAll)
router.get('/:id', controllersAnswer.getDetail)
router.post('/', helpersJwt.tokenVerify, controllersAnswer.insert)
router.delete('/:id', helpersJwt.tokenVerify, controllersAnswer.deleteAnswer)
router.put('/:id', helpersJwt.tokenVerify, controllersAnswer.updateAnswer)

module.exports = router
