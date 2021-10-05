const Order = require("../models/order-model");
const Customer = require("../models/customer-model");
const ProductModel = require("../models/product-model");
const sendEmail = require("../utils/SendEmail-Delivery");

//fetch all orders from Orders collection
exports.fetchOrders = async (req, res) => {
  await Order.find()
    .then((orders) => {
      res.status(200).send({ status: "Orders fetched", orders: orders });
    })
    .catch((err) => {
      res
        .status(500)
        .send({ status: "Internal Server Error", error: err.message });
    });
};
//fetch specific single order
exports.fetchSingleOrder = async (req, res) => {
  let OrderId = req.params.id;

  await Order.findById(OrderId)
    .then((order) => {
      res.status(200).send({ status: "Order fetched", order });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error in fetching Order", error: err.message });
    });
};
//update delivery status of a specific order
exports.updateDeliveryStatus = async (req, res) => {
  const OrderId = req.body.id;
  const status = req.body.status;
  const deliveryStatus = {
    status: status,
  };
  try {
    await Order.findOneAndUpdate(
      { _id: OrderId },
      { $push: { deliveryStatus: deliveryStatus } },
      {
        upsert: false,
      }
    );
    res.status(200).send({ status: "Delivery Status Updated" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
//fetch customer details (email & username)
exports.getCusEmail = async (req, res) => {
  let cusId = req.params.id;
  let customer;
  try {
    customer = await Customer.findById({ _id: cusId }, "email username phone");
    res
      .status(200)
      .send({ status: "Customer details fetched", customer: customer });
  } catch (error) {
    res
      .status(500)
      .send({ status: "Internal server error", error: err.message });
  }
};
//send emails when delivery status updated
exports.EmailController = async (req, res, next) => {
  const { email, status, cusName, billAmmount, orderId } = req.body;
  let message;

  try {
    // HTML Message content
    switch (status) {
      case "Pending":
        message = `
              Your Order Is Processing.
          `;
        break;

      case "Shipped":
        message = `Dear ${cusName},<br />  We are pleased to share that the item(s) from your order ${orderId} have been shipped.
                    Please ready Rs.${billAmmount}.
                    Your order will be delivered to you within 4 working days.
                    Thanks for shopping with us
                  `;
        subject = `
                  Your Order Has Been Shipped!`;
        break;
      case "Delivered":
        message = `Dear ${cusName},<br />
        <h4>We are pleased to inform that your order ${orderId}
         has been delivered.
        We hope you are enjoying your recent 
        purchase! Once you have a chance, we would
         love to hear your shopping experience to 
         keep us constantly improving</h4>`;

        subject = `Your Order Has Been Delivered!`;
        break;
      case "Returned":
        message = `
                    <h1>Your Order Has Been Returned</h1>
                  `;
        break;

      default:
        break;
    }

    try {
      await sendEmail({
        to: email,
        subject: subject,
        text: message,
      });

      res.status(200).send({ success: true, data: "Email Sent" });
    } catch (err) {
      res.status(500).send({
        success: false,
        error: "Email could not be sent!",
      });
    }
  } catch (error) {
    next(error);
  }
};
//fetch all products within db
exports.getAllProducts = async (req, res) => {
  await ProductModel.find()
    .then((products) => {
      res.status(200).send({ status: "Products fetched", products });
    })
    .catch((err) => {
      res
        .status(500)
        .send({ status: "Internal Server Error", error: err.message });
    });
};
