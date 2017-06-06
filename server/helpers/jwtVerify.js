const jwt = require('jsonwebtoken');
require('dotenv').config()
module.exports = {
  tokenVerify : (req, res, next)=>{
    jwt.verify(req.headers.token, process.env.JWT_SECRET, (err, decoded)=>{
        if(err){
          res.send(err)
        }else{
          if(decoded){
            req.decoded = decoded
            next()
          }else{
            res.send({
              msg : 'You can not access this routes'
            })
          }
        }
    })
  }
}
