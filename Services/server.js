require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

//import routes

const regRoutes = require("./routes/registration-routes");
const sellerRoutes = require("./routes/seller-routes");
const adminRoutes = require("./routes/admin-routes");
const customerRoutes = require("./routes/customer-routes");
const guestRoutes = require("./routes/guest-routes");

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

const PORT = process.env.PORT || 5000;
const URI = process.env.MONGODB_URI;

mongoose
  .connect(URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("MongoDB Connection Success");
  })
  .catch((err) => {
    console.log("Connection Failed - " + err);
  });

//use routes
app.use("/ecom/api/auth", regRoutes);
app.use("/ecom/api/sellerpvt", sellerRoutes);
app.use("/ecom/api/adminpvt", adminRoutes);
app.use("/ecom/api/customerpvt", customerRoutes);
app.use("/ecom/api/guest", guestRoutes);

//event loop for server
app.listen(PORT, () => {
  console.log(`Backend Server is running on port ${PORT}`);
});
