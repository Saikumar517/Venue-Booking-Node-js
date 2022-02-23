const express = require("express");
const { CreateAccount, login } = require("../controllers/loginConstroller");

const router = express.Router();

router.route("/singin").post(CreateAccount);
router.route("/login").post(login);

module.exports = router;
