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
router.use(clearCache.clearCache);
router.get('/' ,async (req, res) => {
    try {
        user = {
                email:'',
                firstName:'',
                username:''
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

router.use('/checkin',verifyAccess.VerifyAccess,frontDesk)
router.use('/frontOffice',verifyAccess.VerifyAccess,frontDesk)
router.use('/rooms',verifyAccess.VerifyAccess,rooms)
router.use('/Human',verifyAccess.VerifyAccess,hbank)
router.use('/floorMaster',verifyAccess.VerifyAccess,floorMaster)
router.use('/roomType',verifyAccess.VerifyAccess,roomcat)
router.use('/checkinplan',verifyAccess.VerifyAccess,CheckinPlan)
router.use('/floorMap',verifyAccess.VerifyAccess,floorMap)
router.use('/authenticate',userAuthentic)
router.use('/facilty',verifyAccess.VerifyAccess,userfacilty)
router.use('/admincontroller',verifyAccess.VerifyAccess,userAuthentic)
router.use('/DocumentUpload',verifyAccess.VerifyAccess,DocumentUpload)
router.use('/Company',verifyAccess.VerifyAccess,company)
router.use('/custom',verifyAccess.VerifyAccess,customSearch)
router.use('/vedurehomepage',verifyAccess.VerifyAccess,hotelshomePage)
router.use('/reservation',verifyAccess.VerifyAccess,reservation)

module.exports=router;
