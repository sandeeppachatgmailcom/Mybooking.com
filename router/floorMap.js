const express = require('express');
const router = express.Router();
const floormap = require('../controller/floorMap')

 
router.get('/',floormap.getRoot)
router.get('/floorMap',floormap.getfloorMap )
router.post('/AggregatePage',floormap.postAggregatePage)
 
module.exports = router
