import React, { useState, useEffect } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import axios from "axios";

const PaymentOptions = (props) => {
  const [part1, setPart1] = useState(true);
  const [part2, setPart2] = useState(false);
  const [cdcardSelect, setCdcardSelect] = useState(false);
  const [phnbillSelect, setPhnbillSelect] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState(null);

  const getDeliveryAddress = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    try {
      await axios
        .get(
          "http://localhost:6500/ecom/api/customerpvt/profile/customer/getAddress",
          config
        )
        .then((res) => {
          setDeliveryAddress(res.data.address.address);
        })
        .catch((err) => {
          alert("Error occured!!! : " + err);
        });
    } catch (error) {
      alert("Error occured!!! : " + error);
    }
  };

  const placeNewOrder = async () => {
    let reqObj = {
      billAmount: props.totBill,
      deliveryAddress,
      status: "Pending",
      orderData: props.cusOrder,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };

    try {
      await axios
        .post(
          "http://localhost:6500/ecom/api/customerpvt/addOrder",
          reqObj,
          config
        )
        .then((res) => {
          alert("Your Order has been places Successfully!");
        })
        .catch((err) => {
          alert("Error -" + err);
        });
    } catch (error) {
      alert("Error occured!!! : " + error);
    }
  };

  return (
    <div>
      {part1 && (
        <div>
          <Form.Group>
            <Form.Label as="legend" column sm={12}>
              Payment Option selection:
            </Form.Label>
            <Form.Check
              type="radio"
              required={true}
              label="Credit Card"
              onClick={() => {
                setPhnbillSelect(false);
                setCdcardSelect(true);
              }}
              id="formHorizontalRadios1"
              name="formHorizontalRadios"
            />
            <Form.Check
              type="radio"
              required={true}
              label="Phone Bill"
              onClick={() => {
                setCdcardSelect(false);
                setPhnbillSelect(true);
              }}
              id="formHorizontalRadios2"
              name="formHorizontalRadios"
            />
          </Form.Group>
          {cdcardSelect && (
            <div>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  getDeliveryAddress();
                  setTimeout(() => {
                    setPart1(false);
                    setCdcardSelect(false);
                    setPhnbillSelect(false);
                    setPart2(true);
                  }, 2000);
                }}
              >
                <Form.Row>
                  <Form.Group as={Col} md={6}>
                    <Form.Label>Card no.</Form.Label>
                    <Form.Control
                      type="number"
                      required={true}
                      placeholder="Enter credit card no."
                    />
                  </Form.Group>
                  <Form.Group as={Col} md={6}>
                    <Form.Label>Card holder</Form.Label>
                    <Form.Control
                      type="text"
                      required={true}
                      placeholder="Enter card owner's name"
                    />
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} md={6}>
                    <Form.Label>Bill amount</Form.Label>
                    <Form.Control disabled placeholder={props.totBill} />
                  </Form.Group>
                  <Form.Group as={Col} md={6}>
                    <Form.Label>CVC no.</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter cvc no. on card back"
                      required={true}
                    />
                  </Form.Group>
                </Form.Row>
                <Button type="submit">Next</Button>
              </Form>
            </div>
          )}
          {phnbillSelect && (
            <div>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  getDeliveryAddress();
                  setTimeout(() => {
                    setPart1(false);
                    setCdcardSelect(false);
                    setPhnbillSelect(false);
                    setPart2(true);
                  }, 2000);
                }}
              >
                <Form.Row>
                  <Form.Group as={Col} md={6}>
                    <Form.Label>Bill amount</Form.Label>
                    <Form.Control
                      disabled
                      placeholder={"Rs: " + props.totBill}
                    />
                  </Form.Group>
                  <Form.Group as={Col} md={6}>
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter your phone number"
                      required={true}
                      maxLength={10}
                      minLength={10}
                    />
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} md={12}>
                    <Form.Label>PIN no.</Form.Label>
                    <Form.Control
                      placeholder="Please enter 4-digit pin"
                      type="number"
                      required={true}
                      maxLength={4}
                      minLength={4}
                    />
                  </Form.Group>
                </Form.Row>
                <Button type="submit">Next</Button>
              </Form>
            </div>
          )}
        </div>
      )}
      {part2 && (
        <div>
          <Row>
            {deliveryAddress !== null && (
              <Form.Row>
                <Form.Group as={Col} md={12}>
                  <Form.Label>Provided Delivery Address</Form.Label>
                  <Form.Control
                    type="text"
                    required={true}
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                  />
                </Form.Group>
              </Form.Row>
            )}
          </Row>
          <Row>
            <Button
              style={{ marginRight: "1vw" }}
              onClick={() => {
                setPart2(false);
                setPart1(true);
              }}
            >
              Back
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                placeNewOrder();
                setTimeout(() => {
                  window.location.reload();
                }, 2000);
              }}
            >
              Confirm Purchase
            </Button>
          </Row>
        </div>
      )}
    </div>
  );
};

export default PaymentOptions;
