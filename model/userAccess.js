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
else  return {verify:true}
}



// app.use(async (req, res, next) => {
//     const sessionID = req.sessionID;
    
//     const email = await human.HumanResource.findOne({ username: req.body.Username }, { _id: 0, email: 1 })
//     let result;
//      if (email) {
//         result = await otpvalidate.Otp.findOne({ authorisationname: email.email, verified: false })
//         console.log(email);
//     }
//     if (result) {
//         const data = { sessionId: sessionID, authorisationname: email.email }
//         res.render('otp', { data });
//     }
//     else if ((!result) && (req.path == '/OtpAuthentication')) {
        
//         const result = await otpvalidate.Otp.updateOne({ authorisationname: req.body.email, otp: req.body.otp }, { $set: { verified: true } })
//         if (result.modifiedCount > 0) {
//             res.json({ verified: true })
//         }
//     }
//     else if ((!result) && (req.path != '/OtpAuthentication')) {
//         next();
//     }
// })




module.exports = { UserLog,logout,verifyaccess };

