const mongoose = require("mongoose");

function connectDb() {
  mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Database Connected");
  });
}

module.exports = connectDb;
