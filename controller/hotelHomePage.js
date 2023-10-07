const express = require('express')
const router = express.Router();
const companies = require('../model/company')
const HBank = require('../model/humanbank');
const tariff = require('../model/tariff');
const controller = require('../controller/adminController')
const tariffmaster = require('../model/tariff')
const checkinPlans = require('../model/planMaster');
const rooms = require('../model/rooms')
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
     
    req.body.session = req.sessionID;
    const result =await HBank.verifyUser(req.body)   

    const user = await HBank.HumanResource.findOne({  activeSession: req.sessionID, deleted: false });
    if(user){
      const profile = await companies.company.findOne({email:req.body.userName});
      const activtariff = await tariff.loadtariff('');
      const activePlans = await checkinPlans.LoadPlan();
      let existingTariff = profile.roomtypes;
      let existingPlan = profile.checkinplan;
      const availablerooms = rooms.loadroomByCompanyId(profile.CompanyID);
      let Plans = existingPlan.filter(item1=>
      activePlans.some(item2=>item2.planIndex ==item1.planIndex)); 
     
      let tariffPackages = existingTariff.filter(item1 =>
      activtariff.some(item2 => item2.tariffIndex === item1.tariffIndex)
      );

      if(Plans.length<1){
        Plans = await checkinPlans.LoadPlan()
        Plans.map(async (element)=>{
          element.activated = false;
          await companies.company.updateOne(
            {CompanyID:profile.CompanyID},
            {$push:{"checkinplan":element}},
            {upsert:true}
            );
        });
      }

     if (tariffPackages.length < 1) {
        tariffPackages = await tariff.loadtariff('')
        const tariffPromises = tariffPackages.map(async (element) => {
        element.activated = false;
        const tempTariff = await companies.company.updateOne(
          { CompanyID: profile.CompanyID },
          { $push: { "roomtypes": element } },
          { upsert: true }
        );
       });
      await Promise.all(tariffPromises);
     }
    else {
     }
    res.cookie('userName',req.body.userName)
    res.render('companyhomePage', { user, tariffPackages, profile, inputs,Plans,availablerooms });
    
  }
    else{
      res.redirect('/')
    }
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }

});

router.post('/saveTariff', async (req, res) => {
  const newRoomType = {
    tariffName: req.body.tariffName,
    tariffIndex: req.body.tariffIndex,
    roomRentSingle: parseInt(req.body.roomRentSingle),
    extraPerson: parseInt(req.body.extraPerson),
    tax: parseInt(req.body.tax),
    includeChild: req.body.includeChild,
    defaultCheckinplan: req.body.defaultCheckinplan,
    Discription: req.body.Discription,
    username: req.body.username,
    SpecialRent: parseInt(req.body.specialRent),
    deleted: false
  };
  let result
   

  // Check if tariffIndex is not provided or falsy
  if (!newRoomType.tariffIndex) {
    newRoomType.tariffIndex = await controller.getIndex('TARIFF');
    result = await companies.company.updateOne(
      {
        CompanyID: req.body.CompanyID
      },
      {
        $push: { roomtypes: newRoomType }
      },
      {
        upsert:true
      }
    );   
    await tariffmaster.tariff.updateOne(
        { tariffIndex: newRoomType.tariffIndex },
        newRoomType,
        { upsert: true }
      );
  
      } else {
     result = await companies.company.updateOne(
      {
        CompanyID: req.body.CompanyID,
        'roomtypes.tariffIndex': newRoomType.tariffIndex
      },
      {
        $set: { 'roomtypes.$': newRoomType,
      
      } // Add to an array field
      },
       
    );
  }
    let response = {};
    if (result.modifiedCount > 0) {
      response = { update: true };
    } else if (result.upsertedCount > 0) {
      response = { saved: true };
    } else {
      response = { matched: true };
    }
    res.json(response);
});

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


router.post('/deletetariffPermanent',async (req,res)=>{

  const result = await tariff.tariff.updateOne(
    {
      tariffIndex:req.body.tariffIndex 
    },
    {
      $set:{deleted:true
      }
    }
  )
  
 let responce ={}
 if(result.modifiedCount>0) responce={update:true} 
 else if(result.upsertedCount>0) responce={saved:true}
 else if(!result.upsertedCount && result.matchedCount && result.modifiedCount ) responce={matched:true} 
 res.json(responce)
})

router.post('/savePlanToCompanies',async(req,res)=>{
   
   
    const addToComp = await companies.insertNewCheckinPlan(req.body)
   res.json(addToComp)
})
router.post('/activatePlan',async (req,res)=>{
  const result = await companies.activateCheckinplan(req.body);
  res.json(result);
})
module.exports = router;