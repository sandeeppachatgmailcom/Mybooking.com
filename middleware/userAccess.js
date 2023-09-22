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




module.exports = {VerifyAccess};