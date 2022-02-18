const mongoose = require("mongoose");
const UserSchema = require("./userModel");

const venueSchema = new mongoose.Schema( // creating Venue Schema
  {
    name: {
      type: String,
      unique: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    slot: {
      type: Array,
      default: ["Morning", "Afternoon", "Evening"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("venueSchema", venueSchema);
