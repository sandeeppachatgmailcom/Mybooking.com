const { login } = require('../controller/adminController');
const db = require('./mongoose')
const mongoose = require('mongoose')
const companies = require('../model/company')
 



async function loadtariffWithAny(Obj) {
  const loadtariff = await tariff.aggregate([
    {
        $lookup:{
            from: 'companies',
            localField: 'CompanyID',
            foreignField: 'CompanyID',
            as: 'companies',
        }
    },
    
    {
        $match:{
            "companies.district":new RegExp(Obj.ditrictName, "i") 
        }
    } 
    ,
    
    {
        $match:{
            "tariffIndex":new RegExp(Obj.roomCategoryID, "i") 
        }
    },
    {
      $match:{
          "deleted":false
      }
  }  ])
        
  return loadtariff;

     
}






const newTariff = new mongoose.Schema({
tariffName:{type:String,required:true,unique:true},
tariffIndex:{type:String,required:true,unique:true},
roomRentSingle:{type:Number,required:true,default:0},
extraPerson:{type:Number,required:true,default:0},
tax:{type:Number,required:true,default:0},
includeChild:{type:String,required:true,default:true},
defaultCheckinplan:{type:String,required:true},
timestamp: { type: Date, default: Date.now },
username: { type: String, required: true },
itemname: { type: String },
HSNCode: { type: String },
deleted:{type:Boolean,default:false,required:true}
}) 

const tariff = db.model('TARIFFMASTER',newTariff);
async function loadtariff(SearchKey) {
    try {
        const loadtariff = await tariff.find({tariffName:{$regex:`^${SearchKey}`,$options:'i'},deleted:false});
        
        return loadtariff;
    } catch (error) {
        console.error("Error loading tariff:", error);
        throw error; // Rethrow the error to be handled by the caller
    }
}


async function savecategory(
    tariffName,
    tariffIndex,
    roomRentSingle,
    extraPerson,
    tax,
    includeChild,
    defaultCheckinplan,
    timestamp,
    username,
    HSNCode,
    itemname,
    ){
    if(!tariffIndex){tariffIndex = await controller.getIndex('TARIFF')}
        
const data = {
    tariffName:tariffName,
    tariffIndex:tariffIndex,
    roomRentSingle:roomRentSingle,
    extraPerson:extraPerson,
    tax:tax,
    includeChild:includeChild,
    defaultCheckinplan:defaultCheckinplan,
    timestamp:timestamp,
    username:username,
    HSNCode:HSNCode,
    itemname:itemname,
    deleted:false     
   }
    
  const result = await tariff.updateOne({tariffIndex:tariffIndex},data,{upsert:true})
   
  return result;
} 

const postdeletetariff = async (req,res)=>{
    
    let result = await (tariff.updateOne({tariffIndex:req.body.tariffIndex},{$set:{deleted:true}}))
    
    if(result.acknowledged ){
        result={deleted:true}
    }
    else
    {
        result={deleted:false}
    }
    res.json(result)
}

module.exports = {tariff,loadtariff,savecategory,postdeletetariff,loadtariffWithAny }
