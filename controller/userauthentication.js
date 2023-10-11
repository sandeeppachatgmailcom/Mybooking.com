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
const controller = require('../controller/adminController')
const tariffs = require('../model/tariff')
const nodeMailer = require('nodemailer')
const randomString = require('randomstring') 
const validation = require('../model/otpvalidation')
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
router.post('/custLogin',async (req,res)=>{
    req.body.session = req.sessionID;

    const verified =await HBank.verifyUser(req.body)
    const user={
        firstName:verified.user,
        
    }
    if (verified.verified){
        res.cookie('username',verified.user)
    }
    req.body.ditrictName='';
    req.body.roomCategoryID='';
    req.body.budgetStart=0;
    req.body.budgetEnd=30000;
    const generalData = await companies.SearchCompany('')
    const tariff = await tariffs.loadtariff('')
    let district = new Set();
    const inputData = req.body;
    const pincode = generalData.forEach(element => {
        district.add(element.district )
    });
     const result =await companies.company.find({district:{ $regex: `^${req.body.ditrictName}`, $options: 'i' },deleted:false,
     "roomtypes.tariffIndex": { $regex: `^${req.body.roomCategoryID}`, $options: 'i' },
     "roomtypes.SpecialRent":{$gte:req.body.budgetStart},
     "roomtypes.SpecialRent":{$lte:req.body.budgetEnd}})
    res.render('detailedSearch',{user,result,generalData,tariff,district,inputData} )
})

router.get('/custLogin',async (req,res)=>{
    req.body.session = req.sessionID;

    const verified =await HBank.verifyUser(req.body)
    const user={
        firstName:verified.user,
        
    }
    if (verified.verified){
        res.cookie('username',verified.user)
    }
    req.body.ditrictName='';
    req.body.roomCategoryID='';
    req.body.budgetStart=0;
    req.body.budgetEnd=30000;
    const generalData = await companies.SearchCompany('')
    const tariff = await tariffs.loadtariff('')
    let district = new Set();
    const inputData = req.body;
    const pincode = generalData.forEach(element => {
        district.add(element.district )
    });
     const result =await companies.company.find({district:{ $regex: `^${req.body.ditrictName}`, $options: 'i' },deleted:false,
     "roomtypes.tariffIndex": { $regex: `^${req.body.roomCategoryID}`, $options: 'i' },
     "roomtypes.SpecialRent":{$gte:req.body.budgetStart},
     "roomtypes.SpecialRent":{$lte:req.body.budgetEnd}})
    res.render('detailedSearch',{user,result,generalData,tariff,district,inputData} )
})



router.post('/OtpAuthentication', async (req, res) => {
    
    let result = await OTPValidate.validateOtp(req.body.email, req.body.otp);
    if ((result.modifiedCount + result.upsertedCount) > 0) { result = { Verified: true } }
    else { result = { Verified: false } }
    
    res.json(result)
     
})

router.post('/logout', async (req, res) => {
    const logout = await userlog.logout(req.cookies.userName)
    await HBank.HumanResource.updateOne({activeSession:req.sessionID},{$set:{activeSession:null}})
    res.clearCookie('username');
    res.clearCookie('userName');
    res.clearCookie('connect.sid');
    req.session.destroy();
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.json(logout)


})

router.post('/findUser', async (req, res) => {
    const user = await findUser(req.sessionID);
    
    res.json(user)
})


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
    res.cookie('username', req.body.userName)
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
    req.body.session = req.sessionID; 
    const result =await HBank.verifyUser(req.body);
     
     
    if (result.verified) {
        //const token = jwt.sign(JSON.parse(result), 'PassKey', { expiresIn: 30 }) //jwt tocken implemented here 
        //req.session.headers=token;
    }
    res.cookie('userName', req.body.userName)
    res.json(result)
     
})
router.post('/verifyUsenameWithPassword',async (req,res)=>{
    req.body.session = req.sessionID;
    const result =await HBank.verifyUser(req.body)
    res.json(result)
})

router.post('/changePassword',async (req,res)=>{
    const result =await HBank.changePassword(req.body);
     
    let responseData = false;
     if(result){
         responseData= {updated:true} 
     }
     else {
         responseData= {updated:false} 
     }
     res.json(responseData);
    
})
router.post('/VerifyEmail',async(req,res)=>{
     
     const result = await HBank.HumanResource.findOne({email:req.body.email})
     let responseData = false;
     if(result){
         responseData= {verified:true} 
     }
     else {
         responseData= {verified:false} 
     }
     console.log(responseData);
     res.json(responseData);
})
 
 router.post('/verifyPhone', async (req,res)=>{
       
      const result = await HBank.HumanResource.findOne({contactNumber:req.body.phone})
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
     const result = await HBank.HumanResource.findOne({username:req.body.username})
      
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
    
   const result = await HBank.HumanResource.findOne({username:req.body.username , password:req.body.password})
     
    if(result){
       res.json({Verified:true})
    }
    else{
       res.json({verified:false})
    }
 })
     
router.post('/signup',async (req, res) => {
   
    try {
        let transporter =await nodeMailer.createTransport({
            service: "gmail",
            auth: {
                user: 'sandeeppachat@gmail.com',
                pass: 'gitd fmxg ssed djmu'
            }
        })
        const otp =await randomString.generate({
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

        
        const hrid = await controller.getIndex('humanBank');
        const hashedPassword = await controller.encryptPassword(req.body.password) 
        const newUser = {  
            hrId: hrid,
            firstName: req.body.firstName,
            lastName: req.body.secondName,
            contactNumber: req.body.contactNumber,
            email: req.body.email,
            username: req.body.username,
            password:hashedPassword,
            isAdmin: req.body.isAdmin,
            isActive: req.body.Active,
            isloggedIn: req.body.isLoggedIn,
            deleted:false
        } 
        console.log('reachd backend');    
        let saved = await HBank.HumanResource.updateOne({hrId: hrid},{$set:newUser},{upsert:true}) 
        console.log(newUser)    
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
