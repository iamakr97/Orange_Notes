const mongoose = require('mongoose');
require('dotenv').config();

const dbConnect = async () => {
    await mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Database connected successfully ...");
    }).catch(error => {
        console.log("DB connection is failed ..");
        console.log(error);
    });
}

module.exports = dbConnect; 
