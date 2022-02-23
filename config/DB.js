const mongoose = require("mongoose");

const dbConnection = async () => {
  await mongoose.connect(
    process.env.MANGO_URI,
    {
      useNewUrlparser: true,
    },
    () => {
      console.log("DB connected");
    }
  );
};

module.exports = dbConnection;
