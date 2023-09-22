const mongoose = require('mongoose');
const db = require('./mongoose');

const NewuserAccess  = new mongoose.Schema({
    username: { type: String, required: true,default:'user' },
    folder: { type: String, required: true,default:'user' },
    method:{type:String,required:true},
    time: { type: Date, default: Date.now }, // Use Date.now without parentheses
    loggedOut: { type: Boolean, default: true },
    ip:{type:String}
});



const UserLog = db.model('useraccesses', NewuserAccess);

async function logout(username){
    let logout =await  UserLog.updateMany({username:username},{$set:{loggedOut:true}})
    if(logout.modifiedCount>=0) {logout ={logout:true}} else {logout ={logout:false}}  
    console.log(logout)
    return logout;
}

async function verifyaccess (objConnection){
    if(!objConnection.body.username){objConnection.body.username = objConnection.query.username}
    
const verify = await UserLog.findOne({folder:objConnection.path ,method:objConnection.method,username:objConnection.cookies.username})
 
if(verify){
    return {verify:true}
}
else  return { verify:true}
}
module.exports = { UserLog,logout,verifyaccess };

