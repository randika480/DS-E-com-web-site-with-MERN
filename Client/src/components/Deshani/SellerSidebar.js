import React, { useState, useEffect } from "react";
import "./SellerSidebar.css";
import { Row, Col } from "antd";
import { Container, ListGroup } from "react-bootstrap";
import SellerProduct from "./SellerProduct";
import SellerProfile from "./SellerProfile";
import axios from "axios";

const SellerSidebar = () => {
  const [product, setProduct] = useState(false);

  const [profile, setProfile] = useState(true);

  const [username, setUsername] = useState(" ");
  const [email, setEmail] = useState(" ");
  const [paymentOptions, setPaymentOptions] = useState(" ");
  const [address, setAddress] = useState(" ");
  const [phone, setPhone] = useState(" ");

  useEffect(() => {
    const getSellerDetails = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      try {
        await axios
          .get("http://localhost:6500/ecom/api/sellerpvt/seller", config)
          .then((res) => {
            setUsername(res.data.seller.username);
            setEmail(res.data.seller.email);
            setPaymentOptions(res.data.seller.paymentOptions);
            setAddress(res.data.seller.address);
            setPhone(res.data.seller.phone);
          });
      } catch (error) {
        alert("Error occured!!! : " + error);
      }
    };
    getSellerDetails();
  }, []);
  return (
    <div>
      <Row>
        <Col span={20} push={4} className="Col1">
          <Container className="sellerSidebar-body">
            {product && <SellerProduct />}

            {profile && (
              <SellerProfile
                sellerUsername={username}
                sellerEmail={email}
                sellerPaymentOption={paymentOptions}
                sellerAddress={address}
                sellerPhone={phone}
              />
            )}
          </Container>
        </Col>
        <Col span={4} pull={20} className="Col2">
          <Container>
            <div className="sellerSidebar">
              <ListGroup defaultActiveKey="#link1">
                <ListGroup.Item
                  action
                  href="#link1"
                  onClick={() => {
                    setProduct(false);

                    setProfile(true);
                  }}
                >
                  Profile
                </ListGroup.Item>
                <ListGroup.Item action href="#link2">
                  Dashboard
                </ListGroup.Item>
                <ListGroup.Item
                  action
                  href="#link3"
                  onClick={() => {
                    setProfile(false);
                    setProduct(true);
                  }}
                >
                  Products
                </ListGroup.Item>
                <ListGroup.Item action href="#link4">
                  Orders
                </ListGroup.Item>
              </ListGroup>
            </div>
          </Container>
        </Col>
      </Row>
    </div>
  );
};

export default SellerSidebar;
