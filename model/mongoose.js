const mongoose = require('mongoose');
const dbURI = 'mongodb+srv://sandeeppachat:Asd@123.com@cluster0.3tvy5da.mongodb.net/?tls=true'; // Replace 'mydatabase' with your actual database name

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('DB Is Connected');
    })
    .catch((error) => {
        console.error('DB Connection Error:', error);
    });

const db = mongoose.connection;

db.on('error', (error) => {
    console.error('MongoDB Connection Error:', error);
});

db.once('open', () => {
    console.log('MongoDB Connection Established');
});

module.exports = db;
