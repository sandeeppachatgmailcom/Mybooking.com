const express = require('express');
const router = express.Router();
const CheckinPlan = require('../controller/checkinPlan')

router.get('/',CheckinPlan.getRoot)
router.post( '/saveCheckinplan',CheckinPlan.postsaveCheckinplan)
router.get('/plan', CheckinPlan.getplan)
router.post('/deletePlan', CheckinPlan.postdeletePlan)
module.exports = router