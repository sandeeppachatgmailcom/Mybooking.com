const express = require('express');
const router = express.Router()
const jwt = require('jsonwebtoken')
function verifyToken (req,res,next){
    console.log(req.session,'Display');
    let authHeader = req.session.headers;
    if(!authHeader){ next();}
    let token = authHeader;
    jwt.verify(token,'PassKey',(err,decoded)=>{
        if(err){
            res.clearCookie('Username');
            req.session.destroy();
        res.render('login')
        }
        else{
            next();
        }
    })
    
}
function createJwt(payload, secretKey, options = {}) {
     
    if (typeof payload !== 'object' || Array.isArray(payload)) {
        throw new Error('Payload must be a plain object.');
    }
}
 
module.exports = {verifyToken,createJwt}