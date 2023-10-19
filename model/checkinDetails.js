const mongoose = require('mongoose');
const db = require('./mongoose');
const tariff = require('../model/tariff')
const hBank = require('../model/humanbank')
const checkin = require('../model/checkIn')
const plan = require('../model/planMaster')
const rooms = require('../model/rooms')


const Newcheckin = new mongoose.Schema({
  // frontDeskTransid: { type: String },
  checkinReferance: { type: String },
  reservationNumber: { type: String },
  occupancyIndex:{ type: String },
  grcNumber: { type: String },
  guestindex: { type: String },
  arrivalDate: { type: Date },
  arrivalTime: { type: String },
  depart_Date: { type: Date },
  departureTime: { type: String },
  arrivalFrom: { type: String },
  goingTo: { type: String },
  Foreigner: { type: Boolean },
  FormCNumber: { type: String },
  roomIndex: { type: String },
  tariffIndex: { type: String },
  roomRent: { type: Number },
  ExtraChargeRent:{type: Number,default:0},
  rentCapacity:{type: Number,default:0},
  planIndex: { type: String },
  PlanAmount:{type: Number,default:0},
  ExtraChargePlan:{type: Number,default:0},
  TotalPax: { type: Number, required: true,default:0 },
  planCapacity:{ type: Number, default:0},
  totalDays:{ type: Number,default:0},
  Male: { type: Number },
  feMale: { type: Number },
  otherSex: { type: Number },
  child: { type: Number },
  adult: { type: Number },
  specialrequierments: { type: String },
  companiIndex: { type: String },
  AgentId: { type: String },
  delete: { type: Boolean, default: false },
  update: { type: Boolean, default: false },
  createUser: { type: String },
  totalAmount:{type:Number},
  transDate:{type:Date,default:Date.now()},
  
})
const checkinDetails = db.model('checkinDetail', Newcheckin);
async function loadIndividualBookingByCompany(companyID) {
  const result = await checkinDetails.find({
    companiIndex: companyID,
    reservationNumber: { $ne: null },
    checkinReferance: null
  });
   const bookings = result.map(async (booking) => {
    booking.tariff = await tariff.tariff.findOne({ tariffIndex: booking.tariffIndex });
    booking.customer = await hBank.HumanResource.findOne({ hrId: booking.guestindex }, { _id: 0, password: 0, activeSession: 0 });
    booking.bookings = await checkin.checkIn.findOne({ reservationNumber: booking.reservationNumber });
    booking.plan = await plan.CheckinPlan.findOne({planIndex:booking.planIndex}) 
    booking.room  = await rooms.depart.findOne({roomIndex:booking.roomIndex}) 
    
    return booking; // This 'return' ensures 'booking' is included in the 'bookings' array
  }) ;

   // This should display the updated data

  return  await Promise.all(bookings) ;
}





module.exports= {checkinDetails,loadIndividualBookingByCompany}