const express = require("express");
const auth = require("../middleware/auth");
const {
  bookingSlot,
  updateSlot,
  deleteSlot,
} = require("../controllers.js/bookingContoller"); // importing the contollers

const router = express.Router();

router.post("/bookingSlot", bookingSlot);
router.put("/updateSlot/:id", updateSlot);
router.delete("/cancelSlot/:id", deleteSlot); // adding the routes

module.exports = router;
