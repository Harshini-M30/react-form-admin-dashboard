const mongoose = require("mongoose");

const connectDB = async () => {
  try {

    await mongoose.connect(
      "mongodb+srv://mharshinim30_db_user:harshi30@cluster0.rejaenb.mongodb.net/formdb"
    );

    console.log("MongoDB Connected Successfully");

  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;