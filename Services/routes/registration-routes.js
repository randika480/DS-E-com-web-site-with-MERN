const express = require("express");
const router = express.Router();

//import controllers
const {
  registerCustomer,
  registerSeller,
  registerAdmin,
} = require("../controllers/registration-controller");
const { login } = require("../controllers/login-controller");

//Registration-routes
router.route("/reg-customer").post(registerCustomer);
router.route("/reg-seller").post(registerSeller);
router.route("/reg-admin").post(registerAdmin);

//Login-routes
router.route("/login").post(login);

module.exports = router;
