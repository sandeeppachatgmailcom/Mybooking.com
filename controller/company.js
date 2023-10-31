//const userModel = require('../Model/userModel')
const cookie = require('cookie-parser');

const { Document } = require('mongoose');
const memoryCache = require('memory-cache');
const multer = require('../middleware/multer') 
const express = require('express');
const router = express.Router();
const companies = require('../model/company') 
const pincodes = require('../model/pincode') 
const HBank = require('../model/humanbank') 
const tariff = require('../model/tariff')
const checkinPlans = require('../model/planMaster')
const rooms = require('../model/rooms')
const getRoot = (req,res)=>{
  res.redirect('/hotel')
} 
const postloadcustommer = async (req,res)=>{
    
    const result = await company.loadcompany('');
    
    res.json(result);
} 
const postswitchRoomStatus = async (req,res)=>{
  let result = await rooms.depart.findOne({roomIndex:req.body.roomIndex},{blocked:1,_id:0})
  if(result.blocked){
       await rooms.depart.updateOne({roomIndex:req.body.roomIndex},{$set:{blocked:false}})
  }
  else {
       await rooms.depart.updateOne({roomIndex:req.body.roomIndex},{$set:{blocked:true}})
  }
  const reply = await rooms.depart.findOne({roomIndex:req.body.roomIndex},{blocked:1,_id:0})
  
  res.json(reply);
} 
const getloadTariff = async (req,res)=>{
    req.body.session = req.sessionID;
    const result =await HBank.verifyUser(req.body)  
    const user = await HBank.HumanResource.findOne({activeSession: req.sessionID, deleted: false },{password:0});
    if(result.verified){
      const profile = await companies.company.findOne({email:user.email});
        if(!profile){
          res.redirect('/custom/customSearch')
          return
        }
        const activtariff = await tariff.loadtariff('');
        let existingTariff = profile.roomtypes;
        let tariffPackages=[];
        for (let i=0;i<activtariff.length;i++){
        let flag=0;
            for (let j=0;j<existingTariff.length;j++){
                if(existingTariff[j].tariffIndex==activtariff[i].tariffIndex){
                tariffPackages.push(existingTariff[j])
                flag++;
                break;
                }
            }
            if(!flag){
            tariffPackages.push(activtariff[i])
            await companies.company.updateOne(
                { CompanyID: profile.CompanyID },
                { $push: { "roomtypes": activtariff[i] } },
                { upsert: true }
            );
            }
        }
        res.cookie('userName',req.body.userName)
        let   availablerooms
        let   inputs 
        let   Plans 
        let   floors 
        let   category 
        let reservation 
        let payments
        let occupancyDetails 
        res.render('companyhomePage', { user, tariffPackages, profile, inputs,Plans,availablerooms,floors,category,reservation,payments,occupancyDetails });
    }
    else{
        res.redirect('/')
      }  
  
} 

const getloadPlan = async (req,res)=>{
    req.body.session = req.sessionID;
    const result =await HBank.verifyUser(req.body)  
    const user = await HBank.HumanResource.findOne({activeSession: req.sessionID, deleted: false },{password:0});
    if(result.verified){
      const profile = await companies.company.findOne({email:user.email});
        if(!profile){
          res.redirect('/custom/customSearch')
          return
        }

        const activePlans = await checkinPlans.LoadPlan();
        let existingPlan = profile.checkinplan;
        let Plans = [];
        for (let i=0;i<activePlans.length;i++){
        let flag=0;
        for(let j=0;j<existingPlan.length;j++){
          if( existingPlan[j].planIndex==activePlans[i].planIndex   ){
               Plans.push(existingPlan[j])
               flag++; 
               break;
          }
           
        }
        if(!flag) {Plans.push(activePlans[i])
          await companies.company.updateOne(
                    {CompanyID:profile.CompanyID},
                    {$push:{"checkinplan":activePlans[i]}},
                    {upsert:true}
                    );}
      }
        res.cookie('userName',req.body.userName)
        let  availablerooms 
        let  inputs  
        let  tariffPackages 
        let  floors   
        let  category   
        let reservation 
        let payments
        let occupancyDetails 
        
        res.render('companyhomePage', { occupancyDetails ,user, tariffPackages, profile, inputs,Plans,availablerooms,floors,category,reservation,payments });
    }
    else{
        res.redirect('/')
      }  
  

    }  

const getloadRoom = async (req,res)=>{
    req.body.session = req.sessionID;
    const result =await HBank.verifyUser(req.body)  
    const user = await HBank.HumanResource.findOne({activeSession: req.sessionID, deleted: false },{password:0});
     
    if(result.verified){
        const profile = await companies.company.findOne({email:user.email});
        if(!profile){
          res.redirect('/custom/customSearch')
          return
        } 

        const availablerooms =await rooms.loadroomByCompanyId(profile.CompanyID);
         
        res.cookie('userName',req.body.userName)
        let tariffPackages 
        let  inputs ;
        let  Plans  ;
        let  floors ;
        let  category ;
        let reservation 
        let payments;
        let occupancyDetails ;
        
        res.render('companyhomePage', { occupancyDetails ,user, tariffPackages, profile, inputs,Plans,availablerooms,floors,category,reservation,payments });
    }
    else{
        res.redirect('/')
      }  
  

    } 
// /Company
const getCompany = async(req,res)=>{
    let data = await companies.SearchCompany('');
    let count = data.length;
    count = Math.floor(count/10);
    count++;
    let pincode =  await pincodes.loadPincode(req.body)
     
    res.render('companies',{data,count,pincode});

} 

const postSaveCompany =  async (req,res)=>{
     
    let imgArray = [];
    for (let i = 0; i < req.files.length; i++) {
      imgArray.push('http://localhost:5200/Images/'+req.files[i].filename);
    }
    req.body.imagearray = imgArray;
    let result =await companies.saveCompany(req.body) ;
    if((result.modifiedCount + result.upsertedCount)>0){result = {saved:true}}
    else {result={saved:false}}
    res.json(result)
    } 

const postsearchCompany =async (req,res)=>{
    let data = await companies.SearchCompany(req.body.searchvalue);
    res.render('human',{data});
}  
const postDeleteCompany =  async (req, res) => {
    let result = await companies.deleteCompany(req.body.hrId)
    if ((result.modifiedCount + result.upsertedCount) > 0) { result = { deleted: true } }
    else { result = { deleted: false } }
    res.json(result)
} 

module.exports={postloadcustommer,getRoot,postswitchRoomStatus,getloadTariff,getloadPlan,
  getloadRoom,getCompany,postSaveCompany,postsearchCompany,postDeleteCompany};