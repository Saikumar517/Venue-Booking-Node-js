const mongoose = require("mongoose");

const venuesSchema = new mongoose.Schema(
  {
    name: String,
    Date: {
      type: Date,
      default: Date.now,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    slots: {
      type: String,
      default: ["Morning", "Afternoon", "Evening"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("venuesSchema", venuesSchema);
