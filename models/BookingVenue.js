const mongoose = require("mongoose");
const moment = require("moment");

const venueBookingSchema = new mongoose.Schema(
  {
    // craeting the user Schema
    name: { type: String, required: true },
    bookingDate: {
      type: Date,
      min: [moment(new Date()).add(1, "days"), "Please enter valid date"],
      default: Date.now,
    },
    slot: {
      type: String,
      enum: ["Morning", "Afternoon", "Evening"],
      required: [true, "Please enter the slot time"],
    },
    isBooked: {
      type: Boolean,
      default: false,
    },
    requestStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("VenueBooking", venueBookingSchema);
