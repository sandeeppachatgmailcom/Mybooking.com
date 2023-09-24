const express = require('express')
const router = express.Router();
const companies = require('../model/company')
const HBank = require('../model/humanbank');
const tariff = require('../model/tariff');
 
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
   res.render('companyhomePage', { user, tariffPackages,profile,inputs });
}catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred' });
    }
  
});



 

module.exports = router;