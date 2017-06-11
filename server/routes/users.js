const express = require('express')
const router = express.Router()
const controllersUser = require('../controllers/users')

router.post('/signup', controllersUser.signup)
router.post('/signin', controllersUser.signin)

router.get('/', controllersUser.getAll)
router.get('/validate', controllersUser.validate)

module.exports = router
