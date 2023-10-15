const mongoose = require('mongoose');
const db = require('./mongoose'); // Ensure the correct path to your mongoose connection setup
const Controller = require('../controller/adminController')
const OtpMaster = require('../model/otpvalidation')

const humanResourceSchema = new mongoose.Schema({
    hrId: { type: String },
    firstName: { type: String, required: true },
    lastName: { type: String },
    contactNumber: { type: String, required: true },
    secondaryNumber: { type: String },
    username: { type: String, required: true },
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
    dob: { type: Date },
    marriedDate: { type: Date },
    gender: { type: String },
    password: { type: String },
    deleted: { type: Boolean, default: false },
    createduser: { type: String },
    systemUser: { type: String },
    activeSession:{type:String},
    profilePicture:{type:String,default:'http://localhost:5200/Images/person_6-min.jpg'},
    wallPappper:{type:String,default:"http://localhost:5200/Images/personalImage1.jpg"}


});
const HumanResource = db.model('USER', humanResourceSchema);

async function saveHuman(NewHumanObj) {
    if (!NewHumanObj.hrId) { NewHumanObj.hrId = await Controller.getIndex('humanBank') }
    if (!NewHumanObj.isAdmin) { NewHumanObj.isAdmin = false }
    const data = {
        firstName: NewHumanObj.firstName,
        lastName: NewHumanObj.lastName,
        contactNumber: NewHumanObj.contactNumber,
        secondaryNumber: NewHumanObj.secondaryNumber,
        username: NewHumanObj.username,
        email: NewHumanObj.email,
        HouseNumber: NewHumanObj.HouseNumber,
        HouseName: NewHumanObj.HouseName,
        StreetName: NewHumanObj.StreetName,
        district: NewHumanObj.district,
        city: NewHumanObj.city,
        pincode: NewHumanObj.pincode,
        state: NewHumanObj.state,
        country: NewHumanObj.country,
        Active: NewHumanObj.Active,
        isAdmin: NewHumanObj.isAdmin,
        married: NewHumanObj.married,
        isloggedIn: NewHumanObj.isloggedIn,
        pancard: NewHumanObj.pancard,
        adhaar: NewHumanObj.adhaar,
        dob: new Date(NewHumanObj.dob),
        marriedDate: new Date(NewHumanObj.marriedDate),
        gender: NewHumanObj.gender,
        deleted: NewHumanObj.false,
        createduser: NewHumanObj.createduser,
        systemUser: NewHumanObj.systemUser,
        activeSession:NewHumanObj.session
    }
    console.log(data,'human datadatadatadatadata')
    const result = await HumanResource.updateOne({ hrId: NewHumanObj.hrId }, { $set: data }, { upsert: true })
    return result;
}

async function SearchHuman(SerchKey) {
    const data = await HumanResource.find({ firstName: { $regex: `^${SerchKey}`, $options: 'i' }, deleted: false })
    return data
}
async function SearchHumanbyUsername(humanObj) {
     
    const data = await HumanResource.find({ username: { $regex: `^${humanObj.SerchKey}`, $options: 'i' }, deleted: false })
    
    return data;
}
async function verifyUser(userObject){
    if(userObject.path=='/verifyUsenameWithPassword'){
        userObject.session="noactivesession"
    }
    const user = await  HumanResource.findOne({activeSession:userObject.session})
    if(user){
        
        return {verified:true,user:user.firstName,userdetails:user};
    }
    else{
        
        let verified = false;
        const password = await HumanResource.findOne({email:userObject.userName},{_id:0})
        if(password){
            const otpValidation = await OtpMaster.Otp.findOne({ authorisationname: userObject.userName, verified: false })
            console.log(otpValidation);
            const result = await Controller.comparePassword(userObject.password, password.password)
            console.log(result, 'passwordMatch');
            if (result) {
                if (userObject.path != '/verifyUsenameWithPassword') {
                    await HumanResource.updateOne({ email: userObject.userName }, { $set: { activeSession: userObject.session } })
                }
                verified = {
                    verified: true,
                    email: userObject.userName,
                    userdetails:password
                }
            }
            else {
                verified = {
                    verified: false,
                    otp: null
                }
            }
            verified.user = password.firstName;
            return verified;
        }
        return {
            verified: false,
            otp: null
        }
    }
}


async function combiSearchHuman(searchValues) {
    const data = await HumanResource.find({
        contactNumber: { $regex: `^${searchValues.contactNumber}`, $options: 'i' },
        firstName: { $regex: `^${searchValues.firstName}`, $options: 'i' },
        email: { $regex: `^${searchValues.email}`, $options: 'i' }, deleted: false
    })
    return data
}

async function deleteHuman(hrId) {
    const result = await HumanResource.updateOne({ hrId: hrId }, { $set: { deleted: true } }, { upsert: true })
    return result
}
async function loadHuman(contactNumber) {
    const result = await HumanResource.find({ contactNumber: contactNumber, deleted: true })
    return result
}
async function changePassword(humanObj){
    const password = await Controller.encryptPassword(humanObj.password);
     
    const result = await HumanResource.updateOne({email:humanObj.username},{$set:{password:password}})
    
    return result 
}

async function findUser(sessionID) {
    const activeUser = await HumanResource.findOne({ activeSession: sessionID }, { password:0, _id: 0 })
    console.log(activeUser);
    return activeUser
}

module.exports = {findUser, HumanResource, SearchHuman, saveHuman, deleteHuman, combiSearchHuman,SearchHumanbyUsername,verifyUser,changePassword };
