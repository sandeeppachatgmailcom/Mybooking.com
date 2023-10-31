const express = require('express');
const router = express.Router()
const facilty = require('../controller/facility')

router.get('/',facilty.getRoot)
router.get('/facilty',facilty.getfacilty)
router.post('/saveFacilty',facilty.postsaveFacilty)
module.exports = router;