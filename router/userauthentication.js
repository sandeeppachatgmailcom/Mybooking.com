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
const email = require('../controller/emailService')
const server = 'http://localhost:5200/Images/';
const userauthentication = require('../controller/userauthentication')




router.get('/',userauthentication.getRoot )

router.post('/hotelLogin',userauthentication.posthotelLogin)
router.post('/custFetchLogin',userauthentication.postcustFetchLogin)
router.post('/custLogin',userauthentication.postcustLogin)
router.get('/custLogin',userauthentication.getcustLogin)
router.post('/OtpAuthentication',userauthentication.postOtpAuthentication)
router.post('/logout',userauthentication.postlogout)
router.post('/findUser',userauthentication.postfindUser)
router.post('/vendurelogin' ,userauthentication.postvendurelogin)
router.post('/login' , userauthentication.postlogin)
router.post('/verifyUsenameWithPassword',userauthentication.postverifyUsenameWithPassword)
router.post('/changePassword',userauthentication.postchangePassword)
router.post('/VerifyEmail',userauthentication.postVerifyEmail)
router.post('/verifyPhone',userauthentication.postverifyPhone)
router.post('/verifyUser', userauthentication.postverifyUser)
router.post('/authenticatelogin',userauthentication.postauthenticatelogin)
router.post('/signup',userauthentication.postsignup)
router.get('/signup',userauthentication.getsignup)
router.post('/loadPincode',userauthentication.postloadPincode)
router.post('/loadUserCompany',userauthentication.postloadUserCompany)
router.post('/confirmOtp',userauthentication.postconfirmOtp)
router.post('/SetOtpExpired',userauthentication.postSetOtpExpired)
router.post('/resendOtp',userauthentication.postresendOtp)

module.exports = router;
