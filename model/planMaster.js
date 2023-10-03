const db = require('../model/mongoose')
const mongose = require('mongoose');
const adminController = require('../controller/adminController')

const newPlan =mongose.Schema( {
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

})

const CheckinPlan = db.model('CheckinPlan',newPlan);

async function  LoadPlan(){
       result = await CheckinPlan.find({deleted:false})
  
return result;} 


async function  saveCheckinPlan (data){
    let result = await CheckinPlan.updateOne({planIndex:data.planIndex},{$set:data},{upsert:true}) 
    if ((result.modifiedCount + result.upsertedCount) > 0) { result = { saved: true } }
    else { result = { saved: false } }
    return result;
} 

async function  deleteCheckinPlan (data){
    if (!data.planIndex){data.planIndex = await adminController.getIndex('CheckinPlan') }
    
    let  result = await CheckinPlan.updateOne({planIndex:data.planIndex},{$set:{deleted:true}}) 
    if ((result.modifiedCount + result.upsertedCount) >= 0) { result = { deleted: true } }
    else { result = { deleted: false } }
    return result;
} 
module.exports={CheckinPlan,LoadPlan,saveCheckinPlan,deleteCheckinPlan}