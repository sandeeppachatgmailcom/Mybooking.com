const express = require('express');
const session = require('express-session');
const MemoryStore = require('express-session').MemoryStore;
const mongodb = require('./model/mongoose');
const cookieParser = require('cookie-parser'); 
const userlog = require('./model/userlog');
const mainroot = require('./router/mainrout');
const otpvalidate = require('./model/otpvalidation')
const human = require('./model/humanbank')
const testCheckinApi = require('./model/checkIn')
const jwt = require('jsonwebtoken')
const swal = require ('sweetalert');

const morgan = require('morgan');


const app = express();
app.use(cookieParser());
app.set('view engine', 'ejs');
app.use(morgan("dev"))
app.use(
    session({
        secret: 'YourSecureSecretKey', // Use a strong and secure secret key
        resave: false,
        saveUninitialized: true,
        store: new MemoryStore(),
    })
);


app.use(express.static('asset'));
app.use(express.urlencoded({ extended: true })) // Correct typo 'extend' to 'extended'
app.use(express.json());
app.use(async (req, res, next) => {
    const clearCache = (req, res, next) => {
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
        next();
      };
      app.use(clearCache);

    const datas = {
        username: req.body.Username,
        sessionId: req.sessionID, // Fixed typo: 'sesionid' to 'sessionid'
        folder: req.path,// Example: Use req.path to log the current URL path
        method: req.method,
        ip: req.ip
    }
    const data = await new userlog.UserLog({
        username: req.body.Username,
        sessionId: req.sessionID, // Fixed typo: 'sesionid' to 'sessionid'
        folder: req.path,// Example: Use req.path to log the current URL path
        method: req.method,
        ip: req.ip
    });
    try {
        //await data.save();
        const result = await userlog.UserLog.updateOne({sessionId: req.sessionID},{$set:datas},{upsert:true})
    } catch (error) {
        console.error('Error saving user activity:', error);
    }
    // const verifySession = userverify.userSessionAuthentication(req.sessionID,req.body.username,req.body.password)
    // if(verifySession){
    //     next(); 
    // }
    next();
});
 

app.use(async (req, res, next) => {
    const sessionID = req.sessionID;
    
    const email = await human.HumanResource.findOne({ username: req.body.Username }, { _id: 0, email: 1 })
    let result;
     if (email) {
        result = await otpvalidate.Otp.findOne({ authorisationname: email.email, verified: false })
        console.log(email);
    }
    if (result) {
        const data = { sessionId: sessionID, authorisationname: email.email }
        res.render('otp', { data });
    }
    else if ((!result) && (req.path == '/OtpAuthentication')) {
        
        const result = await otpvalidate.Otp.updateOne({ authorisationname: req.body.email, otp: req.body.otp }, { $set: { verified: true } })
        if (result.modifiedCount > 0) {
            res.json({ verified: true })
        }
    }
    else if ((!result) && (req.path != '/OtpAuthentication')) {
        next();
    }
})

app.use('/', mainroot);
app.listen(5200, () => {
    mongodb.db;
    console.log('Server started at port 5200');
});
