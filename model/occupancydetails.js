const mongoose = require('mongoose');
const db = require('./mongoose');
const controller =  require('../controller/adminController')
const checkins = require('../model/checkIn')
const checkinDetail = require('../model/checkinDetails')
    const newRoom = new mongoose.Schema({
            occupancyIndex:{type:String},
            companyIndex:{type:String},
            tariffIndex:{type:String },
            roomIndex:{type:String},
            userCreated:{type:String},
            totalOccupancy:{type:Number,default:0},
            guestId:{type:String},
            roomRent:{type:Number,default:0},
            planIndex:{type:String},
            transDate:{type:Date,default:Date.now()},
            startTime:{type:String},
            endTime:{type:String},
            dateString:{type:String},
            blocked:{type:Boolean,default:true},
            deleted:{type:Boolean,default:false},
            maintainance:{type:Boolean,default:false},
            blocked:{type:Boolean,default:false},
            occupied:{type:Boolean,default:false},
            timeStamp:{type:String,default:Date.now()},
            dirty:{type:Boolean,default:false},
            blockedBy:{type:String}
            })
 const occupancy = db.model('dailyroomStatus',newRoom )  





 async function saveReservationDetails(bookingDetai) {
    
    let bookingDetails =  bookingDetai 
    console.log(bookingDetai,'bookingDetai',bookingDetails,'bookingDetails');
        let tempDate = bookingDetails.arrivalDate.split('T');
        let startDate =  tempDate[0]
        tempDate = bookingDetails.departureDate.split('T');
        let startTime = tempDate[1];
        let endDate = tempDate[0];
        let endTime = tempDate[1];
        const reservationDetails = await checkins.checkIn.findOne({ reservationNumber: bookingDetails.reservedDetails.reference })
        

        for (let i = 0; i < reservationDetails.totalRoom; i++) {
            
            const summary= {
                occupancyIndex:await controller.getIndex('CHKDETAIL'),
                frontDeskTransid: reservationDetails.frontDeskTransid,
                reservationNumber: reservationDetails.reservationNumber,
                tariffIndex: reservationDetails.tariff,
                planIndex:reservationDetails.CheckinPlan,
                planCapacity: reservationDetails.planCapacity,
                roomIndex:'',
                companiIndex: reservationDetails.CompanyName,
                roomRent: reservationDetails.specialRate,
                rentCapacity:2,
                PlanAmount: reservationDetails.PlanAmount,
                ExtraChargePlan: reservationDetails.ExtraChargePlan,
                ExtraChargeRent: reservationDetails.ExtraChargeRent,
                TotalPax: reservationDetails.TotalPax,
                arrivalDate: reservationDetails.arrivalDate,
                arrivalTime: reservationDetails.arrivalTime,
                depart_Date: reservationDetails.depart_Date,
                departureTime: reservationDetails.departureTime,
                specialrequierments: reservationDetails.specialrequierments,
                totalAmount: reservationDetails.totalAmount,
                totalDays: reservationDetails.totalDays,
                transDate: reservationDetails.transDate,
                updatee: reservationDetails.update,
                createUser: reservationDetails.createUser,
                delete: reservationDetails.delete ,
                guestindex:reservationDetails.createUser    
            }
            await checkinDetail.checkinDetails.create(summary);
            console.log(startDate, 'startDate', endDate, 'endDate');

        
            let currentDate = new Date(startDate);
            let endDateObj = new Date(endDate);
        
            while (currentDate <= endDateObj) {
                let dailyEntry = {
                    occupancyIndex: summary.occupancyIndex,
                    companyIndex: summary.companiIndex,
                    tariffIndex: summary.tariffIndex,
                    userCreated: summary.guestindex,
                    totalOccupancy: summary.TotalPax,
                    guestId: summary.guestindex,
                    roomRent: reservationDetails.roomRent,
                    planIndex: summary.planIndex,
                    transDate: currentDate.toISOString().split('T')[0],
                    startTime: startTime,
                    endTime: endTime,
                    dateString: currentDate.toISOString().split('T')[0],
                    blockedBy: summary.reservationNumber
                };
        
                const save = await occupancy.create(dailyEntry);
                console.log(save, 'dailyroomStatus');
        
                currentDate.setDate(currentDate.getDate() + 1);
                if (currentDate >= endDateObj) {
                    endTime = bookingDetails.departureTime;
                }
            }
        }
        
         
        

        return {saved:true}
    }
    
  
    function formatDate(date) {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    

 module.exports = {occupancy,saveReservationDetails}
