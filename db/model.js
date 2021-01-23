const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    presentationname : {
        type : String,
        required: true
    },
    Version: {
        type: String,
        unique:false
        
        
    },
    Projectstatus:{
        type:String,
        required:true
    },
    presentationdesc:{
        type:String,
        required:true
    }
})

const Datadb = new mongoose.model('Data', schema);

module.exports = Datadb;