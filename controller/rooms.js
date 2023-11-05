const floor = require('../functions/floor')
const rooms = require('../functions/rooms')
const modeltariff = require('../model/tariff')

const getroot = (req,res)=>{
  res.redirect('/admin')
} 
const getrooms = async (req,res)=>{
  req.body.session = req.sessionID;
  let user=''
  const verify = await HBank.verifyUser(req.body)
  if(verify.verified){
     user =verify.user;
     
  }
  else {
    res.redirect('/admin')
  }

  if(!req.body) {  req.body="hai"}
  const data = await rooms.depart.find({deleted: false, rentOut: true });
  const floors = await floor.floors.find();
  const category = await modeltariff.tariff.find()
   
  res.render('rooms',{data,floors,category,user});
} 
const postSaveRooms =  async (req,res)=>{
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
} 
const postsearchRooms = async (req,res)=>{
  const data =await rooms.loadSaleRoom(req.body.searchvalue)
  const floors = await floor.floors.find();
  const category = await modeltariff.tariff.find()
   
  res.render('rooms',{data,floors,category});
} 
const postdeleteRoom = async (req,res)=>{
   
let result =await rooms.deleteRoom(req.body.Roomindex)
if(result.modifiedCount== 1){result={deleted:true}
  }
  else result={deleted:false}
   
  res.json(result)
}


module.exports ={getrooms,postsearchRooms,postdeleteRoom,postSaveRooms,getroot};  
 

 


