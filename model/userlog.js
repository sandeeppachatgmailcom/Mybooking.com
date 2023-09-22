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



const UserLog = db.model('userlog', userLogSchema);

async function logout(username){
    let logout =await  UserLog.updateMany({username:username},{$set:{loggedOut:true}})
    if(logout.modifiedCount>=0) {logout ={logout:true}} else {logout ={logout:false}}  
    console.log(logout)
    return logout;
}
module.exports = { UserLog,logout };

