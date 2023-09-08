const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    name : {
      type : String,
    },
    category : {
      type : String,
    },
    score : {
      type : Number,
    },
    
},{timestamps : true});


module.exports =  mongoose.model('Report', reportSchema);
