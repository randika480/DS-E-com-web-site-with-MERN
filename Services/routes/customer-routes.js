const express = require("express");
const router = express.Router();

//import protected-routes middlewares
const { protectedCustomerRoutes } = require("../middlewares/customer-auth");

//import controllers
const {
  getProfileData,
  updateProfileData,
  deleteProfile,
  updateProfilePicture,
  getOrders,
  getDeliveryAddress,
} = require("../controllers/profile-customer-controller");

//customer profile routes
router.route("/profile/customer").get(protectedCustomerRoutes, getProfileData);
router
  .route("/profile/customer/update")
  .put(protectedCustomerRoutes, updateProfileData);
router
  .route("/profile/customer/delete")
  .delete(protectedCustomerRoutes, deleteProfile);
router
  .route("/profile/customer/updatepp")
  .put(protectedCustomerRoutes, updateProfilePicture);

router
  .route("/profile/customer/getOrders")
  .get(protectedCustomerRoutes, getOrders);

router
  .route("/profile/customer/getAddress")
  .get(protectedCustomerRoutes, getDeliveryAddress);

//.......................................................
//Wishlist
const {
  getWishlist,
  addToWishList,
  removeItemsFromWishlist,
  addOrder,
} = require("../controllers/profile-customer-controller");

router.route("/getWishlist").get(protectedCustomerRoutes, getWishlist);

router.route("/addtoWishlist").put(protectedCustomerRoutes, addToWishList);

router
  .route("/removeItemsFromWishlist")
  .put(protectedCustomerRoutes, removeItemsFromWishlist);

router.route("/addOrder").post(protectedCustomerRoutes, addOrder);

//.......................................................

//Cart
const {
  addToCart,
  getCartItems,
  removeCartItems,
} = require("../controllers/profile-customer-controller");

router.route("/addToCart").put(protectedCustomerRoutes, addToCart);

router.route("/getCartItems").get(protectedCustomerRoutes, getCartItems);

router.route("/removeCartItems").put(protectedCustomerRoutes, removeCartItems);

//.......................................................

module.exports = router;
