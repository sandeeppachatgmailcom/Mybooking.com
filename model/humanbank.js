const mongoose = require('mongoose');
const db = require('./mongoose'); // Ensure the correct path to your mongoose connection setup
const Controller = require('../controller/adminController')

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
    systemUser: { type: String }


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
        dob: NewHumanObj.dob,
        marriedDate: NewHumanObj.marriedDate,
        gender: NewHumanObj.gender,
        deleted: NewHumanObj.false,
        createduser: NewHumanObj.createduser,
        systemUser: NewHumanObj.systemUser
    }
    const result = await HumanResource.updateOne({ hrId: NewHumanObj.hrId }, { $set: data }, { upsert: true })
    return result;
}

async function SearchHuman(SerchKey) {
    const data = await HumanResource.find({ firstName: { $regex: `^${SerchKey}`, $options: 'i' }, deleted: false })
    return data
}
async function SearchHumanbyUsername(humanObj) {
    console.log(humanObj);
    const data = await HumanResource.find({ username: { $regex: `^${humanObj.SerchKey}`, $options: 'i' }, deleted: false })
    console.log(data);
    return data;
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
module.exports = { HumanResource, SearchHuman, saveHuman, deleteHuman, combiSearchHuman,SearchHumanbyUsername };
