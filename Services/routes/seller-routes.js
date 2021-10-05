const express = require("express");
const router = express.Router();

//import middleware
const { protectedSellerRoutes } = require("../middlewares/seller-auth");

//import controllers
const {
  getSellerProducts,
  createSellerProduct,
  updateSellerproduct,
  deleteSellerProducts,
  getSellerDetails,
  updateSellerDetails,
  deleteSellerDetails,
} = require("../controllers/profile-seller-controller");

//routes
router.route("/product/add").post(protectedSellerRoutes, createSellerProduct);
router.route("/product/getall").get(protectedSellerRoutes, getSellerProducts);
router.route("/product/update").put(protectedSellerRoutes, updateSellerproduct);
router
  .route("/product/delete")
  .delete(protectedSellerRoutes, deleteSellerProducts);
router.route("/seller").get(protectedSellerRoutes, getSellerDetails);
router.route("/seller/update").put(protectedSellerRoutes, updateSellerDetails);
router
  .route("/seller/delete")
  .delete(protectedSellerRoutes, deleteSellerDetails);

module.exports = router;
