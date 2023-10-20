const express = require('express')
const { route } = require('./rooms')
const router  = express.Router()
const HBank = require('../model/humanbank')
const checkin = require('../model/checkIn')
const reserv = require('../functions/reservation')
const utils = require('../functions/commonUtils')

router.get('/',(req,res)=>{
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

router.get('/dashboard',async (req,res)=>{
    req.body.session = req.sessionID;
    const result =await HBank.verifyUser(req.body)   

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
                 
        
           res.render('adminDashBoard',{user,bookings})
    }
    else{
        
        res.render('adminlogin') 
    }

    
})