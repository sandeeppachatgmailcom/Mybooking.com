const express = require('express')
const router = express.Router()
const userAccess = require('../model/userAccess')

async function VerifyAccess (req,res,next){
     
    const access =await userAccess.verifyaccess(req);
     
if(access.verify){
    next();
}
else{
    res.redirect('/')
}
}

const clearCache = (req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
  };
  



module.exports = {VerifyAccess,clearCache};