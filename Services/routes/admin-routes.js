const express = require("express");
const router = express.Router();
const { protectedAdminRoutes } = require("../middlewares/admin-auth");

const {
  fetchOrders,
  fetchSingleOrder,
  updateDeliveryStatus,
  getCusEmail,
  EmailController,
  getAllProducts,
} = require("../controllers/profile-admin-controller");

router.route("/fetchOrders").get(protectedAdminRoutes, fetchOrders);
router.route("/fetchProducts").get(protectedAdminRoutes, getAllProducts);

router
  .route("/fetchSingleOrder/:id")
  .get(protectedAdminRoutes, fetchSingleOrder);

router
  .route("/updateDeliveryStatus")
  .put(protectedAdminRoutes, updateDeliveryStatus);

router.route("/EmailController").post(protectedAdminRoutes, EmailController);

router.route("/getCusEmail/:id").get(protectedAdminRoutes, getCusEmail);

module.exports = router;
