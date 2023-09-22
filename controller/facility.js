const express = require('express');
const router = express.Router()
const facilty = require('../model/facilty')
router.get('/facilty',async (req,res)=>{
 const facility = await facilty.loadAllfacilty()
 console.log(facility);
 if(!facility) facility = {}; 
    res.render('Services',{facility})
})

router.post('/saveFacilty',async (req,res)=>{
   console.log('Reached Backend');
    const result1 = await facilty.SaveFacilty(req.body)
    console.log(req.body);
       res.json(result1);
   })
module.exports = router;