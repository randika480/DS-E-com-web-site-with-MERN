const CustomerModel = require("../models/customer-model");
const AllUsersModel = require("../models/all-users-model");
const { cloudinary } = require("../utils/cloudinary");
const sendEmail = require("../utils/SendEmail-Delivery");
const OrderModel = require("../models/order-model");

//fetch customer profile data
exports.getProfileData = async (req, res) => {
  try {
    if (!req.user) {
      res.status(422).json({
        success: false,
        desc: "Can not find the user - Please check again",
      });
    } else {
      res.status(200).send({
        customer: req.user,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in getProfileData controller-" + error,
    });
  }
};

//fetch address from a specific customer
exports.getDeliveryAddress = async (req, res) => {
  let address;

  try {
    address = await CustomerModel.findById(req.user._id, "address");
    if (address.length < 2) {
      address = null;
    }
    res.status(200).send({ address: address });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Internal Server Error",
    });
  }
};

//update customer profile
exports.updateProfileData = async (req, res) => {
  const { username, email, contactNo, address } = req.body;

  try {
    const newData = {
      username,
      email,
      phone: contactNo,
      address,
    };
    const updatedUser = await CustomerModel.findByIdAndUpdate(
      req.user.id,
      newData,
      {
        new: true,
        upsert: false,
      }
    );
    res.status(200).send({
      success: true,
      desc: "user updated successfully",
      updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in updateProfileData controller-" + error,
    });
  }
};

//delete customer profile
exports.deleteProfile = async (req, res) => {
  const email = req.user.email;
  try {
    await CustomerModel.findByIdAndDelete(req.user._id);
    await AllUsersModel.findOneAndRemove({ email });
    const cloudinaryRes = await cloudinary.uploader.destroy(
      req.user.profilePicture.imagePublicId
    );

    res.status(200).send({
      status: true,
      desc: "User deleted from the db",
      cloudinaryRes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in deleteProfile controller-" + error,
    });
  }
};

//update customer profile picture
exports.updateProfilePicture = async (req, res) => {
  const { fileEnc } = req.body;

  try {
    const destroyedImage = await cloudinary.uploader.destroy(
      req.user.profilePicture.imagePublicId
    );
    if (destroyedImage) {
      try {
        const uploadedResponse = await cloudinary.uploader.upload(fileEnc, {
          upload_preset: "GRID_DS_Registration",
        });
        let updatedPP = {
          imagePublicId: uploadedResponse.public_id,
          imageSecURL: uploadedResponse.secure_url,
        };
      } catch (error) {
        res.status(500).json({
          success: false,
          desc: "Error in uploading new image-" + error,
        });
      }
    } else {
      res.status(500).json({
        success: false,
        desc: "Error in previous image remove-" + error,
      });
    }

    const updated = await CustomerModel.findByIdAndUpdate(req.user._id, {
      profilePicture: updatedPP,
    });

    res.status(200).send({
      status: true,
      desc: "User pp updated",
      updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in updateProfilePicture controller-" + error,
    });
  }
};

//fetch orders placed by a specific customer
exports.getOrders = async (req, res, next) => {
  let orders;

  try {
    orders = await OrderModel.find(
      { buyerID: req.user._id },
      "_id billAmount deliveryAddress deliveryStatus orderData"
    );

    res.status(200).send({ orders: orders });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Internal Server Error",
    });
  }
};

//fetch wishlist from specific customer
exports.getWishlist = async (req, res) => {
  let cusId = req.user._id;
  await CustomerModel.findById(cusId)
    .then((customer) => {
      res
        .status(200)
        .send({ status: "Wishlist fetched", wishlist: customer.wishList });
    })
    .catch((err) => {
      res.status(500).send({
        status: "Error in fetching customer (Internal Server Error)",
        error: err.message,
      });
    });
};

//add product to wishlist (Update method)
exports.addToWishList = async (req, res) => {
  const productID = req.body.productID;
  const prName = req.body.pName;
  const pImg = req.body.pimg;
  const CustomerId = req.user._id;

  try {
    const wishlist = {
      productID: productID,
      proName: prName,
      proImg: pImg,
    };

    await CustomerModel.findOneAndUpdate(
      { _id: CustomerId },
      { $push: { wishList: wishlist } },
      {
        new: true,
        upsert: false,
      }
    );
    res.status(200).send({ status: "Product Added to Wishlist" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

//remove items from wishlist
exports.removeItemsFromWishlist = async (req, res) => {
  const itemId = req.body.id;
  try {
    const customer = req.user._id;
    await CustomerModel.updateOne(
      { _id: customer },
      { $pull: { wishList: { _id: itemId } } }
    );

    res.status(200).send({
      status: "product removed from the list",
    });
  } catch (error) {
    res.status(500).send({
      status: "Internal Server Error in wishlist item delete",
      error: error.message,
    });
  }
};

//add order
exports.addOrder = async (req, res) => {
  const buyerID = req.user._id;
  let address = req.user.address;

  const { billAmount, deliveryAddress, status, orderData } = req.body;

  if (req.body.deliveryAddress) {
    address = deliveryAddress;
  }

  const deliveryStatus = {
    status: status,
  };

  try {
    const newDelOrder = await OrderModel.create({
      buyerID,
      billAmount,
      deliveryAddress: address,
      deliveryStatus,
      orderData,
    });

    sendEmail({
      to: req.user.email,
      subject: "Order has been placed!",
      text: `<h5>Dear ${req.user.username},</h5>
      <p>
      Thank you for ordering from GRID SHOP! <br />
      We're excited for you to receive your order #${newDelOrder._id} and will notify you once it's on its way. If you have ordered from multiple sellers, your items will be delivered in separate packages. We hope you had a great shopping experience! You can check your order status from your profile.
      Please note, we are unable to change your delivery address once your order is placed.<br />
      Thank you.
      </p>
      `,
    });

    res.status(201).send({
      status: "Order has created successfully",
    });
  } catch (error) {
    res.status(500).send({
      status: "Internal Server Error in new order create",
      error: error.message,
    });
  }
};

exports.addToCart = async (req, res) => {
  const productID = req.body.productID;
  const prPrice = req.body.price;
  const ProImg = req.body.img;
  const CustomerId = req.user._id;

  try {
    const Cart = {
      productID: productID,
      unitPrice: prPrice,
      proImg: ProImg,
    };

    await CustomerModel.findOneAndUpdate(
      { _id: CustomerId },
      { $push: { cart: Cart } },
      {
        new: true,
        upsert: false,
      }
    );
    res.status(200).send({ status: "Product Added to Cart" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.removeCartItems = async (req, res) => {
  const proId = req.body.pid;
  try {
    const customer = req.user._id;
    await CustomerModel.updateOne(
      { _id: customer },
      { $pull: { cart: { productID: proId } } }
    );

    res.status(200).send({
      status: "product removed from the list",
    });
  } catch (error) {
    res.status(500).send({
      status: "Internal Server Error in wishlist item delete",
      error: error.message,
    });
  }
};

exports.getCartItems = async (req, res) => {
  let cusId = req.user._id;
  await CustomerModel.findById(cusId)
    .then((customer) => {
      res.status(200).send({ status: "Cart fetched", cart: customer.cart });
    })
    .catch((err) => {
      res.status(500).send({
        status: "Error in fetching customer (Internal Server Error)",
        error: err.message,
      });
    });
};
