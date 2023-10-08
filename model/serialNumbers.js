const mongoose = require('mongoose');
const db = require('./mongoose'); // Make sure this path is correct and points to your Mongoose connection setup file

// Define a Mongoose schema
const newSeries = new mongoose.Schema({
  tableName: { type: String },
  nextIndex: { type: Number, default: 100000 }, // Corrected the field name to 'nextIndex'
  prefix: { type: String }
});

// Compile the Mongoose model
const serialNumbers = mongoose.model('serialNumbers',newSeries);


// Export the model
module.exports = { serialNumbers };
