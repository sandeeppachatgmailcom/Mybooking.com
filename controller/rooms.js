//const userModel = require('../Model/userModel')
const cookie = require('cookie-parser');
const { Document } = require('mongoose');
const memoryCache = require('memory-cache');
const express = require('express');
const router = express.Router();
const session = require('express-session');
const floor = require('../model/floor')
const rooms = require('../model/rooms')
const modeltariff = require('../model/tariff')
const multer = require('multer')

    
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'asset/Images'); // Destination directory for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Unique file name
  },
});
const upload = multer({ storage: storage });

router.get('/rooms',async (req,res)=>{
  if(!req.body) {  req.body="hai"}
  const data = await rooms.depart.find({deleted: false, rentOut: true });
  const floors = await floor.floors.find();
  const category = await modeltariff.tariff.find()
   
  res.render('rooms',{data,floors,category});
})


router.post('/SaveRooms',upload.array("roomiMages",3) ,async (req,res)=>{
     let imgArray = [];
    for (let i = 0; i < req.files.length; i++) {
      imgArray.push(req.files[i].filename);
    }
    console.log('Uploaded Images:', imgArray);
    console.log('Other Room Data:', req.body);
    req.body.session = req.sessionID
  let result = await rooms.SaveRooms(req.body,imgArray);
      if(result) {result = {saved:true}}
      else {result = {saved:false}}
      res.json(result);
  })


router.post('/searchRooms',async (req,res)=>{
  const data =await rooms.loadSaleRoom(req.body.searchvalue)
  const floors = await floor.floors.find();
  const category = await modeltariff.tariff.find()
   
  res.render('rooms',{data,floors,category});
})


router.post('/deleteRoom',async (req,res)=>{
   
let result =await rooms.deleteRoom(req.body.Roomindex)
if(result.modifiedCount== 1){result={deleted:true}
  }
  else result={deleted:false}
   
  res.json(result)
})


 

 

module.exports =router;
