const express = require("express");

const {
  venues,
  getSingleVenue,
  addVenues,
  updateVenue,
  deleteVenue,
} = require("../controllers.js/venuesControllers");
const auth = require("../middleware/auth"); // importing the controllers

const router = express.Router();

router.get("/", venues);
router.post("/", auth, addVenues);
router.get("/:id", auth, getSingleVenue);
router.put("/:id", auth, updateVenue);
router.delete("/:id", auth, deleteVenue); // adding the routes for Venue

module.exports = router;
