const controller = require('../controller/adminController');
const db = require('./mongoose')
const mongoose = require('mongoose')
const companies = require('../model/company')
 



async function loadtariffWithAny(Obj) {
//   const loadtariff = await companies.aggregate([
//     {
//         $lookup:{
//             from: 'companies',
//             localField: 'CompanyID',
//             foreignField: 'CompanyID',
//             as: 'companies',
//         }
//     },
//     {
//         $match:{
//             "companies.district":new RegExp(Obj.ditrictName, "i") 
//         }
//     } 
//     ,
//     {
//         $match:{
//             "tariffIndex":new RegExp(Obj.roomCategoryID, "i") 
//         }
//     },
//     {
//       $match:{
//           "deleted":false
//       }
//   }  ])

const loadtariff =await  companies.company.find({ CompanyID:Obj.submitCompanyDetails},{_id:0,tariff:1,BuildingName:1,
    buildingNumber:1,city:1 ,contactNumber:1,country:1,createduser:1,deleted:1,district:1,email:1,firstName:1,image1:1,
    image2:1, isloggedIn:1, lastName:1, pancard:1, pincode:1, secondaryNumber:1,state:1}); 

    
  return loadtariff ;
   
}






const newTariff = new mongoose.Schema({
tariffName:{type:String,required:true,unique:true},
tariffIndex:{type:String,required:true,unique:true},
roomRentSingle:{type:Number,required:true,default:0},
extraPerson:{type:Number,required:true,default:0},
tax:{type:Number,required:true,default:0},
includeChild:{type:Boolean,required:true,default:true},
defaultCheckinplan:{type:String,required:true},
Discription:{type:String},
timestamp: { type: Date, default: Date.now },
username: { type: String, required: true },
SpecialRent:{type:Number,required:true,default:0},
itemname: { type: String },
HSNCode: { type: String },
deleted:{type:Boolean,default:false,required:true},
cancelPeriod :{type:Number,default:48}
}) 

const tariff = db.model('TARIFFMASTER',newTariff);
 
module.exports = {tariff }
