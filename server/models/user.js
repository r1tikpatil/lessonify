const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;


const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
      },
      email : {
        type : String,
        required : true
      },
      password : {
        type : String,
        required : true
      },
      reports : [{
         name : {
          type : String,
         },
         category : {
          type : String,
         },
         score : {
           type : Number,
         }
      }]
});


module.exports =  mongoose.model('User', userSchema);
