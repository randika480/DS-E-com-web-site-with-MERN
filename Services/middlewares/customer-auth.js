const jwt = require("jsonwebtoken");
const CustomerModel = require("../models/customer-model");

exports.protectedCustomerRoutes = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    //Bearer jwtcontetkmlajfldjalfjdal
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    res.status(401).json({ success: false, error: "Not Authorized to Access" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await CustomerModel.findById(decoded.id);

    if (!user) {
      res
        .status(404)
        .json({ success: false, error: "No user found with this ID" });
    }

    req.user = user;
    next();
  } catch (error) {
    res
      .status(401)
      .json({ success: false, error: "Something went wrong, Frobidden" });
  }
};
