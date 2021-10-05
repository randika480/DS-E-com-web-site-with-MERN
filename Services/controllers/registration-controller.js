const CustomerModel = require("../models/customer-model");
const SellerModel = require("../models/seller-model");
const AdminModel = require("../models/admin-model");
const AllUsersModel = require("../models/all-users-model");
const { cloudinary } = require("../utils/cloudinary");

//register new customer
exports.registerCustomer = async (req, res, next) => {
  const { username, email, password, fileEnc, contactNo } = req.body;

  //check for users with same email address within customer collection
  let existingEmail = await findUserByEmail(email);

  if (existingEmail) {
    existingEmail = null;
    res.status(401).json({
      success: false,
      desc: "Email already exist - Please check again",
    });
  } else {
    try {
      //file upload
      const uploadedResponse = await cloudinary.uploader.upload(fileEnc, {
        upload_preset: "GRID_DS_Registration",
      });

      const customer = await CustomerModel.create({
        username,
        email,
        password,
        phone: contactNo,
        profilePicture: {
          imagePublicId: uploadedResponse.public_id,
          imageSecURL: uploadedResponse.secure_url,
        },
      });
      const token = await customer.getSignedToken();

      const createdAllUser = new AllUsersModel({
        username,
        email,
        role: "customer",
      });

      await createdAllUser.save();
      res.status(201).json({ success: true, token, role: "customer" });
    } catch (error) {
      res.status(500).json({
        success: false,
        desc: "Error in registerCustomer controller",
        error: error.message,
      });
    }
  }
};

//register new seller
exports.registerSeller = async (req, res, next) => {
  const { username, email, password, address, contactNo } = req.body;

  //check for users with same email address within customer collection
  let existingEmail = await findUserByEmail(email);

  if (existingEmail) {
    existingEmail = null;
    res.status(422).json({
      success: false,
      desc: "Email already exist - Please check again",
    });
  } else {
    try {
      const seller = await SellerModel.create({
        username,
        email,
        password,
        phone: contactNo,
        address,
      });
      const token = await seller.getSignedToken();
      const createdAllUser = new AllUsersModel({
        username,
        email,
        role: "seller",
      });

      await createdAllUser.save();
      res.status(201).json({ success: true, token, role: "seller" });
    } catch (error) {
      res.status(500).json({
        success: false,
        desc: "Error in registerCustomer controller",
        error: error.message,
      });
    }
  }
};

//register admin (not accessible through web client)
//only for the development process
exports.registerAdmin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const admin = await AdminModel.create({
      email,
      password,
    });
    const token = await admin.getSignedToken();
    res.status(201).json({ success: true, token, role: "admin" });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in registerAdmin controller",
      error: error.message,
    });
  }
};

//find duplicated user emails when creating new users
const findUserByEmail = async (email) => {
  let existingAccount;
  try {
    existingAccount = await AllUsersModel.findOne({ email: email });
    return existingAccount;
  } catch (err) {
    res.status(422).json({
      success: false,
      desc: "Error occured in findUserByEmail segment",
      error: err.message,
    });
  }
};
