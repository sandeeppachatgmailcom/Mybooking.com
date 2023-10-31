const express = require('express')
const router = express.Router(); 
const floor =  require('../controller/floorMaster')
const token = require('../middleware/jwt')

router.get('/',floor.getRoot)
router.post('/loadfloorbypagenumber',floor.postloadfloorbypagenumber)
router.post('/savefloor',floor.postsavefloor)
router.post('/deleteFloor',floor.postdeleteFloor)
router.post('/search',floor.postsearch)
router.get('/floors',token.verifyToken ,floor.getfloors)

module.exports = router;