const mongoose = require('mongoose');
const db = require('./mongoose'); // Ensure the correct path to your mongoose connection setup

const newEntry = mongoose.Schema({
    authorisationname:{type:String},
    otp:{type:String} ,
    verified:{type:Boolean,default:false},
    sessionId:{type:String}
    
})
const Otp = db.model('OTP',newEntry)
module.exports = {Otp}