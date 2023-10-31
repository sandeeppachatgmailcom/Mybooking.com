const express = require('express')
const router = express.Router();
const companies = require('../model/company')
const HBank = require('../model/humanbank');
const tariff = require('../model/tariff');
const controller = require('../controller/adminController')
const tariffmaster = require('../model/tariff')
const checkinPlans = require('../model/planMaster');
const rooms = require('../model/rooms');
const floorMaster   = require('../model/floor');
const checkinmaster = require('../model/checkIn');
const payment = require('../model/payments');
const reception = require('../model/checkinDetails')
const dailyoccupancy = require('../model/occupancydetails')
const fntReservation = require('../functions/reservation')
const hotel = require('../controller/hotelHomePage')


router.get('/',hotel.getRoot)
router.post('/addoccupancy',hotel.postaddoccupancy)
router.post('/unlinkRoom',hotel.postunlinkRoom) 
router.post('/updateReservationWithRoom',hotel.postupdateReservationWithRoom)
router.post('/loadAvailableRooms',hotel.postloadAvailableRooms)
router.get('/loadhomepage',hotel.getloadhomepage);
router.post('/loadhomepage', hotel.postloadhomepage);
router.post('/saveTariff',hotel.postsaveTariff);
router.post('/disableTariff',hotel.postdisableTariff);
router.post('/enableTariff',hotel.postenableTariff);
router.post('/deletetariffPermanent',hotel.postdeletetariffPermanent);
router.post('/savePlanToCompanies',hotel.postsavePlanToCompanies);
router.post('/activatePlan',hotel.postactivatePlan);
router.get('/loadtariff', hotel.getloadtariff);



module.exports = router;