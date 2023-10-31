const express = require('express');
const router = express.Router(); 
const tariffmaster = require('../controller/tariff') 


router.get('/',tariffmaster.getRoot)
router.get('/tariff',tariffmaster.gettariff)
router.post('/tariffsearch',tariffmaster.posttariffsearch)
router.post('/saveCategory',tariffmaster.postsaveCategory)
router.post('/deleteTariff',tariffmaster.postdeleteTariff)


module.exports = router