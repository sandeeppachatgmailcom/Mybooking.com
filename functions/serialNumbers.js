 
// Define a Mongoose schema
 

// Compile the Mongoose model
const modelSerialNumbers = require('../model/serialNumbers')

const serialNumbers = modelSerialNumbers.serialNumbers;
// Export the model
module.exports = { serialNumbers };
