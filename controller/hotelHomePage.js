const express = require('express')
const router = express.Router();
const companies = require('../model/company')
const HBank = require('../model/humanbank');
const tariff = require('../model/tariff');
const { route } = require('./rooms');
 
router.post('/loadhomepage', async (req, res) => {
   try {
    const inputs = req.body;

    const userlogrecord = {
      username: req.body.Username,
      sessionId: req.sessionID,
      folder: req.path,
      method: req.method,
      loggedOut: false,
      ip: req.ip,
    };

    // Find the user record
    const user = await HBank.HumanResource.findOne({
      $or: [
        { email: req.body.Username, password: req.body.Password, deleted: false },
        { contactNumber: req.body.Username, password: req.body.Password, deleted: false },
      ]
    }, { username: 1, _id: 0, email: 1 });

    // Find the company
    const  profile = await companies.company.findOne({ contactNumber: req.body.Username });
    let  tariffPackages = profile.roomtypes;
    console.log(tariffPackages,'tariffpackages');
    if( tariffPackages.length<1){
        tariffPackages = await tariff.loadtariff('')
        console.log(tariffPackages,'tariffpackages2');
        const tariffPromises = tariffPackages.map(async (element) => {
        element.activated = false;
        const tempTariff = await companies.company.updateOne(
        { CompanyID: profile.CompanyID },
        { $push: { "roomtypes": element } },
        { upsert: true, new: true }
      );
      
    
    });

       await Promise.all(tariffPromises);

   } 
   else {

   }
   res.cookie('username', req.body.Username)
   res.render('companyhomePage', { user, tariffPackages,profile,inputs });
}catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred' });
    }
  
});

router.post('/saveTariff',async (req,res)=>{
  const newRoomType = {
    tariffName:req.body.tariffName,
    tariffIndex:req.body.tariffIndex,
    roomRentSingle:parseInt(req.body.roomRentSingle),
    extraPerson:parseInt(req.body.extraPerson),
    tax:parseInt(req.body.tax),
    includeChild:req.body.includeChild,
    defaultCheckinplan:req.body.defaultCheckinplan,
    Discription:req.body.Discription,
    username:req.body.username,
    SpecialRent:parseInt(req.body.roomRentSingle),
    deleted:false
  }; 	
   console.log(newRoomType);
   const result = await companies.company.updateOne(
    {
      CompanyID: req.body.CompanyID,
      'roomtypes.tariffIndex': req.body.tariffIndex
    },
    {
      $set: {
        'roomtypes.$': newRoomType
      }
    }
  );
 let responce ={}
 if(result.modifiedCount>0) responce={update:true} 
 else if(result.upsertedCount>0) responce={saved:true}
 else if(!result.upsertedCount && matchedCount && result.modifiedCount ) responce={matched:true} 
 res.json(responce)

   
})

router.post('/disableTariff',async (req,res)=>{
  const result = await companies.company.updateOne(
    {CompanyID:req.body.CompanyID,
      'roomtypes.tariffIndex': req.body.tariffIndex
    },
    {
      $set:{"roomtypes.$.deleted":true
      
      }
    }
  )
  
 let responce ={}
 if(result.modifiedCount>0) responce={update:true} 
 else if(result.upsertedCount>0) responce={saved:true}
 else if(!result.upsertedCount && result.matchedCount && result.modifiedCount ) responce={matched:true} 
 res.json(responce)
  
})

router.post('/enableTariff',async (req,res)=>{
  const result = await companies.company.updateOne(
    {CompanyID:req.body.CompanyID,
      'roomtypes.tariffIndex': req.body.tariffIndex
    },
    {
      $set:{"roomtypes.$.deleted":false
      
      }
    }
  )
  
 let responce ={}
 if(result.modifiedCount>0) responce={update:true} 
 else if(result.upsertedCount>0) responce={saved:true}
 else if(!result.upsertedCount && result.matchedCount && result.modifiedCount ) responce={matched:true} 
 res.json(responce)
})

 

module.exports = router;