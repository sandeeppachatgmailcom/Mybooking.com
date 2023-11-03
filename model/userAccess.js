const mongoose = require('mongoose');
const db = require('./mongoose');


const userLogSchema = new mongoose.Schema({
    username: { type: String, required: true,default:'user' },
    folder: { type: String, required: true,default:'user' },
    sessionId: { type: String, required: true,default:'user' },
    method:{type:String,required:true},
    time: { type: Date, default: Date.now }, // Use Date.now without parentheses
    loggedOut: { type: Boolean, default: true },
    ip:{type:String}
});

const UserLog = db.model('useraccesses', userLogSchema);
 
 

module.exports = { UserLog };

