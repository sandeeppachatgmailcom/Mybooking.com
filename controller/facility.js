const express = require('express');
const router = express.Router()
const facilty = require('../functions/facilty')
const HBank = require('../functions/humanbank')

const getRoot = (req,res)=>{
   res.redirect('/admin')
} 
const getfacilty = async (req,res)=>{
   req.body.session = req.sessionID;
   let user = ''
   const verify = await HBank.verifyUser(req.body)
   if (verify.verified) {
      user = verify.user;

   }
   else {
      res.redirect('/admin')
   }

 const facility = await facilty.loadAllfacilty()
 console.log(facility);
 if(!facility) facility = {}; 
    res.render('Services',{facility,user})
} 
const postsaveFacilty = async (req,res)=>{
   console.log('Reached Backend');
    const result1 = await facilty.SaveFacilty(req.body)
    console.log(req.body);
       res.json(result1);
} 
module.exports = {getRoot,getfacilty,postsaveFacilty};