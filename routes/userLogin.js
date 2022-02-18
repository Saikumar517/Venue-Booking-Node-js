const express = require("express");

const {
  singin,
  singup,
  getVenues,
} = require("../controllers.js/userContoller"); // importing the controllers

const router = express.Router();

router.post("/singup", singup);
router.post("/singin", singin);
router.get("/getVenues", getVenues); // adding the routes

module.exports = router;
