const mongoose = require('mongoose');
require("dotenv").config();

const dbURI = process.env.MONGODB_URI;


if (!dbURI) {
  console.error("❌ MongoDB URI not found. Please set MONGODB_URI in your .env file.");
  process.exit(1); // stop app if DB not configured
}


const connectDB = async () => {


  try {
    const conn = await mongoose.connect( dbURI  , {
      useNewUrlParser: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

module.exports = connectDB;


