const express = require('express');
const router = express.Router();
const HBank = require('../controller/human');
router.get('/',HBank.getRoot)
router.post('/loadcustommer',HBank.postloadcustommer)
router.get('/human',HBank.gethuman)
router.post('/SaveHuman',HBank.postSaveHuman)
router.post('/searchHuman',HBank.postsearchHuman)
router.post('/DeleteHuman', HBank.postDeleteHuman)

module.exports=router;