const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {
  signup : (req, res)=>{
    User.findOne({
      email : req.body.email
    })
    .then(response=>{
      if(!response){
        var insertUser = new User({
          name : req.body.name,
          email : req.body.email,
          password : bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(Number(process.env.SALT))),
          img: req.body.img
        })
        insertUser.save((err, result)=>{
          if(!err){
            res.send({
              result : result,
              msg : 'Data User Added'
            })
          }else{
            res.send(err)
          }
        })
      }else{
        res.send('Email already exists')
      }
    })
    .catch(error=>{
      res.send(error)
    })
  },
  signin : (req, res)=>{
    User.findOne({
      email : req.body.email
    })
    .then(result=>{
      if(!result){
        res.send({
          msg : "Email not Registered"
        })
      }else{
        if(bcrypt.compareSync(req.body.password, result.password)){
          var token = jwt.sign({
            id : result._id,
            name : result.name,
            email : result.email,
            img: result.img || null
          }, process.env.JWT_SECRET)
          res.send({
            token : token
          })
        }else{
          res.send({
            msg : "Password is wrong"
          })
        }
      }
    })
    .catch(err=>{
      res.send(err)
    })
  },
  getAll : (req, res)=>{
    User.find({}, (err, result)=>{
      if(err){
        res.send(err)
      }else{
        res.send(result)
      }
    })
  },
  getDetail : (req, res)=>{
    User.findById(req.params.id, (err, result)=>{
      if (err){
        res.send(err)
      }else{
        res.send(result)
      }
    })
  }
}
