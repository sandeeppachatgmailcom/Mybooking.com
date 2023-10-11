const mongoose = require('mongoose');
const db = require('./mongoose');
const adminController = require('../controller/adminController')
const checkinDetails = require('../model/checkIn')


    const newRoom = new mongoose.Schema({
            occupancyIndex:{type:String},
            roomNumber:{type:Number},
            roomIndex:{type:String},
            roomName:{type:String},
            companyIndex:{type:String},
            roomType:{type:String },
            blocked:{type:Boolean,default:true},
            deleted:{type:Boolean,default:false},
            userCreated:{type:String},
            timeStamp:{type:String,default:Date.now()},
            totalOccupancy:{type:Number,default:0},
            adult:{type:Number,default:0},
            male:{type:Number,default:0},
            feMale:{type:Number,default:0},
            guestId:{type:String},
            rent:{type:Number,default:0},
            specialRent:{type:Number,default:0},
            checkinId:{type:String},
            reservationId:{type:String},
            arrivalDate:{type:Date},
            arrivalTime :{type:String},
            departureDate:{type:Date},
            departureTime:{type:String},
            dirty:{type:Boolean,default:false},
            maintainance:{type:Boolean,default:false},
            blocked:{type:Boolean,default:false},
            occupied:{type:Boolean,default:false},
            transDate:{type:Date,default:Date.now()},
            dateString:{type:String}
            })

 const occupancy = db.model('dailyroomStatus',newRoom )  

 async function saveReservationDetails(bookingDetai) {
    console.log(bookingDetai,'booking details')
    let bookingDetails =  bookingDetai 
    console.log(bookingDetails)     
        let tempDate = bookingDetails.arrivalDate.split('T');
        let startDate =  tempDate[0]
        tempDate = bookingDetails.departureDate.split('T');
        let startTime = tempDate[1];
        
        let endDate = tempDate[0];
        let endTime = tempDate[1];
        console.log(startDate,startTime,endDate,endTime);
        const reservationDetails = await checkinDetails.checkIn.findOne({ reservationNumber: bookingDetails.reservedDetails.reference })
         
        while (startDate <= endDate) {
            let dailyEntry = {
                occupancyIndex: await adminController.getIndex('OCCUPANCY'),
                companyIndex: bookingDetails.companyID,
                roomType: bookingDetails.tariffIndex,
                userCreated: bookingDetails.custId,
                totalOccupancy: bookingDetails.totalGuest,
                guestId: bookingDetails.custId,
                specialRent:  reservationDetails.specialRate ,
                reservationId: bookingDetails.reservedDetails.reference,
                checkinPlan: reservationDetails.CheckinPlan,
                transDate: startDate, // You need to format the date here
                startTime: startTime,
                endTime: endTime,
                dateString:startDate,
            }
            const save = await occupancy.updateOne({reservationId:bookingDetails.reservationNumber,transDate:startDate},{$set:dailyEntry},{upsert:true}) 
            console.log(save,'dailyroomStatus');
            startDate++;
            startTime = '00:00:00';
            if (startDate=== endDate) {
                endTime = bookingDetails.departureTime;
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
