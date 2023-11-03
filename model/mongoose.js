const mongoose = require('mongoose');
const dbURI = "mongodb+srv://sandeeppachat:w6yGtOSj60IeUvXk@cluster0.s4hqvyg.mongodb.net/?retryWrites=true&w=majority"
 //let dbURI="mongodb://127.0.0.1:27017/HOST"
// mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => {
//         console.log('DB Is Connected');
//     })
//     .catch((error) => {
//         console.error('DB Connection Error:', error);
//     });

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

const db = mongoose.connection;

db.on('error', (error) => {
    console.error('MongoDB Connection Error:', error);
});

db.once('open', () => {
    console.log('MongoDB Connection Established');
});

module.exports = db;
