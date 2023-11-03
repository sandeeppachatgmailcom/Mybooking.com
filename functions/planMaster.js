 
const adminController = require('../controller/adminController')
 
const modelCheckinPlan = require('../model/planMaster')

async function  LoadPlan(){
       result = await modelCheckinPlan.CheckinPlan.find({deleted:false})
  
return result;} 
async function  LoadPlanByID(planId){
    result = await modelCheckinPlan.CheckinPlan.findOne({ planIndex:planId})
    console.log(result);
return result;} 


async function  saveCheckinPlan (data){
    let result = await modelCheckinPlan.CheckinPlan.updateOne({planIndex:data.planIndex},{$set:data},{upsert:true}) 
    if ((result.modifiedCount + result.upsertedCount) > 0) { result = { saved: true } }
    else { result = { saved: false } }
    return result;
} 

async function  deleteCheckinPlan (data){
    if (!data.planIndex){data.planIndex = await adminController.getIndex('CheckinPlan') }
    
    let  result = await modelCheckinPlan.CheckinPlan.updateOne({planIndex:data.planIndex},{$set:{deleted:true}}) 
    if ((result.modifiedCount + result.upsertedCount) >= 0) { result = { deleted: true } }
    else { result = { deleted: false } }
    return result;
} 

const CheckinPlan = modelCheckinPlan.CheckinPlan;
module.exports={CheckinPlan,LoadPlan,saveCheckinPlan,deleteCheckinPlan,LoadPlanByID}