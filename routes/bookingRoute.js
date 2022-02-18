const express = require("express");
const auth = require("../middleware/auth");
const {
  bookingSlot,
  updateSlot,
  deleteSlot,
} = require("../controllers.js/bookingContoller"); // importing the contollers

const router = express.Router();

router.post("/bookingSlot",auth, bookingSlot);
router.put("/updateSlot/:id",auth, updateSlot);
router.delete("/cancelSlot/:id",auth, deleteSlot); // adding the routes

module.exports = router;
