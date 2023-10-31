const multer = require('../middleware/multer') 
const express = require('express');
const router = express.Router();
const companies = require('../controller/company') 

router.get('/',companies.getRoot)
router.post('/loadcustommer',companies.postloadcustommer)
router.post('/switchRoomStatus',companies.postswitchRoomStatus)
router.get('/loadTariff',companies.getloadTariff)
router.get('/loadPlan', companies.getloadPlan)
router.get('/loadRoom',companies.getloadPlan)
router.get('/Company',companies.getCompany)
router.post('/SaveCompany',companies.postSaveCompany)
router.post('/searchCompany', companies.postsearchCompany)
router.post('/DeleteCompany', companies.postDeleteCompany)

module.exports=router;