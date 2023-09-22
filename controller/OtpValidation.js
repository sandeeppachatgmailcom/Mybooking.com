const OtpAuther= require('../model/otpvalidation');
const db = require

async function validateOtp(Email,Otppassword){
    console.log(Email,Otppassword,'function here')
    const result = await OtpAuther.Otp.updateOne(
        { authorisationname: Email, otp: Otppassword },
        { $set: { verified: true } });
    console.log(result,'otp')
    return result;
} 
module.exports={validateOtp}