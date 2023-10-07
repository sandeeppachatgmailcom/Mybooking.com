const express = require('express')
const router = express.Router();
const midware = require('../middleware/multer')
const companies = require('../model/company')
const tariffs = require('../model/tariff')
const checkinplans = require('../model/planMaster')
const ejs = require('ejs')
const human = require('../model/humanbank')
const controller = require('../controller/adminController')
   
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
    console.log(BookingSummary, tariffplans,'tariffplans')
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

console.log(BookingSummary);
})

router.post('/customSearch',async (req,res)=>{
    console.log(req.cookies)
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
       console.log(inputData,'input data',req.cookies , 'cookies');
     const result = await companies.company.find({district:{ $regex: `^${req.body.ditrictName}`, $options: 'i' },deleted:false,
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
router.post('/loadHotelDetails',async (req,res)=>{
     
    req.body.CompanySearchKey = req.body.hotelId
    result = await companies.SearchbyCompanyByAny(req.body)
    res.json(result)
})
 

module.exports = router;