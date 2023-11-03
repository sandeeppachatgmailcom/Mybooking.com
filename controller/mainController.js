const cookie = require('cookie-parser');
const { Document } = require('mongoose');
const memoryCache = require('memory-cache');
const multer = require("multer")
const express = require('express');
const session = require('express-session');
const { render } = require('ejs');
const HBank = require('../functions/humanbank');
const DBcollections = require('../functions/DBcollections');
const floor = require('../functions/floor')
const department = require('../controller/rooms')
const tariff = require('../controller/tariff')
const rooms = require('../functions/rooms')
const human = require('../functions/humanbank')
const modeltariff = require('../functions/tariff')

const userlog = require('../controller/userauthentication')

 

const getCheckinPlan=async (req,res)=>{
    res.render('checkinPlans')
}





    
 


module.exports = {getCheckinPlan}