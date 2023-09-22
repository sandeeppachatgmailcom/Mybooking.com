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
    const pincode = generalData.forEach(element => {
        district.add(element.district )
    });
       
    
    const result = await companies.company.aggregate([
        {
            $lookup:{
                from: 'tariffmasters',
                localField: 'CompanyID',
                foreignField: 'CompanyID',
                as: 'tariffDetails',
            }
        },
        {
            $match:{
                "district":new RegExp(req.body.SearchText, "i") 
            }
        } 
        ,
        
        {
            $match:{
                "tariffDetails.tariffIndex":new RegExp(req.body.roomCategoryID, "i") 
            }
        } ])
        console.log(generalData);
    
        res.render('detailedSearch',{result,generalData,tariff,district} )
    
   // res.json(result);
    
})
router.use('/TariffSearch',async (req,res)=>{
    console.log(req.body)
    const result = await tariffs.loadtariffWithAny(req.body);
    console.log(result);
    res.render('companyWiseDetails');
     
})
router.use('/loadPlans',async(req,res)=>{
    
    plans = await checkinplans.LoadPlan();
    console.log(plans);
    res.json(plans);
})

 

module.exports = router;