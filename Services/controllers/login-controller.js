const CustomerModel = require("../models/customer-model");
const SellerModel = require("../models/seller-model");
const AdminModel = require("../models/admin-model");

//login controller for customers and sellers
exports.login = async (req, res, next) => {
  const { email, password, role } = req.body;

  //check user
  let user;
  if (role === "admin") {
    user = await AdminModel.findOne({ email: email }).select("+password");
  } else if (role === "customer") {
    user = await CustomerModel.findOne({ email: email }).select("+password");
  } else if (role === "seller") {
    user = await SellerModel.findOne({ email: email }).select("+password");
  } else {
    res.status(422).json({
      success: false,
      desc: "Can not find the user - Please check again",
    });
  }

  if (user === null) {
    res.status(422).json({
      success: false,
      desc: "Can not find the user - Please check again",
    });
  }
  //check password match
  try {
    const isMatch = await user.matchPasswords(password);

    if (!isMatch) {
      res.status(401).send({
        success: false,
        desc: "Invalid credentials - Please check again",
      });
    } else {
      sendToken(user, 200, res);
    }
  } catch (error) {
    next(error);
  }
};

//send response object to client if login success
const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({ sucess: true, token, user });
};
