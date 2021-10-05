import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Row, Col, Modal } from "antd";
import { Button } from "react-bootstrap";
import { Image } from "cloudinary-react";
import "./SingleProduct.css";
import PaymentOptions from "../Adithya/PaymentOptions";

const SingleProduct = () => {
  const [productName, setProductName] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productDetails, setProductDetails] = useState("");
  const [quantity, setQuantity] = useState("");
  const [proID, setProID] = useState("");
  const { id } = useParams();
  let order = [];

  const [visible1, setVisible1] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal1 = () => {
    let authToken = localStorage.getItem("authToken");
    let role = localStorage.getItem("userRole");
    if (authToken === "undefined") {
      alert("Please log in to start shopping");
    } else if (role !== "customer") {
      alert("Please log in as a customer to start shopping");
    } else {
      setVisible1(true);
    }
  };

  const handleOk1 = () => {
    setConfirmLoading(true);

    setTimeout(() => {
      setVisible1(false);
      setConfirmLoading(false);
    }, 3000);
  };

  const handleCancel = () => {
    setVisible1(false);
  };

  const checkCart = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    await axios
      .get(`http://localhost:6500/ecom/api/customerpvt/getCartItems`, config)
      .then((res) => {
        response(res.data.cart);
        console.log(res.data);
      })
      .catch((err) => {
        alert("Error occured -" + err);
      });
  };

  const response = (cartData) => {
    let alreadyOnCart = false;
    if (cartData !== null) {
      cartData.map((item) => {
        if (item.productID === id) {
          alreadyOnCart = true;
          alert(
            "item allready in cart!! You can manage your order quantity on cart page :)"
          );
        }
      });
      if (alreadyOnCart === false) {
        addToCart();
      }
    }
  };

  const addToCart = async () => {
    let tot = unitPrice;
    let pImg = productImage.imagePublicId;
    let id = proID;
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    let dataObject = {
      productID: id,
      price: tot,
      img: pImg,
    };

    await axios
      .put(
        "http://localhost:6500/ecom/api/customerpvt/addToCart",
        dataObject,
        config
      )
      .then((res) => {
        alert("Item added to the Cart");
      })
      .catch((err) => {
        alert("Error occured! " + err);
      });
  };

  //..........................................................................................................

  const checkWishList = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    await axios
      .get(`http://localhost:6500/ecom/api/customerpvt/getWishlist`, config)
      .then((res) => {
        responseToUser(res.data.wishlist);
      })
      .catch((err) => {
        alert("Error occured -" + err);
      });
  };

  const responseToUser = (wishlistData) => {
    let alreadyOnWishList = false;
    if (wishlistData !== null) {
      wishlistData.map((item) => {
        if (item.productID === id) {
          alreadyOnWishList = true;
          alert("Item is already on the wishlist!");
        }
      });

      if (alreadyOnWishList === false) {
        addToWishList();
      }
    }
  };

  const addToWishList = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    let dataObject = {
      productID: id,
      pName: productName,
      pimg: productImage.imagePublicId,
    };

    await axios
      .put(
        "http://localhost:6500/ecom/api/customerpvt/addtoWishlist",
        dataObject,
        config
      )
      .then((res) => {
        alert("Item added to the wishlist");
      })
      .catch((err) => {
        alert("Error occured! " + err);
      });
  };

  useEffect(() => {
    const getSingleProd = async () => {
      try {
        await axios
          .get(`http://localhost:6500/ecom/api/guest/getSingleProduct/${id}`)
          .then((res) => {
            setProductName(res.data.product.productName);
            setUnitPrice(res.data.product.unitPrice);
            setProductImage(res.data.product.productImage);
            setProductDetails(res.data.product.productDetails);
            setQuantity(res.data.product.quantity);
            setProID(res.data.product._id);
            order.push({ productId: id, quantity: 1 });
          })
          .catch((err) => {
            alert("Error in product set : " + err);
          });
      } catch (err) {
        alert("Error in product fetching : " + err);
      }
    };
    getSingleProd();
  }, []);
  return (
    <div className="singleProduct">
      <Row>
        <Col xs={24} sm={24} md={12} lg={8} xl={10}>
          <div className="singleProductImg">
            <Image
              className="custom-cusprof-pp-img "
              cloudName="grid1234"
              publicId={productImage.imagePublicId}
            />
          </div>
        </Col>

        <Col className="ProductDet" xs={24} sm={24} md={12} lg={16} xl={14}>
          <div>
            <h1>{productName}</h1>
            <h4>Rs: {unitPrice}</h4>
            <h6>{productDetails}</h6>
            <h6>Shipping:FREE</h6>
            <p>
              International shipment of items may be subject to customs
              processing and additional charges.
            </p>
            <h6>Ships to: Worldwide See exclusions</h6>
            <h6>Remaining Quantity: {quantity}</h6>
            <Button type="submit" variant="danger" onClick={checkCart}>
              Add to Cart
            </Button>{" "}
            <Button
              variant="warning"
              type="submit"
              onClick={() => {
                checkWishList();
              }}
            >
              Add to WishList
            </Button>{" "}
            <Button onClick={showModal1} type="submit">
              Buy Now
            </Button>{" "}
          </div>
        </Col>
      </Row>
      <Modal
        title="Payment Gateway"
        visible={visible1}
        onOk={handleOk1}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={false}
      >
        <PaymentOptions totBill={unitPrice} cusOrder={order} />
      </Modal>
    </div>
  );
};

export default SingleProduct;
