const express = require('express')
const router = express.Router();
const reservation = require('../controller/reservation')

router.get('/',reservation.getRoot)
router.post('/savereservation', reservation.postsavereservation)
router.post('/confirmPayment', reservation.postconfirmPayment)
module.exports = router;
 