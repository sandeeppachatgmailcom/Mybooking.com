const mongoose = require('mongoose');
const db = require('./mongoose'); // Make sure to use the correct path to your mongoose connection setup
const referenceSchema = new mongoose.Schema({
    tableName: { type: String },
    nextIndex: { type: Number, default: 100000 }, // Changed 'nextindex' to 'nextIndex'
    prefix: { type: String }
});
const ReferenceIndex = db.model('references', referenceSchema); // Changed 'referances' to 'references'
module.exports = { ReferenceIndex };
