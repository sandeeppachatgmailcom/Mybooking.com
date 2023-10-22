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

module.exports = {getCompanySummary} 


