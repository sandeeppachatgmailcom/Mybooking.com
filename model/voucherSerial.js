const mongoose = require('mongoose');
const db = require('./mongoose'); // Make sure this path is correct and points to your Mongoose connection setup file

// Define a Mongoose schema
const newSeries = new mongoose.Schema({
  bookName: { type: String },
  DepartMent:{ type: String },
  companyID:{type:String},
  financialYear:{type:String},
  nextIndex: { type: Number, default: 100000 }, // Corrected the field name to 'nextIndex'
  prefix: { type: String },
  activeYear:{type:Boolean,default:false},
  deleted:{type:Boolean,default:false}
});

// Compile the Mongoose model
const voucherSerial = mongoose.model('voucherSerial',newSeries);
$inc: { nextIndex: 1 }


async function getVoucherNumber (reqObj){
  const NewCompany= {
    activeYear: true,
    bookName: reqObj.bookName,
    companyID: reqObj.companyID,
    deleted: false,
    __v: 0,
    financialYear: "2324",
    nextIndex: 100001,
    prefix: "JV"
  }
    let insertUpdate =await voucherSerial.updateOne({bookName:reqObj.bookName,companyID:reqObj.companyID,activeYear:true,deleted:false },{$set:NewCompany},{upsert:true})
    let result= await voucherSerial.findOneAndUpdate({bookName:reqObj.bookName,companyID:reqObj.companyID,activeYear:true,deleted:false },{$inc:{nextIndex:1}})
    console.log(reqObj,result,'my data');
const serialNumber = result.prefix+result.financialYear+result.nextIndex;
return serialNumber; 
}
// Export the model
module.exports = { voucherSerial,getVoucherNumber };

