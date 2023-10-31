const express = require('express')
const router = express.Router(); 
const access = require('../model/formAccess') 

const multer = require('multer') 

const verifyAccess = require('../middleware/userAccess')









const companies = require('../model/company')
const tariffs = require('../model/tariff')

const clearCache = require('../middleware/userAccess')


const ImageDoc = require('../router/documentMaster')
const Hbank = require('../model/humanbank')




const userAuthentic = require('../router/userauthentication')
const personalProfile = require('../router/userprofile')
const frontDesk = require('../router/frontDesk')
const rooms = require('../router/rooms')
const hbank = require('../router/human') 
const floorMaster = require('../router/floorMaster')
const roomcat = require('../router/tariff')
const CheckinPlan = require('../router/checkinPlan')
const floorMap = require('../router/floorMap') 
const userfacilty = require('../router/facility')
const DocumentUpload = require('../router/DocumentUpload')
const company = require('../router/company')
const customSearch = require('../router/custommerSeach')
const hotelshomePage = require('../router/hotelHomePage')
const reservation = require('../router/reservation')
const admin = require('../router/admin')
router.use(clearCache.clearCache);





router.use('/checkin',frontDesk)
router.use('/frontOffice',frontDesk)
router.use('/rooms',rooms)
router.use('/authenticate',userAuthentic)
router.use('/admincontroller',userAuthentic)
router.use('/Human',hbank)
router.use('/floorMaster',floorMaster)
router.use('/roomType',roomcat)
router.use('/checkinplan',CheckinPlan)
router.use('/floorMap',floorMap)
router.use('/facilty',userfacilty)
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
