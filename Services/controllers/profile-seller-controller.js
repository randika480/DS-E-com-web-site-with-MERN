const ProductModel = require("../models/product-model");
const SellerModel = require("../models/seller-model");
const AllUsersModel = require("../models/all-users-model");
const { cloudinary } = require("../utils/cloudinary");
const mongoose = require("mongoose");

//CRUD operations of sellerproducts

//fetch all products specifically for one seller
exports.getSellerProducts = async (req, res) => {
  await ProductModel.find({ sellerID: req.user._id }).exec(
    (error, products) => {
      if (error) {
        return res.status(400).json({ error });
      }
      res.status(200).json({ products });
    }
  );
};
//create new product
exports.createSellerProduct = async (req, res) => {
  const {
    productName,
    category,
    productDetails,
    unitPrice,
    quantity,
    productImgEnc,
  } = req.body;

  //file upload
  const uploadedResponse = await cloudinary.uploader.upload(productImgEnc, {
    upload_preset: "GRID_DS_Products",
  });

  try {
    const product = await ProductModel.create({
      sellerID: req.user._id,
      productName,
      category,
      productDetails,
      unitPrice,
      quantity,
      productImage: {
        imagePublicId: uploadedResponse.public_id,
        imageSecURL: uploadedResponse.secure_url,
      },
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(409).json({
      success: false,
      desc: "Error in adding product",
      error: error.message,
    });
  }
};
//update specific product
exports.updateSellerproduct = async (req, res) => {
  const {
    productId,
    productName,
    category,
    productDetails,
    unitPrice,
    quantity,
    productImgEnc,
  } = req.body;

  if (!mongoose.Types.ObjectId.isValid(productId))
    return res.status(404).send(`No product with id: ${productId}`);

  //file upload
  const uploadedResponse = await cloudinary.uploader.upload(productImgEnc, {
    upload_preset: "GRID_DS_Products",
  });

  const updatedProduct = {
    sellerID: req.user._id,
    productName,
    category,
    productDetails,
    unitPrice,
    quantity,
    productImage: {
      imagePublicId: uploadedResponse.public_id,
      imageSecURL: uploadedResponse.secure_url,
    },
    _id: productId,
  };

  try {
    let upProd = await ProductModel.findByIdAndUpdate(
      { _id: productId },
      updatedProduct,
      {
        new: true,
        upsert: false,
      }
    );
    res.status(200).json({ status: "Product updated successfully", upProd });
  } catch (error) {
    res.status(500).json({ status: "Internal server error", error });
  }
};
//delete specific product
exports.deleteSellerProducts = async (req, res) => {
  const { productId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(productId))
    return res.status(404).send(`No product with id: ${productId}`);

  try {
    await ProductModel.findByIdAndRemove(productId);
    res.status(200).json({ status: "Product deleted" });
  } catch (error) {
    res.status(500).json({ status: "Internal server error", error });
  }
};

//CRUD operations of seller details
exports.getSellerDetails = async (req, res) => {
  try {
    if (!req.user) {
      res.status(422).json({
        success: false,
        desc: "Can not find the user - Please check again",
      });
    } else {
      res.status(200).send({
        seller: req.user,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in get Seller Profile Data controller-" + error,
    });
  }
};
exports.updateSellerDetails = async (req, res) => {
  const { username, email, address, phone } = req.body;
  try {
    const newData = {
      username,
      email,
      address,
      phone,
    };

    const updatedSeller = await SellerModel.findByIdAndUpdate(
      req.user.id,
      newData
    );

    res.status(200).send({
      success: true,
      desc: "user updated successfully",
      updatedSeller,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in update Seller Profile Data controller-" + error,
    });
  }
};
exports.deleteSellerDetails = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.user._id))
    return res.status(404).send(`No product with id: ${req.user._id}`);

  try {
    await SellerModel.findByIdAndRemove(req.user._id);
    await AllUsersModel.findOne({ email: req.user.email });
    res.status(200).send({
      success: true,
      desc: "Seller deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in delete Seller Profile controller-" + error,
    });
  }
};
