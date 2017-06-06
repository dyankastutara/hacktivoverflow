const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const users = require('./routes/users')
const questions = require('./routes/questions')
const answers = require('./routes/answers')
const vote_answers = require('./routes/vote_answers')

mongoose.Promise=require('bluebird')

const app = express()

app.set('port', process.env.PORT || 3000)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : false}))

app.use('/api/users/',users )
app.use('/api/questions/',questions )
app.use('/api/answers/',answers )
app.use('/api/vote_answers/',vote_answers )

app.listen(app.get('port'), ()=>{
  console.log('Connect to port '+app.get('port'))
})
