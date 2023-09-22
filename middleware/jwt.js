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
            res.clearCookie('Password');
            res.clearCookie('IsAdmin');
            res.clearCookie('connect.sid');
            req.session.destroy();
        res.render('login')
        
        
        
        }
        else{
            next();
        }
    })
    
}

module.exports = {verifyToken}