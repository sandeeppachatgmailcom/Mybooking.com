const DBcollections = require('../model/DBcollections');
const bcrypt = require('bcrypt')


async function encryptPassword(password) {
    try {
        const hashedpass = await bcrypt.hash(password, 10); // Adjust the salt rounds as needed
        return hashedpass;
    } catch (err) {
        console.error('Error:', err);
        throw err; // You can choose to handle or rethrow the error here
    }
}
async function comparePassword(newPassword,hashedPassword) {
    try {
        const isMatch  = await bcrypt.compare(newPassword,hashedPassword); // Adjust the salt rounds as needed
        return isMatch ;
    } catch (err) {
        console.error('Error:', err);
        throw err; // You can choose to handle or rethrow the error here
    }
}

     
    
    async function getIndex(CollName) {
        let result = await DBcollections.ReferenceIndex.findOne({ tableName: CollName });
        await DBcollections.ReferenceIndex.updateOne({ tableName: CollName }, { $inc: { nextIndex: 1 } })
        const serialnumber = result.prefix + result.nextIndex;
        
        return serialnumber;
    }
    
    function convertToCustomFormat(inputDateTime) {
        // Create a Date object from the input date-time string
        const dateObject = new Date(inputDateTime);
    
        // Extract date components
        const day = String(dateObject.getDate()).padStart(2, '0');
        const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const year = String(dateObject.getFullYear()).slice(-2); // Get the last 2 digits of the year
    
        // Extract time components
        const hours = String(dateObject.getHours()).padStart(2, '0');
        const minutes = String(dateObject.getMinutes()).padStart(2, '0');
        const seconds = String(dateObject.getSeconds()).padStart(2, '0');
    
        // Format the date and time in 'dd-mm-yy,hh-mm-ss' format
        const formattedDateTime = `${day}-${month}-${year},${hours}-${minutes}-${seconds}`;
    
        return formattedDateTime;
    }
 
    module.exports = {getIndex,convertToCustomFormat,encryptPassword,comparePassword}