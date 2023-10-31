const cookie = require('cookie-parser');
const { Document } = require('mongoose');
const memoryCache = require('memory-cache');
const multer = require("multer")
const express = require('express');
const router = express.Router();
const session = require('express-session');
const { render } = require('ejs');
const CheckinPlan = require('../model/planMaster')
const adminController = require('../controller/adminController')
const getRoot = (req,res)=>{
    res.redirect('/admin')
} 


const postsaveCheckinplan = async(req,res)=>{
    
    
    if (!req.body.planIndex){req.body.planIndex=await adminController.getIndex('CheckinPlan')}
    console.log(req.body)
    const data = {
    planIndex:req.body.planIndex,
    planName:req.body.planName,
    shortName:req.body.shortName, 
    maxPax:req.body.maxPax, 
    amount:req.body.amount, 
    extraCharge:req.body.extraCharge, 
    discription:req.body.discription,
    Creattime:req.body.Creattime, 
    user:req.body.user, 
    LastUpdate:req.body.LastUpdate,
    deleted:false,
    }
    console.log(data);
    let result = await CheckinPlan.saveCheckinPlan(data) ;
    res.json(result);

} 
const getplan = async (req,res)=>{
    const plans = await CheckinPlan.LoadPlan();
    res.render('checkinPlans',{plans})
} 
const postdeletePlan = async (req,res)=>{
    console.log(req.body);
    const result = await CheckinPlan.deleteCheckinPlan(req.body);
    res.json(result)
} 
module.exports = {getRoot,postsaveCheckinplan,getplan,postdeletePlan}