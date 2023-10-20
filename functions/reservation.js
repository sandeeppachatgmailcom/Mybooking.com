const mongoose = require('mongoose');
const db = require('../model/mongoose');

const HBank = require('../model/humanbank')
const checkin = require('../model/checkIn')

async function searchReservationBydate(fromDate,toDate){
    const reservation = await checkin.checkIn.find({arrivalDate:{$gte:new Date(fromDate),$lte: new Date(toDate) },delete:false})
    return reservation;
}

async function getdatewiseBookingMonth(fromDate,toDate){
    const data = await checkin.checkIn.aggregate([
        {
            $match:{
                arrivalDate: {
                    $gte: new Date(fromDate),
                    $lte: new Date(toDate)
                }       
            }
        },
        {
           $group:{
            _id:{
                year:{$year:'$arrivalDate'},
                month:{$month:'$arrivalDate'},
                day:{$dayOfMonth:'$arrivalDate'}
            },
            totalRoom:{$sum:'$totalRoom'}
           } 
        },
        {
            $project:{
                _id:0,
                transdate:{
                    $dateFromParts: {
                        year: '$_id.year',
                        month: '$_id.month',
                        day: '$_id.day'
                      }
                },
                totalRoom: 1
            }
        },
        {
            $sort: { date: 1 }
        }]);

        return data
}

module.exports ={searchReservationBydate,getdatewiseBookingMonth}
