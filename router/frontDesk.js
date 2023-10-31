
const express = require('express')
const router = express.Router();
const frontDesk = require('../controller/frontDesk') 
//router.get('/',frontDesk.getRoot )
router.get('/',frontDesk.getModuleRoute);
router.post('/loadCheckin',frontDesk.postloadCheckin)
router.post('/SaveCheckin',frontDesk.postSaveCheckin )

module.exports= router
