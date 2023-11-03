const express = require('express')
const router = express.Router()
const root = require('../controller/root')


router.get('/' ,root.getRoot)

module.exports = router