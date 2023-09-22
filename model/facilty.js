const mongoose = require('mongoose')
const db = require('./mongoose');
const controller = require('../controller/adminController')
const blankData = {Serviceindex:"",
ServiceName:"",
ServiceImages1:"",
ServiceImages2:"",
ServiceImages3:"",
ServiceImages4:"",
hsnCode:"",
timestamp:"",
username:"",
deleted:"",
edited:"",
blocked:""
}
const NewFacilty =new mongoose.Schema({
    Serviceindex:{type:String,required:true,unique:true},
    ServiceName: { type: String, required: true },
    ServiceImages1: { type: String },
    ServiceImages2: { type: String },
    ServiceImages3: { type: String },
    ServiceImages4: { type: String },
    hsnCode: {type:String },
    timestamp: { type: Date, default: Date.now },
    username: { type: String, required: true },
    deleted: { type: Boolean, default: false },
    edited: { type: Boolean, default: true },
    blocked:{type:Boolean,default:false}
  });
  const facilty = db.model('facilty',NewFacilty);
  
  async function loadAllfacilty(){
    let result =  await facilty.find()
    return result; 
  }

  async function SaveFacilty(ReqObj){
    console.log('Reached Schema');
    if(!ReqObj.Serviceindex){ReqObj.Serviceindex=await controller.getIndex('Facilty') }
    const existdata = await facilty.find({Serviceindex:ReqObj.Serviceindex})
    if(!existdata ) existdata = blankData;
    if(!ReqObj.ServiceName){return {saved:false} }
    if(!ReqObj.ServiceImages1){ReqObj.Serviceindex=existdata.ServiceImages1 }
    if(!ReqObj.ServiceImages2){ReqObj.Serviceindex=existdata.ServiceImages2 }
    if(!ReqObj.ServiceImages3){ReqObj.Serviceindex=existdata.ServiceImages3 }
    if(!ReqObj.ServiceImages4){ReqObj.Serviceindex=existdata.ServiceImages4 }

    const data= {
      Serviceindex:ReqObj.Serviceindex,
      ServiceName: ReqObj.ServiceName,
      ServiceImages1: ReqObj.ServiceImages1,
      ServiceImages2:ReqObj.ServiceImages2,
      ServiceImages3:ReqObj.ServiceImages3,
      ServiceImages4:ReqObj.ServiceImages4,
      hsnCode: ReqObj.hsnCode,
      timestamp: Date.now(),
      username: ReqObj.username,
      deleted: false,
      edited: ReqObj.edited,
      blocked:ReqObj.blocked
    }
    const result = await facilty.updateOne({Serviceindex:ReqObj.Serviceindex},{$set:data},{upsert:true})
    let value = false;
    if (result.modifiedCount>0){value = {updated:true}}
    else if (result.upsertedCount>0){value = {saved:true}}
    else if (!result.modifiedCount && result.upsertedCount && result.acknowledged ) {value={exist:true}}
    return value;
  }
  module.exports = {facilty,loadAllfacilty,SaveFacilty}