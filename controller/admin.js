const express = require('express')
const { route } = require('./rooms')
const router  = express.Router()
const HBank = require('../model/humanbank')
const checkin = require('../model/checkIn')
const reserv = require('../functions/reservation')
const fntcompany = require('../functions/company')
const utils = require('../functions/commonUtils')


router.get('/',async (req,res)=>{
   
    res.render('adminlogin')
})
module.exports = router

router.post('/adminLogin',async (req,res)=>{
    req.body.session = req.sessionID;
    const result =await HBank.verifyUser(req.body)   
    if(result.verified){
        res.json({verified:true,path:'/admin/dashBoard'})
    }
    else{
        res.json({verified:false,path:'/admin'})
    }

})

router.post('/disableUser',async (req,res)=>{
    const active =await  HBank.HumanResource.findOne({hrId:req.body.hrId},{Active:1,_id:0})
    console.log(active);
    let result ={
        active:false,
        message:''
    }
    if(active.Active){
        await HBank.HumanResource.updateOne({hrId:req.body.hrId},{$set:{Active:false,activeSession:null}})
        result.active=false;
        result.message='user disabled'
    }
    else{
        await  HBank.HumanResource.updateOne({hrId:req.body.hrId},{$set:{Active:true}})
        result.active=true;
        result.message='user activated'
    }
    res.json( result)
})


router.get('/dashboard',async (req,res)=>{
    req.body.session = req.sessionID;
    const result =await HBank.verifyUser(req.body)  
    const activeUsers =  await  HBank.HumanResource.find({deleted:false},{hrId:1,_id:0,firstName:1,email:1,contactNumber:1,Active:1})  
    const hotels = await fntcompany.getCompanySummary()
    console.log(activeUsers);

    let user = ''
    if(result.verified){
        user=  result.userdetails
        const today = new Date()
        console.log(today);
        const { firstDay, lastDay } = utils.getFirst_lastDayOfMonth(new Date()); 
        console.log(firstDay, lastDay)
          

        const monthlyReservationsa = await reserv.getdatewiseBookingMonth(firstDay,lastDay)
            let tempDate = new Date(firstDay);
            let bookings=[];
                while(tempDate< new Date(lastDay)){
                    let flag =0; 
                    monthlyReservationsa.forEach(element => {
                        if( element.transdate.getTime()==tempDate.getTime() ){
                            bookings.push(element)
                            flag++
                             
                        }    
                    });
                    if(!flag){
                        bookings.push({
                            transdate:new Date(tempDate),
                            totalRoom:0
                        })
                    }
                     
                    
                    tempDate.setDate(tempDate.getDate()+1)
                }
                 
        
           res.render('adminDashBoard',{user,bookings,activeUsers,hotels})
    }
    else{
        
        res.render('adminlogin') 
    }

    
})