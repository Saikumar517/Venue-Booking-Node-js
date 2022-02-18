const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/DB");
const userRoute = require("./routes/userLogin");
const venues = require("./routes/venuesRoute");
const bookingRoute = require("./routes/bookingRoute");

const app = express();

dotenv.config({ path: "./config/config.env" }); // adding .env files

//calling the DB()
connectDB();

app.use(express.json()); // body-parser

app.use("/user", userRoute);
app.use("/venue", venues); // adding the routes
app.use("/booking", bookingRoute);
const PORT = process.env.PORT || 5001; // setting the PORT

app.listen(process.env.PORT, () => {
  console.log(`Server is Running on PORT ${PORT} `);
});
