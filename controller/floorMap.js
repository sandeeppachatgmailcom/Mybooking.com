const express = require('express');
const router = express.Router();
const department = require('../model/rooms')
const tarifftype = require('../model/tariff')
const roomsDetails = require('../model/rooms')
const floors = require('../model/floor')

const verifyAccess = require('../middleware/userAccess')

const getRoot = (req,res)=>{
    res.redirect('/admin')
} 

const getfloorMap = async (req, res) => {
    let rooms = await department.getRoomsWithTariffDetails();
    let tariff = await tarifftype.loadtariff('')
    let floor = await floors.loadAllFloor();
    res.render('floorMap', { rooms, tariff,floor })
} 

const postAggregatePage = async (req, res) => {
    
    let result = await getRoomsWithAllDetails(req.body)
     
    res.json(result);
} 

async function getRoomsWithAllDetails(DataObj) {


    try {
         
        const results = await roomsDetails.depart.aggregate([
            {
                $lookup: {
                    from: 'rooms',
                    localField: 'roomIndex',
                    foreignField: 'roomIndex',
                    as: 'roomsDetail',
                }
            },
            {
                $lookup: {
                    from: 'tariffmasters',
                    localField: 'roomType',
                    foreignField: 'tariffIndex',
                    as: 'tariffMaster',
                }
            },
            {
                $match: {
                    "roomsDetail.roomIndex": {
                        $regex: new RegExp(DataObj.RoomIndex, "i")
                    },
                    "roomsDetail.floor": {
                        $regex: new RegExp(DataObj.floorIndex, "i")
                    },
                    "roomsDetail.blocked": DataObj.blocked,
                    "roomsDetail.roomType": {
                        $regex: new RegExp(DataObj.TariffIndex, "i")
                    }
                     
                }
            }

        ]);
         
        return results;
    } catch (error) {
        console.error(error);
    }
}
module.exports = {getRoot,getfloorMap,postAggregatePage,getRoomsWithAllDetails}
