const mongoose = require('mongoose');
const db = require('./mongoose'); // Ensure the correct path to your mongoose connection setup
const Controller = require('../controller/adminController')
const OtpMaster = require('../model/otpvalidation')
const company = require('../model/company')
 
const humanResourceSchema = new mongoose.Schema({
    hrId: { type: String },
    firstName: { type: String, required: true },
    lastName: { type: String },
    contactNumber: { type: String ,unique:true },
    secondaryNumber: { type: String },
    username: { type: String},
    email: { type: String, required: true },
    HouseNumber: { type: String },
    HouseName: { type: String },
    StreetName: { type: String },
    district: { type: String },
    city: { type: String },
    pincode: { type: String },
    state: { type: String },
    country: { type: String },
    Active: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    married: { type: String },
    isloggedIn: { type: Boolean, default: false },
    pancard: { type: String },
    adhaar: { type: String },
    dob: { type: Date,default:new Date(Date.now()) },
    marriedDate: { type: Date,default:new Date(Date.now())  },
    gender: { type: String },
    password: { type: String },
    deleted: { type: Boolean, default: false },
    createduser: { type: String },
    systemUser: { type: String },
    activeSession:{type:String},
    profilePicture:{type:String,default: 'http://localhost:5200/Images/person_6-min.jpg'},
    wallPappper:{type:String,default:'http://localhost:5200/Images/personalImage1.jpg'}


});
const HumanResource = db.model('USER', humanResourceSchema);

 

module.exports = { HumanResource};
