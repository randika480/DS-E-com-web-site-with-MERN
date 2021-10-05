const express = require("express");
const router = express.Router();

const {
  getSingleProduct,
  getProductsByCategory,
} = require("../controllers/guest-data-controller");

router.route("/getSingleProduct/:id").get(getSingleProduct);
router.route("/getProducts/:category").get(getProductsByCategory);

module.exports = router;
