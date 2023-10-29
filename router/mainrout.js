const express = require('express')
const router = express.Router(); 
const access = require('../model/formAccess') 
const rooms = require('../controller/rooms')
const multer = require('multer') 
const roomcat = require('../controller/tariff')
const verifyAccess = require('../middleware/userAccess')
const CheckinPlan = require('../controller/checkinPlan')
const frontDesk = require('../controller/frontDesk')
const hbank = require('../controller/human') 
const floorMaster = require('../controller/floorMaster')
const floorMap = require('../controller/floorMap') 
const userAuthentic = require('../controller/userauthentication')
const userfacilty = require('../controller/facility')
const DocumentUpload = require('../controller/DocumentUpload')
const company = require('../controller/company')
const companies = require('../model/company')
const tariffs = require('../model/tariff')
const customSearch = require('../controller/custommerSeach')
const hotelshomePage = require('../controller/hotelHomePage')
const clearCache = require('../middleware/userAccess')
const reservation = require('../controller/reservation')
const personalProfile = require('../controller/userprofile')
const admin = require('../controller/admin')
const ImageDoc = require('../controller/documentMaster')
const Hbank = require('../model/humanbank')
router.use(clearCache.clearCache);





router.use('/checkin',frontDesk)
router.use('/frontOffice',frontDesk)
router.use('/rooms',rooms)
router.use('/Human',hbank)
router.use('/floorMaster',floorMaster)
router.use('/roomType',roomcat)
router.use('/checkinplan',CheckinPlan)
router.use('/floorMap',floorMap)
router.use('/authenticate',userAuthentic)
router.use('/facilty',userfacilty)
router.use('/admincontroller',userAuthentic)
router.use('/DocumentUpload',DocumentUpload)
router.use('/Company',company)
router.use('/custom',customSearch)
router.use('/vedurehomepage',hotelshomePage)
router.use('/hotel',hotelshomePage)
router.use('/reservation',reservation)
router.use('/user',personalProfile)
router.use('/admin',admin)
router.use('/imageDoc',ImageDoc)
 










router.get('/' ,async (req, res) => {
    try {
        req.body.session = req.sessionID;
        let result  = await Hbank.verifyUser(req.body)
        let user =''
        console.log(result);
        if(result.userdetails){
          user ={firstName : result.userdetails.firstName}
        }


        const generalData = await companies.SearchCompany('')
        const tariff = await tariffs.loadtariff('')
        let district = new Set();
        const pincode = generalData.forEach(element => {
            district.add(element.district )
        });
        const pagename ='custommerPage'; 
        res.cookie('page',pagename)
            res.render(pagename,{user,district,tariff,generalData })
    }
    catch (err) { console.log(err.message) }

})

module.exports=router;
