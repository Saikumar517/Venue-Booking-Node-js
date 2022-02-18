const venueSchema = require("../models/venueEvent");
const asyncHandler = require("../middleware/tryCatch");

exports.venues = asyncHandler(async (req, res, next) => {
  const getAllVenues = await venueSchema.find();
  res.status(200).json({
    msg: "Venues Fetched",
    Venues: getAllVenues.length, // getting the venues by using FInd method()
    data: getAllVenues,
  });
});
exports.addVenues = asyncHandler(async (req, res, next) => {
  const createVenue = await venueSchema.create(req.body);
  res.status(201).json({
    msg: "Created the Venue",
    data: createVenue,
  }); // creating the the venue
});
exports.getSingleVenue = asyncHandler(async (req, res, next) => {
  const singleData = await venueSchema.findById(req.params.id);
  if (!singleData) {
    res.status(400).json({
      err: "No Venue Found with the ID",
    }); // getting the single venue using its ID
  }
  res.status(200).json({
    msg: "fetched single Venue ",
    data: singleData,
  });
});

exports.updateVenue = asyncHandler(async (req, res, next) => {
  const updatingVenue = await venueSchema.findByIdAndUpdate(
    req.params.id,
    req.body
  ); // updating the Venue By using its ID
  res.status(201).json({
    msg: "update the Venue",
    data: updatingVenue,
  });
});
exports.deleteVenue = asyncHandler(async (req, res, next) => {
  const deleteSingleVenue = await venueSchema.findByIdAndDelete(req.params.id);
  res.status(201).json({
    msg: "Deleted the Venue",
    data: {}, // Deleting the venue By using its ID
  });
});
