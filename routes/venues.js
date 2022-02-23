const express = require("express");
const {
  venues,
  addVenues,
  getSingleVenue,
  updateVenue,
  deleteVenue,
} = require("../controllers/venuesController");

const router = express.Router();

router.route("/").get(venues).post(addVenues);

router.route("/:id").get(getSingleVenue).put(updateVenue).delete(deleteVenue);

module.exports = router;
