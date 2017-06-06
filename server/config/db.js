const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost/hacktiv-overflow'

mongoose.connect(mongoDB)

mongoose.connection.on('connected', ()=>{
  console.log('Database connected to '+mongoDB)
})

mongoose.connection.on('error', ()=>{
  console.log('Database connected to '+err)
})

mongoose.connection.on('disconnected', ()=>{
  console.log('Database disconnected : '+mongoDB)
})

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});
