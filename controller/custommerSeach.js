const express = require('express')
const router = express.Router();
const midware = require('../middleware/multer')
const companies = require('../model/company')
const tariffs = require('../model/tariff')
const checkinplans = require('../model/planMaster')
  

router.post('/customSearch',async (req,res)=>{
    console.log(req.body);
    const generalData = await companies.SearchCompany('')
    const tariff = await tariffs.loadtariff('')
    let district = new Set();
    const inputData = req.body;
    const pincode = generalData.forEach(element => {
        district.add(element.district )
    });
       
     const result = await companies.company.find({district:req.body.ditrictName,deleted:false,"roomtypes.tariffIndex":req.body.roomCategoryID})

        res.render('detailedSearch',{result,generalData,tariff,district,inputData} )
    
   // res.json(result);
    
})
router.use('/TariffSearch',async (req,res)=>{
    console.log(req.body,'lastpage designed ')
    const generalData = await companies.SearchCompany('')
    const tariff = await tariffs.loadtariff('')
    let district = new Set();
  
    const pincode = generalData.forEach(element => {
        district.add(element.district )
    });
       
    let result = await tariffs.loadtariffWithAny(req.body);
    result = result[0]
    
    const tariffDetails= result.tariff
    console.log(result.tariff);
    const inputData = req.body
    res.render('companyWiseDetails',{inputData,generalData,tariff,result,district,tariffDetails});
     
})
router.use('/loadPlans',async(req,res)=>{
    
    plans = await checkinplans.LoadPlan();
    console.log(plans);
    res.json(plans);
})

 

module.exports = router;