const mongoose = require('mongoose')
const db = require('./mongoose');

const floor =new mongoose.Schema({
    floorindex:{type:String,required:true,unique:true},
    floorname: { type: String, required: true },
    floornumber: { type: String, required: true,unique:true },
    floorsize: { type: String, required: true },
    image: { type: String,  binary: true, max: 1000000 },
    timestamp: { type: Date, default: Date.now },
    username: { type: String, required: true },
  });
  const floors = db.model('floor',floor);
   
  module.exports = {floors }