const cookie = require('cookie-parser');
const { Document } = require('mongoose');
const memoryCache = require('memory-cache');
const express = require('express');
const router = express.Router();
const session = require('express-session');
const HBank = require('../model/humanbank');
const userlog = require('../model/userlog')
const ActiveID = require('../model/userlog')
const OTPValidate = require('../controller/OtpValidation')
const jwt = require("jsonwebtoken")
const pincode = require('../model/pincode')
const companies = require('../model/company')
 

async function findUser(sessionID) {
    const activeUser = await ActiveID.UserLog.findOne({ sessionId: sessionID, loggedOut: false }, { username: 1, _id: 0 })
    
    return activeUser
}

async function userSessionAuthentication(sessionID, username, password) {
    const SessionExist = await userlog.UserLog.findOne({ sessionId: sessionID });
    if (SessionExist) {
        const existUser = SessionExist.username;
        if (existUser != username) {
            return false
        }
        else {
            return true
        }
    }
    else {
    }
}
router.post('/OtpAuthentication', async (req, res) => {
    
    let result = await OTPValidate.validateOtp(req.body.email, req.body.otp);
    if ((result.modifiedCount + result.upsertedCount) > 0) { result = { Verified: true } }
    else { result = { Verified: false } }
    
    res.json(result)
     
})

router.post('/logout', async (req, res) => {
    const logout = await userlog.logout(req.body.username)
    res.clearCookie('username');
    res.clearCookie('connect.sid');
    req.session.destroy();
    res.json(logout)
})

router.post('/findUser', async (req, res) => {
    const user = await findUser(req.sessionID);
    
    res.json(user)
})




function createJwt(payload, secretKey, options = {}) {
    // Ensure that payload is a plain object
    if (typeof payload !== 'object' || Array.isArray(payload)) {
        throw new Error('Payload must be a plain object.');
    }
}
 
router.post('/vendurelogin' , async (req, res) => {
    const userlogrecord = {
        username: req.body.Username,
        sessionId: req.sessionID,  
        folder: req.path, 
        method: req.method,
        loggedOut: false,
        ip: req.ip
    }
    const posted = await userlog.UserLog.updateOne({ sessionId: req.sessionID }, { $set: userlogrecord }, { upsert: true })
    let  result = await HBank.HumanResource.findOne({$or:[{ email: req.body.Username, password: req.body.Password,deleted: false },{ contactNumber: req.body.Username, password: req.body.Password,deleted: false }]}, { username: 1, _id: 0,email:1})
    if (result){ result = JSON.stringify(result);}
    //else result=null;
     reply = { Verified: false };
    if (result) {
        reply = { Verified: true }
        const token = jwt.sign(JSON.parse(result), 'PassKey', { expiresIn: 10 })  
        req.session.headers=token;
    }
    else { reply = { Verified: false } }
    res.cookie('username', req.body.Username)
    res.json(reply)
     
})

router.post('/login' , async (req, res) => {
    
    const userlogrecord = {
        username: req.body.Username,
        sessionId: req.sessionID,  
        folder: req.path, 
        method: req.method,
        loggedOut: false,
        ip: req.ip
    }
    
    const posted = await userlog.UserLog.updateOne({ sessionId: req.sessionID }, { $set: userlogrecord }, { upsert: true })
    
    let  result = await HBank.HumanResource.findOne({$or:[{ email: req.body.Username, password: req.body.Password,deleted: false },{ contactNumber: req.body.Username, password: req.body.Password,deleted: false }]}, { username: 1, _id: 0,email:1})
     
    
    if (result){ result = JSON.stringify(result);}
    //else result=null;
     reply = { Verified: false };
    if (result) {
        reply = { Verified: true }
        const token = jwt.sign(JSON.parse(result), 'PassKey', { expiresIn: 10 })  
        req.session.headers=token;
          
    }
    else { reply = { Verified: false } }
    res.cookie('username', req.body.Username)
    res.json(reply)
     
})



router.post('/VerifyEmail',async(req,res)=>{
     
     const result = await hBank.HumanResource.findOne({email:req.body.email})
     let responseData = false;
     if(result){
         responseData= {verified:true} 
     }
     else {
         responseData= {verified:false} 
     }
     res.json(responseData);
 })
 
 
 router.post('/verifyPhone', async (req,res)=>{
       
      const result = await hBank.HumanResource.findOne({contactNumber:req.body.phone})
      let responseData = false;
      if(result){
         responseData={verified:true}
      }
      else{
         responseData={verified:false}
      }
      res.json(responseData);
 
 })
 
 router.post('/verifyUser', async (req,res)=>{
     const result = await hBank.HumanResource.findOne({username:req.body.username})
      
     let responseData = false;
      if(result){
         responseData={verified:true}
      }
      else{
         responseData={verified:false}
      }
      res.json(responseData);
 
 
 })
 
 
 router.post('/authenticatelogin',  async(req,res)=>{
   const result = await hBank.HumanResource.findOne({username:req.body.username , password:req.body.password})
     
    if(result){
       res.json({Verified:true})
    }
    else{
       res.json({verified:false})
    }
 })
 
 
     
 router.post('/signup',async (req, res) => {
     
        try {
            let transporter = nodeMailer.createTransport({
                service: "gmail",
                auth: {
                    user: 'sandeeppachat@gmail.com',
                    pass: 'gitd fmxg ssed djmu'
                }
            })
            const otp = randomString.generate({
                length: 6,
                charset: 'numeric',
            });
            let randomOtp = otp
            const mailOptions = {
                from: process.env.nodeMailerEmail, // Sender email
                to: req.body.email, // Recipient email
                subject: 'OTP Verification Code',
                text: `Your OTP is: ${otp}`,
            };
            const resultotp = await validation.Otp.updateOne({authorisationname:req.body.email},{$set:{sessionId:req.sessionID,authorisationname:req.body.email,otp:otp,verified:false}},{upsert:true} )
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                     
                } else {
                    res.json({otp:true})
                }
            });
 
 
            const hrid = await getIndex('humanBank');
            
            const newUser = {  
                hrId: hrid,
                firstName: req.body.firstName,
                lastName: req.body.secondName,
                contactNumber: req.body.contactNumber,
                email: req.body.email,
                username: req.body.username,
                password: req.body.password,
                isAdmin: req.body.isAdmin,
                isActive: req.body.Active,
                isloggedIn: req.body.isLoggedIn,
                deleted:false
            } 
             
            let saved = await HBank.HumanResource.updateOne({hrId: hrid},{$set:newUser},{upsert:true}) 
             
            let result ;
            if((saved.upsertedCount+saved.modifiedCount)>0){
                result={saved: true};
            }
            else {
                result = {saved:false};
            }
            
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: 'An error occurred' });
        }
    })
 
    router.get('/signup', (req, res) => {
        res.render('signup');
    })
 
    
    router.post('/loadPincode',async (req,res)=>{
    const result =await pincode.loadPincode(req.body);
    res.json(result)
    })

    router.post('/loadUserCompany',async (req,res)=>{
         
        const result =await HBank.SearchHumanbyUsername(req.body)
       
        const mobile = result[0].contactNumber;
         
        const companyList =await companies.loadHuman(mobile);
        res.json(companyList);
    })
 
    


module.exports = router;
