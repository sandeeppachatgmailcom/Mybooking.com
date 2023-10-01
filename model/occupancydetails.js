const mongoose = require('mongoose');
const db = require('./mongoose');
adminController = require('../controller/adminController')


const newRoom = new mongoose.Schema({
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
        arrivalTime :{type:timeStamp},
        departureTime:{type:timeStamp},
        dirty:{type:Boolean,default:false},
        maintainance:{type:Boolean,default:false},
        blocked:{type:Boolean,default:false},
        occupied:{type:Boolean,default:false},
        transDate:{type:Date,default:Date.now()},
        })
