const mongoose = require('mongoose')
const db = require('../model/mongoose')
const company = require('../model/company')
const rooms = require('../model/rooms')


async function  getCompanySummary(){
const allcompany = await company.company.find({deleted:false})
const allrooms = await rooms.depart.find({deleted:false})

let summary = []
allcompany.map( (async hotel=>{
    const roomTypes = hotel.roomtypes;
    const plans = hotel.checkinplan;
    const activeroomTypes = roomTypes.filter(item=> item.isActive==true) 
    const activePlans = plans.filter(item=> item.isActive==true)
    const ActiveRooms = allrooms.filter(room=> room.companyIndex==hotel.CompanyID )
     
    const data ={
        companyId:hotel.CompanyID,
        firstName : hotel.firstName ,
        email:hotel.email,
        active:hotel.Active,
        contactNumber :hotel.contactNumber,
        activeTariff : activeroomTypes.length,
        activePlans: activePlans.length ,
        totalRooms : ActiveRooms.length
    }
    summary.push(data)
}))  
 
return summary
}
async function changeCompanyActiveNot(reqObj){
    let result ={
        active:false,
        message:''
    }
const Active =  await company.company.findOne({CompanyID:reqObj.CompanyID},{_id:0,Active:1})
 
if(Active.Active){
    const update  = await company.company.updateOne({CompanyID:reqObj.CompanyID},{$set:{Active:false}})
        result.active=false  
        result.message= 'company deactivated'
}
else{
    const update = await company.company.updateOne({CompanyID:reqObj.CompanyID},{$set:{Active:true}})
        result.active=true  
        result.message= 'company Activated'
}
 
return result;
}
module.exports = {getCompanySummary,changeCompanyActiveNot  }


