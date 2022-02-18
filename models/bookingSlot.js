const mongoose = require("mongoose");
const moment = require("moment");

const venueBookingSchema = new mongoose.Schema(
  {
    // craeting the user Schema
    name: { type: String, required: true },
    bookingDate: {
      type: Date,
      min: [moment(new Date()).add(1, "days"), "Please enter valid date"],
    },
    slot: {
      type: String,
      enum: ["Morning", "Afternoon", "Evening"],
      required: [true, "Please enter the slot time"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("VenueBooking", venueBookingSchema);
