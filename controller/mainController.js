const cookie = require('cookie-parser');
const { Document } = require('mongoose');
const memoryCache = require('memory-cache');
const multer = require("multer")
const express = require('express');
const session = require('express-session');
const { render } = require('ejs');
const HBank = require('../model/humanbank');
const DBcollections = require('../model/DBcollections');
const floor = require('../model/floor')
const department = require('../controller/rooms')
const tariff = require('../controller/tariff')
const rooms = require('../model/rooms')
const human = require('../model/humanbank')
const modeltariff = require('../model/tariff')

const userlog = require('../controller/userauthentication')

 

const getCheckinPlan=async (req,res)=>{
    res.render('checkinPlans')
}





    
 


module.exports = {getCheckinPlan}