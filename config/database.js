const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const database = process.env.DATABASE;
module.exports = async () => {
  try {
    await mongoose.connect(database);
    console.log("*Connected to db");
  } catch (error) {
    console.log("DB error");
  }
};
