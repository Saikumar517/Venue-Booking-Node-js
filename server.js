const express = require("express");
const dotenv = require("dotenv");
const dbConncetion = require("./config/DB");
const events = require("./routes/venues");
const login = require("./routes/login");
const booking = require("./routes/BookingVenue");
dotenv.config({ path: "./config/config.env" });

dbConncetion(); //calling the DB method
const app = express();

app.use(express.json()); //middleware

app.use("/user", login);
app.use("/booking", booking);
app.use("/venue", events);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server is running on " + PORT);
});
