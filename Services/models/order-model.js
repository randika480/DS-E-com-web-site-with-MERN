const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  buyerID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "customers",
  },
  billAmount: {
    type: Number,
    required: true,
  },

  deliveryAddress: {
    type: String,
    required: true,
  },
  deliveryFee: {
    type: Number,
    default: 250,
  },
  deliveryStatus: [
    {
      status: {
        type: String,
        default: "Pending",
      },
      updatedTime: {
        type: Date,
        default: Date.now,
      },
    },
  ],

  orderData: [
    {
      productID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "products",
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
});

const Order = mongoose.model("order", OrderSchema);
module.exports = Order;
