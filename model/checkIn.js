const mongoose = require('mongoose');
const db = require('./mongoose');
const controller = require('../controller/adminController')
const humanBank = require('../model/humanbank')

const Newcheckin = new mongoose.Schema({
  frontDeskTransid: { type: String, requfrontDeskTransidired: true, unique: true },
  checkinReferance: { type: String },
  reservationNumber: { type: String },
  grcNumber: { type: String },
  hrId: { type: String },
  IdProofNumber: { type: String },
  arrivalDate: { type: Date },
  arrivalTime: { type: String },
  depart_Date: { type: Date },
  departureTime: { type: String },
  arrivalFrom: { type: String },
  goingTo: { type: String },
  Foreigner: { type: Boolean },
  FormCNumber: { type: String },
  roomId: { type: String },
  category: { type: String },
  tariff: { type: String },
  specialRate: { type: Number },
  TotalPax: { type: Number, required: true },
  Male: { type: Number },
  feMale: { type: Number },
  otherSex: { type: Number },
  child: { type: Number },
  adult: { type: Number },
  specialrequierments: { type: String },
  CompanyName: { type: String },
  AgentId: { type: String },
  CheckinPlan: { type: String },
  delete: { type: Boolean, default: false },
  update: { type: Boolean, default: false },
  createUser: { type: String },
  totalAmount:{type:Number}
})
const checkIn = db.model('checkin', Newcheckin);

async function saveCheckin(checkinobj) {
  if (!checkinobj.hrId) {
    checkinobj.hrId = await controller.getIndex('humanBank');
    const newCustomer = {
      firstName: checkinobj.firstName,
      contactNumber: checkinobj.contactNumber,
      email: checkinobj.email,
      username: checkinobj.contactNumber,
      category: checkinobj.category,
      hrId: checkinobj.hrId
    }
     

    const saveHuman = await humanBank.saveHuman(newCustomer)
     


  }
  if (!checkinobj.checkinReferance) { checkinobj.checkinReferance = await controller.getIndex('CHECKIN') }
  if (!await checkIn.findOne({ checkinReferance: checkinobj.checkinReferance })) { checkinobj.frontDeskTransid = await controller.getIndex('FRONTID') }

  data = {
    frontDeskTransid: checkinobj.frontDeskTransid,
    checkinReferance: checkinobj.checkinReferance,
    IdProofNumber: checkinobj.IdProofNumber,
    reservationNumber: checkinobj.reservationNumber,
    grcNumber: checkinobj.grcNumber,
    hrId: checkinobj.hrId,
    arrivalDate: checkinobj.arrivalDate,
    arrivalTime: checkinobj.arrivalTime,
    depart_Date: checkinobj.depart_Date,
    departureTime: checkinobj.departureTime,
    arrivalFrom: checkinobj.arrivalFrom,
    goingTo: checkinobj.goingTo,
    Foreigner: checkinobj.Foreigner,
    FormCNumber: checkinobj.FormCNumber,
    roomId: checkinobj.roomId,
    category: checkinobj.category,
    tariff: checkinobj.tariff,
    specialRate: checkinobj.specialRate,
    TotalPax: checkinobj.TotalPax,
    Male: checkinobj.Male,
    feMale: checkinobj.feMale,
    otherSex: checkinobj.otherSex,
    child: checkinobj.child,
    adult: checkinobj.adult,
    specialrequierments: checkinobj.specialrequierments,
    CompanyName: checkinobj.CompanyName,
    AgentId: checkinobj.AgentId,
    CheckinPlan: checkinobj.CheckinPlan,
    delete: checkinobj.false,
    update: checkinobj.update,
    createUser: checkinobj.createUser
  }
   
  let result = await checkIn.updateOne({ checkinReferance: checkinobj.checkinReferance, reservationNumber: checkinobj.reservationNumber }, { $set: data }, { upsert: true })
  data = result.modifiedCount + result.acknowledged
  if (data > 0) { result: { saved: true } }
  else { result: { saved: false } }
   
  return result;
}
async function saveReservation(reservationObj) {
  console.log(reservationObj,'reservationObj')
  if (!reservationObj.reservationNumber) { reservationObj.reservationNumber = await controller.getIndex('RESERVATION') }
  if (!await checkIn.findOne({ reservationNumber: reservationObj.reservationNumber })) { reservationObj.frontDeskTransid = await controller.getIndex('FRONTID') }
  data = {
    frontDeskTransid: reservationObj.frontDeskTransid,
    reservationNumber: reservationObj.reservationNumber,
    custId: reservationObj.custId,
    arrivalDate: new Date(reservationObj.arrivalDate),
    arrivalTime: reservationObj.arrivalTime,
    depart_Date: new Date(reservationObj.departureDate),
    departureTime: reservationObj.departureTime,
    Foreigner: reservationObj.Foreigner,
    tariff:reservationObj.tariffIndex,
    specialRate: reservationObj.specialRate,
    TotalPax: reservationObj.totalGuest,
    specialrequierments: reservationObj.specialRequest,
    CompanyName: reservationObj.companyID,
    CheckinPlan: reservationObj.checkinplan,
    totalAmount:reservationObj.totalAmount,
    delete: false,
    update: false,
    createUser: reservationObj.custId
  }
   
  let result = await checkIn.updateOne({ reservationNumber: reservationObj.reservationNumber }, { $set: data }, { upsert: true })
  result.reference = reservationObj.reservationNumber;
  data = result.modifiedCount + result.acknowledged;
  if (data > 0) { result: { saved: true } }
  else { result: { saved: false } }
   
  return result;
}

async function deleteCheckin(checkinReferance) {
  const frontDeskTransid = await checkIn.findOne({ checkinReferance: checkinReferance }, { _id: 0, frontDeskTransid: 1 })
  let result = await checkIn.updateOne({ frontDeskTransid: frontDeskTransid.frontDeskTransid }, { $set: { delete: true } })
  let data = result.modifiedCount + result.acknowledged
  if (data > 0) { result: { deleted: true } }
  else { result: { deleted: false } }
  
  return result;
}
async function deleteReservation(reservationNumber) {
  const frontDeskTransid = await checkIn.findOne({ reservationNumber: reservationNumber }, { _id: 0, frontDeskTransid: 1 })
  let result = await checkIn.updateOne({ frontDeskTransid: frontDeskTransid.frontDeskTransid }, { $set: { delete: true } })
  let data = result.modifiedCount + result.acknowledged
  if (data > 0) { result: { deleted: true } }
  else { result: { deleted: false } }

  return result;
}
async function SearchCheckin(FrontData) {
  const custId = await humanBank.combiSearchHuman(FrontData)
  if (!custId) custId = [];
  const checkinDetails = await checkIn.find({ hrId: { $in: custId.map((item => { return item.hrId })) }, delete: false })
  return checkinDetails;
}


async function getCheckinWithAllDetails(FrontData) {
  try {
    const results = await checkIn.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'hrId',
          foreignField: 'hrId',
          as: 'customerDetails',
        }
      },
      {
        $lookup: {
          from: 'rooms',
          localField: 'roomId',
          foreignField: 'roomIndex',
          as: 'roomsDetails',
        }
      },
      {
        $lookup: {
          from: 'tariffmasters',
          localField: 'tariff',
          foreignField: 'tariffIndex',
          as: 'tariffMaster',
        }
      },
      {
          $match: {
            "customerDetails.contactNumber": {
              $regex: new RegExp(FrontData.contactNumber, "i")
            },
          "customerDetails.email": {
            $regex: new RegExp(FrontData.email, "i")
          }
        }
      }
    ]);
     
    return results;
  } catch (error) {
    console.error(error);
  }
}


async function loadCheckin(checkinReferance) {
  const checkinDetails = await checkIn.find({ checkinReferance: { $regex: `${checkinReferance}`, $options: 'i' }, delete: false })
  return checkinDetails;
}
async function loadReservation(reservationNumber) {
  const reservationDetails = await checkIn.find({ reservationNumber: reservationNumber, delete: false })
  return reservationDetails;
} 
module.exports = { checkIn, saveCheckin, saveReservation, deleteCheckin, loadCheckin, SearchCheckin, getCheckinWithAllDetails }