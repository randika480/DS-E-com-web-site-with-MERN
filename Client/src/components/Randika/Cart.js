import React, { useState, useEffect } from "react";
import { Row, Col, Modal } from "antd";
import { Container, Button } from "react-bootstrap";
import "./Cart.css";
import axios from "axios";
import { Image } from "cloudinary-react";
import PaymentOptions from "../Adithya/PaymentOptions";

const Cart = () => {
  const [cusCart, setCusCart] = useState(null);
  const [emptyStorage, setEmptyStorage] = useState(true);
  const [finalOrder, setFinalOrder] = useState([]);
  const [totAmount, setTotAmount] = useState(0);
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

  useEffect(() => {
    setEmptyStorage(true);
    const getCartData = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      await axios
        .get(`http://localhost:6500/ecom/api/customerpvt/getCartItems`, config)
        .then((res) => {
          console.log(res.data.cart);
          setCusCart(res.data.cart);
          // setEmptyStorage(false);
          if (res.data.cart.length > 0) {
            setEmptyStorage(false);
          }
        })
        .catch((err) => {
          alert("Error in order set : " + err);
        });
    };
    getCartData();
  }, []);

  const qutIncrease = (pID, unitPrice) => {
    let tempQut = 0;
    let count = 0;
    finalOrder.forEach((item) => {
      if (item.productID === pID) {
        count = finalOrder.indexOf(item);
        tempQut = item.quantity;
        finalOrder.splice(count, 1);
      }
    });
    finalOrder.push({ productID: pID, quantity: tempQut + 1 });
    setTotAmount(totAmount + unitPrice);
    console.log(finalOrder);
  };
  const qutDecrease = (pID, unitPrice) => {
    let tempQut = 0;
    let count = 0;
    let stopProcess = false;
    finalOrder.forEach((item) => {
      count = finalOrder.indexOf(item);
      if (item.productID === pID) {
        tempQut = item.quantity;
        if (tempQut === 1) {
          //finalOrder.splice(count, 1);
          delete finalOrder[item];
          stopProcess = true;
        }
        finalOrder.splice(count, 1);
      }
    });
    if (!stopProcess) {
      finalOrder.push({ productID: pID, quantity: tempQut - 1 });
      setTotAmount(totAmount - unitPrice);
    }
    setTotAmount(totAmount - unitPrice);
    console.log(finalOrder);
  };

  const removeFromCart = async (pID) => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };

    const reqObj = { pid: pID };

    await axios
      .put(
        "http://localhost:6500/ecom/api/customerpvt/removeCartItems",
        reqObj,
        config
      )
      .then((res) => {
        alert("Item removed from cart");
        window.location.reload();
      })
      .catch((err) => {
        alert("Error Occured!! " + err);
      });
  };

  return (
    <div className="custom-cart-body">
      <Row>
        <Col span={15}>
          <Container className="custom-cart-card">
            {emptyStorage && <h3>Your Cart is Empty! </h3>}
            {!emptyStorage && (
              <div className="custom-cart-item-side">
                {cusCart.map((item) => {
                  return (
                    <Row key={item.productID}>
                      <Col className="custom-cart-item-pp">
                        <Image
                          className="custom-cart-item-pp-img"
                          cloudName="grid1234"
                          publicId={item.proImg}
                        />
                      </Col>
                      <Col>
                        <h4>{item.proName}</h4>
                        <h6>Product ID: {item.productID}</h6>
                        <h6>Qty: default 1</h6>
                        <h6>Unit price: {item.unitPrice}</h6>
                        <Button
                          onClick={() => {
                            qutIncrease(item.productID, item.unitPrice);
                          }}
                        >
                          +
                        </Button>{" "}
                        <Button
                          onClick={() => {
                            qutDecrease(item.productID, item.unitPrice);
                          }}
                        >
                          -
                        </Button>{" "}
                        <Button
                          variant="danger"
                          onClick={() => {
                            removeFromCart(item.productID);
                          }}
                        >
                          Remove from cart
                        </Button>
                      </Col>
                    </Row>
                  );
                })}
              </div>
            )}
          </Container>
        </Col>
        <Col span={9} className="custom-cart-card">
          <Container>
            {finalOrder !== [] && (
              <div>
                <h4>Order data:</h4>
                {finalOrder.map((x) => {
                  return (
                    <Row>
                      <Col span={16}>
                        <h6>Product id: {x.productID}</h6>
                      </Col>
                      <Col>
                        <h6>Quantity: {x.quantity}</h6>
                      </Col>
                    </Row>
                  );
                })}
                <h6>Total Rs. {totAmount}</h6>
                <Button onClick={showModal1}>Checkout</Button>
              </div>
            )}
          </Container>
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
        <PaymentOptions totBill={totAmount} cusOrder={finalOrder} />
      </Modal>
    </div>
  );
};

export default Cart;
