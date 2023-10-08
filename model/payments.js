const mongoose = require('mongoose')
const db = require('./mongoose')
const controller = require('../controller/adminController')
const voucherSerial = require('../model/voucherSerial') 

const NewPayment = new mongoose.Schema({
    transDate:{type:Date},
    paymentDate:{type:Date},
    paymentIndex:{type:String},
    paymentReferance:{type:String,required:true},
    voucherNumber:{type:String},
    accountHead:{type:String},
    entryType:{type:String},
    debit:{type:Number},
    credit:{type:Number},
    custommerId:{type:String,required:true},
    companyID:{type:String},
    cancelled:{type:Boolean},
    createdUser:{type:String}
})

const payment = db.model('payment',NewPayment)
 
async function MakeEntry(reqobj){
if(!reqobj.paymentIndex) reqobj.paymentIndex = await controller.getIndex('PAYMENT') 
reqobj.bookName =reqobj.accountHead
if(!reqobj.voucherNumber) reqobj.voucherNumber = await voucherSerial.getVoucherNumber(reqobj)
const debitData = { 
    transDate : reqobj.transDate ,
    paymentDate : reqobj.paymentDate ,
    paymentIndex : reqobj.paymentIndex ,
    paymentReferance : reqobj.paymentReferance,
    voucherNumber:reqobj.voucherNumber,
    accountHead : reqobj.accountHead ,
    debit : reqobj.amount ,
    entryType:'Dr',
    credit : 0,
    custommerId : reqobj.custommerId ,
    companyID : reqobj.companyID ,
    cancelled : reqobj.cancelled ,
    createdUser : reqobj.createdUser 
}
const crediData = { 
    transDate : reqobj.transDate ,
    paymentDate : reqobj.paymentDate ,
    paymentIndex : reqobj.paymentIndex ,
    paymentReferance : reqobj.paymentReferance,
    accountHead :reqobj.custommerId  ,
    voucherNumber:reqobj.voucherNumber,
    debit :0 ,
    entryType:'Cr',
    credit : reqobj.amount ,
    custommerId :  reqobj.accountHead ,
    companyID : reqobj.companyID ,
    cancelled : reqobj.cancelled ,
    createdUser : reqobj.createdUser 
}

const debitEntry = await payment.updateOne({voucherNumber:reqobj.voucherNumber,companyID : reqobj.companyID,entryType:'Dr' },{$set:debitData},{upsert:true})
const creditEntry = await payment.updateOne({voucherNumber:reqobj.voucherNumber,companyID : reqobj.companyID,entryType:'Cr'},{$set:crediData},{upsert:true})
return [debitEntry,creditEntry];

}


async function MakeCreditEntry(reqobj){
    reqobj.bookName =reqobj.accountHead
if(!reqobj.voucherNumber) reqobj.voucherNumber = await voucherSerial.getVoucherNumber(reqobj)
    if(!reqobj.paymentIndex) reqobj.paymentIndex = await controller.getIndex('PAYMENT') 
    const crediData = { 
        transDate : reqobj.transDate ,
        paymentDate : reqobj.paymentDate ,
        paymentIndex : reqobj.paymentIndex ,
        paymentReferance : reqobj.paymentReferance,
        voucherNumber:reqobj.voucherNumber,
        accountHead : reqobj.accountHead ,
        debit : reqobj.amount ,
        entryType:'Cr',
        credit : 0,
        custommerId : reqobj.custommerId ,
        companyID : reqobj.companyID ,
        cancelled : reqobj.cancelled ,
        createdUser : reqobj.createdUser 
    }
    const  debitData= { 
        transDate : reqobj.transDate ,
        paymentDate : reqobj.paymentDate ,
        paymentIndex : reqobj.paymentIndex ,
        paymentReferance : reqobj.paymentReferance,
        accountHead :reqobj.custommerId  ,
        voucherNumber:reqobj.voucherNumber,
        debit :0 ,
        entryType:'Dr',
        credit : reqobj.amount ,
        custommerId :  reqobj.accountHead ,
        companyID : reqobj.companyID ,
        cancelled : reqobj.cancelled ,
        createdUser : reqobj.createdUser 
    }
    
    const debitEntry = await payment.updateOne({voucherNumber:reqobj.voucherNumber,companyID : reqobj.companyID,entryType:'Dr' },{$set:debitData},{upsert:true})
    const creditEntry = await payment.updateOne({voucherNumber:reqobj.voucherNumber,companyID : reqobj.companyID,entryType:'Cr'},{$set:crediData},{upsert:true})
    return [debitEntry,creditEntry];
     
    
    
    }
module.exports = {payment,MakeEntry,MakeCreditEntry}  	
