//const userModel = require('../Model/userModel')
const cookie = require('cookie-parser');

const { Document } = require('mongoose');
const memoryCache = require('memory-cache');
const multer = require("multer")
const express = require('express');
const router = express.Router();
const session = require('express-session');
const { render } = require('ejs');
const HBank = require('../functions/humanbank');
const DBcollections = require('../model/dbcollections');
const frontoffice = require('../functions/checkIn') 
const floor = require('../functions/floor')
const rooms = require('../functions/rooms')
const adminController = require('../controller/adminController')
const getRoot = (req,res)=>{
    res.redirect('/admin')
} 
const postloadcustommer = async (req,res)=>{
    console.log(req.body);
    const result = await HBank.loadHuman('');
    console.log(result);
    res.json(result);
} 
const gethuman = async(req,res)=>{
    req.body.session = req.sessionID;
    let user = ''
    const verify = await HBank.verifyUser(req.body)
    if (verify.verified) {
        user = verify.user;

    }
    else {
        res.redirect('/admin')
    }

    let data = await HBank.SearchHuman('');
    res.render('human',{data,user});
} 
const postSaveHuman = async (req,res)=>{
    req.body.session=req.sessionID;
    let result =await HBank.saveHuman(req.body) ; 
    if((result.modifiedCount )>0){
        result = {saved:true} 
        result.message= 'profile Edited successfully'}
    else if(( result.upsertedCount)>0){    
        result = {saved:true} 
        result.message= 'profile created successfully'}
     
    else {
        result={saved:false}
        result.message= 'Something went wrong please try again!!'}
    res.json(result)
} 
const postsearchHuman = async (req,res)=>{
    req.body.session = req.sessionID;
    let user = ''
    const verify = await HBank.verifyUser(req.body)
    if (verify.verified) {
        user = verify.user;

    }
    else {
        res.redirect('/admin')
    }

    let data = await HBank.SearchHuman(req.body.searchvalue);
    res.render('human',{data,user});
}  
const postDeleteHuman = async (req, res) => {
    let result = await HBank.deleteHuman(req.body.hrId)
    if ((result.modifiedCount + result.upsertedCount) > 0) { result = { deleted: true } }
    else { result = { deleted: false } }
    res.json(result)
} 

module.exports={getRoot,postloadcustommer,postDeleteHuman,postsearchHuman,postSaveHuman,gethuman};