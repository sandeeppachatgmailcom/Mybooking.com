const express = require('express')
const router = express.Router();
const midware = require('../middleware/multer')
const companies = require('../model/company')
const tariffs = require('../model/tariff')
const checkinplans = require('../model/planMaster')
const ejs = require('ejs')
  


router.post('/confirmBooking',(req,res)=>{

     
    console.log(req.body,'sadffffffffffffffffffff')

     
    res.json(req.body);
})

router.post('/customSearch',async (req,res)=>{
 
    const generalData = await companies.SearchCompany('')
    const user = {}
    const tariff = await tariffs.loadtariff('')
    let district = new Set();
    const inputData = req.body;
    const pincode = generalData.forEach(element => {
        district.add(element.district )
    });
       
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