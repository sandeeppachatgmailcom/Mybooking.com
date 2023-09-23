const mongoose = require('mongoose');
const db = require('./mongoose'); // Ensure the correct path to your mongoose connection setup
const admin = require('../controller/adminController');
const  loadtariff  = require('./tariff');

const NewCompany = new mongoose.Schema({
    CompanyID: { type: String },
    firstName: { type: String, required: true },
    lastName: { type: String },
    contactNumber: { type: String, required: true },
    secondaryNumber: { type: String },
    email: { type: String, required: true },
    buildingNumber: { type: String },
    BuildingName: { type: String },
    StreetName: { type: String },
    district: { type: String },
    city: { type: String },
    pincode: { type: String },
    state: { type: String },
    country: { type: String },
    Active: { type: Boolean, default: false },
    isloggedIn: { type: Boolean, default: false },
    pancard: { type: String },
    RegisteredDate: { type: Date },
    deleted: { type: Boolean, default: false },
    createduser: { type: String },
    image1:{type:String},
    image2:{type:String},
    Companydiscription:{type:String},
    tariff:[{tariffIndex: {type:String},
        HSNCode: {type:String},
        defaultCheckinplan: {type:String},
        extraPerson: {type:Number},
        includeChild: {type:Boolean},
        itemname: {type:String},
        roomRentSingle: {type:Number},
        tariffName: {type:String},
        tax: {type:Number},
        deleted: {type:Boolean},
        SpecialRent: {type:Number},
        Discription:{type:String},
        checkinPlans:[{
            planIndex: {type:String},
            amount: {type:Number},
            deleted: {type:Boolean},
            discription: {type:String},
            extraCharge: {type:Number},
            maxPax: {type:Number},
            planName: {type:String},
            shortName:{type:String}
            }]
  }]
});
const  company = db.model('Company',NewCompany);

async function saveCompany(objcompany) {
    if (!objcompany.CompanyID) { objcompany.CompanyID = await admin.getIndex('COMPANY') }

    
    if(objcompany.imagearray[0]=="http://localhost:5200/Images/"){objcompany.imagearray[0] =await company.findOne({ CompanyID: objcompany.CompanyID }, { image1: 1, _id: 0 })}
    if(objcompany.imagearray[1]=="http://localhost:5200/Images/"){objcompany.imagearray[1] =await company.findOne({ CompanyID: objcompany.CompanyID }, { image2: 1, _id: 0 })}

    const data = {
        
        CompanyID:objcompany.CompanyID,
        firstName:objcompany.firstname,
        lastName:objcompany.lastName,
        contactNumber:objcompany.contactNumber,
        secondaryNumber:objcompany.secondaryNumber,
        email:objcompany.email,
        buildingNumber:objcompany.buildingNumber,
        BuildingName:objcompany.BuildingNameName,
        StreetName:objcompany.StreetName,
        district:objcompany.district,
        city:objcompany.city,
        pincode:objcompany.pincode,
        state:objcompany.state,
        country:objcompany.country,
        Active:objcompany.Active,
        isloggedIn:objcompany.isloggedIn,
        pancard:objcompany.pancard,
        RegisteredDate:objcompany.RegisteredDate,
        deleted:objcompany.deleted,
        createduser:objcompany.createduser ,
        image1:objcompany.imagearray[0],
        image2:objcompany.imagearray[1],
        Companydiscription:objcompany.Companydiscription
       } 
   
    const result = await company.updateOne({ CompanyID: objcompany.CompanyID }, { $set: data }, { upsert: true })
    return result;
    
}

async function SearchCompany(SerchKey) {

    const data = await company.find({firstName: { $regex: `^${SerchKey}`, $options: 'i' }, deleted: false })
    
    return data
}

async function combiSearchCompany(searchValues) {
    const data = await company.find({
        contactNumber: { $regex: `^${searchValues.contactNumber}`, $options: 'i' },
        firstName: { $regex: `^${searchValues.firstName}`, $options: 'i' },
        email: { $regex: `^${searchValues.email}`, $options: 'i' }, deleted: false
    })
    return data
}

async function deleteCompany(CompanyID) {
    const result = await company.updateOne({ CompanyID: CompanyID }, { $set: { deleted: true } }, { upsert: true })
    return result
}
async function loadHuman(contactNumber) {
    const result = await company.find({ contactNumber: contactNumber, deleted: false })
    return result
}
async function SearchbyCompanyByAny(SerchKey) {
    const data = await company.findOne({$or:[{firstName: { $regex: `^${SerchKey.CompanySearchKey}`, $options: 'i' }},{CompanyID: { $regex: `^${SerchKey.CompanySearchKey}`, $options: 'i' } },{contactNumber: { $regex: `^${SerchKey.Username}`, $options: 'i' } }]})
    
    return data
}
module.exports = { company,SearchCompany, saveCompany, deleteCompany, combiSearchCompany,loadHuman,SearchbyCompanyByAny };
