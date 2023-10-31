const express = require('express');
const router = express.Router();
const midMult = require('../middleware/multer')
const rooms = require('../controller/rooms')

router.get('/',rooms.getroot)
router.get('/rooms',rooms.getrooms)
router.post('/SaveRooms',midMult.upload.array("roomiMages",3) ,rooms.postSaveRooms)
router.post('/searchRooms',rooms.postsearchRooms)
router.post('/deleteRoom',rooms.postdeleteRoom)
module.exports =router;
