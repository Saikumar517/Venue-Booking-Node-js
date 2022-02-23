const express = require("express");
const {
  getAllSlots,
  bookingSlot,
  updateSlot,
  deleteSlot,
  approveOrRejectslot,
  singleSlot,
} = require("../controllers/bookingController");
// importing the contollers
const roleChecker = require("../utils/roleChecker");

const router = express.Router();
router.get("/venueSlots", getAllSlots);
router.post("/venueSlots", bookingSlot);
router.get("/venueSlots/:id", singleSlot);
router.put("/venueSlots/:id", updateSlot);
router.delete("/venueSlots/:id", deleteSlot); // adding the routes
router.patch("/venueSlots/approve/:id", approveOrRejectslot);

module.exports = router;
