const mongoose = require('mongoose');
const db = require('../model/mongoose');

const userAccess = new mongoose.Schema({
    userName:{type:String},
    path:{type:String},
    method:{type:String},
    crDate:{type:Date,default:Date.now()}
}) 

const formAccess = db.model('formAccess',userAccess);
module.exports = {formAccess}

