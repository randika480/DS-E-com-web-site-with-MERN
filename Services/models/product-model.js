const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  sellerID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "sellers",
  },
  productImage: {
    imagePublicId: {
      type: String,
      required: [
        true,
        "Error with cloudinary service! Can not find the paper URL.",
      ],
    },
    imageSecURL: {
      type: String,
      required: [
        true,
        "Error with cloudinary service! Can not find the paper URL.",
      ],
    },
  },
  productName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  unitPrice: {
    type: Number,
    required: true,
  },
  productDetails: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const Product = mongoose.model("product", ProductSchema);
module.exports = Product;
