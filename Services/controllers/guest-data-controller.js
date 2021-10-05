const Product = require("../models/product-model");

//fetch products from db products collection
//can be accessed without having JSON web tokens
exports.getProductsByCategory = async (req, res, next) => {
  let products;
  let searchFor;
  const category = req.params.category;

  switch (category) {
    case "1":
      searchFor = "Women's Fashion";
      break;
    case "2":
      searchFor = "Men's Fashion";
      break;
    case "3":
      searchFor = "Mobile Phones";
      break;
    case "4":
      searchFor = "Computers";
      break;
    case "5":
      searchFor = "Consumer Electronics";
      break;
    case "6":
      searchFor = "Jewelry & watches";
      break;
    case "7":
      searchFor = "Home, Pet & Appliances";
      break;
    case "8":
      searchFor = "Bags & Shoes";
      break;
    case "9":
      searchFor = "Toys , Kids & Babies";
      break;
    case "10":
      searchFor = "Outdoor Fun & Sports";
      break;
    case "11":
      searchFor = "Beauty, Health & Hair";
      break;
    case "12":
      searchFor = "Automobiles & Motorcycles";
      break;
    default:
      res.status(404).json({
        success: false,
        desc: "Can not find the specified Product type",
      });
      break;
  }

  try {
    products = await Product.find(
      { category: searchFor },
      "productName unitPrice productImage.imagePublicId _id"
    );
    res.status(200).send({ prods: products });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Server Error",
    });
  }
};

//fetch single product using product id
//can be accessed without having JSON web tokens
exports.getSingleProduct = async (req, res) => {
  let productId = req.params.id;

  await Product.findById(productId)
    .then((product) => {
      res.status(200).send({ status: "Product fetched", product });
    })
    .catch((err) => {
      res
        .status(500)
        .send({ status: "Internal Server Error", error: err.message });
    });
};
