const express = require('express')
const router = express.Router();
const midware = require('../middleware/multer')
const companies = require('../model/company')
const tariffs = require('../model/tariff')
const checkinplans = require('../model/planMaster')
const ejs = require('ejs')
const human = require('../model/humanbank')
const controller = require('../controller/adminController')
const ftnReservation = require('../controller/ftnReservation')
   
router.post('/viewReservation',async (req,res)=>{
    let temp = req.body.bookingDetails.split(',');
    let extrapax =parseInt(req.body.guestCount)- parseInt(req.body.roomCount*2)
    if (extrapax<0) extrapax=0  
    const BookingSummary={
     totalRoom : req.body.roomCount,
     totalGuest : req.body.guestCount,
     extraPax:extrapax,
     companyID : temp[0],
     tariffIndex : temp[1],
     arrivalDate : controller.formatDate( temp[2].split('T')[0]),
     arrivalTime: temp[2].split('T')[1],
     departureDate : controller.formatDate(temp[3].split('T')[0]),
     departureTime: temp[3].split('T')[1],
     totalDays:controller.calculateDays(temp[2],temp[3])
}
const user = await human.HumanResource.findOne({activeSession:req.sessionID})

    
if(user){
    
    req.body.CompanySearchKey = temp[0];
    const company=await companies.SearchbyCompanyByAny(req.body)
    const checkinplan = company.checkinplan.filter(item => item.deleted===false);
    const tariffplans = company.roomtypes.filter(item=> item.tariffIndex===BookingSummary.tariffIndex)
     
    res.render('confirmReservation',{user,company,checkinplan,tariffplans,BookingSummary})
} 
else  {res.redirect('/')}     
})
 
router.post('/confirmBooking',(req,res)=>{
    res.json(req.body);
    let temp = req.body.bookingDetails.split(',');
    const BookingSummary={
     totalRoom : req.body.roomCount,
     totalGuest : req.body.guestCount,
     companyID : temp[0],
     tariffIndex : temp[1],
     arrivalDate : temp[2],
     departureDate : temp[3],
}

 
})

router.post('/customSearch',async (req,res)=>{
     
    
    const generalData = await companies.SearchCompany('')
    const user = {
        firstName:req.cookies.username
    }
    const tariff = await tariffs.loadtariff('')
    let district = new Set();
    const inputData = req.body;
    const pincode = generalData.forEach(element => {
        district.add(element.district )
    });
        
        
     let result = await companies.company.find({district:{ $regex: `^${req.body.ditrictName}`, $options: 'i' },deleted:false,
     "roomtypes.tariffIndex": { $regex: `^${req.body.roomCategoryID}`, $options: 'i' },
     "roomtypes.SpecialRent":{$gte:req.body.budgetStart},
     "roomtypes.SpecialRent":{$lte:req.body.budgetEnd}})
        res.render('detailedSearch',{user,result,generalData,tariff,district,inputData} )
        res.json()
    
    
   
})
router.use('/TariffSearch',async (req,res)=>{
    
    const generalData = await companies.SearchCompany('')
    const tariff = await tariffs.loadtariff('')
    let district = new Set();
  
    const pincode = generalData.forEach(element => {
        district.add(element.district )
    });
       
    let result = await tariffs.loadtariffWithAny(req.body);
    result = result[0]
    
    const tariffDetails= result.tariff

     
    const inputData = req.body
    res.render('companyWiseDetails',{inputData,generalData,tariff,result,district,tariffDetails});
     
})
router.use('/loadPlans',async(req,res)=>{
    
    plans = await checkinplans.LoadPlan();
    
    res.json(plans);
})

router.post('/loadHotelDetails', async (req, res) => {
    const reservationSummary = await ftnReservation.getReservationDateWise(req.body.StartDate, req.body.EndDate, req.body.hotelId);
    const totalRoomSummary = await ftnReservation.getRoomAvailalability(req.body.hotelId);
 
    let maximumReservation = {};
    for (const item of reservationSummary) {
        const tariffIndex = item.tariffIndex;
        if (!item.reservationCount) item.reservationCount = 0;
        
        if (!maximumReservation[tariffIndex]) {
            maximumReservation[tariffIndex] = item.reservationCount;
        } else if (maximumReservation[tariffIndex] < item.reservationCount) {
            maximumReservation[tariffIndex] = item.reservationCount;
        }
    } 
    req.body.CompanySearchKey = req.body.hotelId;
    let comp  = await companies.SearchbyCompanyByAny(req.body);
    let result = JSON.stringify( comp)
    result = JSON.parse(result)
    console.log(comp);
    let roomtypes =[];
    // Update room types with maximum reservation counts
    
    for (let i=0;i<result.roomtypes.length;i++) {
        
        
        const tariffIndex = result.roomtypes[i].tariffIndex;
        if (maximumReservation[tariffIndex]) {
            result.roomtypes[i].reservationCount = maximumReservation[tariffIndex]
        } else {
           result.roomtypes[i].reservationCount = 0; 
        }
        for (let k=0;k<totalRoomSummary.length;k++){
             
            
            if(totalRoomSummary[k].roomType==tariffIndex){
                result.roomtypes[i].totalRoom = totalRoomSummary[k].roomCount; 
                console.log(result.roomtypes[i],'tariFFIndex');
            }
        }
    }
    console.log(result);
    res.json(result);
});


 

module.exports = router;