const mongoose = require('mongoose');
const db = require('./mongoose'); // Ensure the correct path to your mongoose connection setup
const  loadtariff  = require('./tariff');
const controller = require('../controller/adminController')
const checkinPlans =require('../model/planMaster')

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
    checkinplan:[{
        planIndex:{type:String,required:true,unique:true},
        planName:{type:String,required:true,unique:true},
        shortName:{type:String,required:true,unique:true},
        maxPax:{type:Number,required:true,default:1},
        amount:{type:Number,required:true,default:0},
        extraCharge:{type:Number,required:true,default:0},
        Creattime:{type:Date,required:true,default:Date.now()},
        user:{type:String},
        LastUpdate:{type:Date,required:true,default:Date.now()},
        discription:{type:String},
        deleted:{type:Boolean,default:false}
    }],
    roomtypes:[{
        tariffName:{type:String },
        tariffIndex:{type:String },
        roomRentSingle:{type:Number,required:true,default:0},
        extraPerson:{type:Number,required:true,default:0},
        tax:{type:Number,required:true,default:0},
        includeChild:{type:Boolean,required:true,default:true},
        defaultCheckinplan:{type:String,required:true},
        Discription:{type:String},
        timestamp: { type: Date, default: Date.now()},
        username: { type: String, required: true },
        SpecialRent:{type:Number,required:true,default:0},
        itemname: { type: String },
        HSNCode: { type: String },
        deleted:{type:Boolean,default:false,required:true},
        reservationCount:{type:Number,required:true,default:0},
        totalRoom:{type:Number,required:true,default:0}
    }]
});
const  company = db.model('Company',NewCompany);

async function saveCompany(objcompany) {
    if (!objcompany.CompanyID) { objcompany.CompanyID = await controller.getIndex('COMPANY') }

    
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
async function insertNewCheckinPlan(planobj){
    
    checkinplan={
        planIndex:planobj.planIndex,
        planName:planobj.planName,
        shortName:planobj.shortName,
        maxPax:planobj.maxPax,
        amount:planobj.amount,
        extraCharge:planobj.extraCharge,
        user:planobj.user,
        LastUpdate:Date.now(),
        discription:planobj.discription,
        deleted:false
    }
    let  result ;
    if (planobj.planIndex){
     result = await company.updateOne({CompanyID:planobj.CompanyID,"checkinplan.planIndex":planobj.planIndex}
    ,{$set:{
        'checkinplan.$':checkinplan}
    })
    }
    else {
        console.log('elese executed in mongo');
        checkinplan.planIndex = await controller.getIndex('CheckinPlan');
        const ogplans = await checkinPlans.saveCheckinPlan(checkinplan);
        result =  result = await company.updateOne({CompanyID:planobj.CompanyID}
        ,{$push:{
             checkinplan:checkinplan}
        })
    }
 
let response = {};
    if (result.modifiedCount > 0) {
      response = { update: true };
    } else if (result.upsertedCount > 0) {
      response = { saved: true };
    } else {
      response = result;
    }
    return response ;
 
}
async function activateCheckinplan(planobj){
    const exist = await company.findOne({CompanyID:planobj.companyId,"checkinplan.planIndex":planobj.planIndex},{"checkinplan.$":1,_id:0}) 
    console.log(exist.checkinplan[0].deleted,'esist');
    let result ;
    if (exist.checkinplan[0].deleted) {
        console.log(exist.deleted,'if executed')
     result =await company.updateOne({CompanyID:planobj.companyId,"checkinplan.planIndex":planobj.planIndex},
        {$set:{
            "checkinplan.$.deleted":false
        }})
    }else if (!exist.checkinplan[0].deleted)  {
        console.log(exist.deleted,'else executed')
        result =await company.updateOne({CompanyID:planobj.companyId,"checkinplan.planIndex":planobj.planIndex},
        {$set:{
            "checkinplan.$.deleted":true
        }})    

}
console.log(result);
let response = {};
    if (result.modifiedCount > 0) {
      response = { update: true };
    } else if (result.upsertedCount > 0) {
      response = { saved: true };
    } else if (!result.modifiedCount && !result.upsertedCount &&  result.matchedCount){
      response = { matched: true };
    }
    return response ;
}
module.exports = { company,SearchCompany, saveCompany, deleteCompany, combiSearchCompany,loadHuman,SearchbyCompanyByAny,insertNewCheckinPlan, activateCheckinplan };
