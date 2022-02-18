const mongoose = require("mongoose"); //importing the mongoose

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true, // making the connection to DB
  });

  console.log(`MongoDB Connected: ${conn.connection.host}`);
};

module.exports = connectDB;
// exporting the connection
