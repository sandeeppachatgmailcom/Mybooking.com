 
const adminController = require('../controller/adminController')
  const modelpincode = require('../model/pincode')

async function loadPincode(pincodeobj){
    console.log(pincodeobj,'pincode reached vbacked ');
    const result = await modelpincode.pincode.find({pincode:pincodeobj.pincode});
    return result;
  }
  const pincode =  modelpincode.pincode;
  module.exports = {pincode,loadPincode}