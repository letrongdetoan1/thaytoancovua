const mongoose = require('mongoose');

exports.connectDB = async () => {
    await mongoose.connect("mongodb://localhost:27017/thaytoancovua");
    console.log('mongoDB connected');
}