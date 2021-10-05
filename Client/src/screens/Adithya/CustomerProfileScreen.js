import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import { Container, ListGroup } from "react-bootstrap";
import CustomerDetails from "../../components/Adithya/CustomerDetails";
import CustomerOrderHistory from "../../components/Adithya/CustomerOrderHistory";
import CustomerInquries from "../../components/Adithya/CustomerInquries";
import CustomerWishList from "../../components/Randika/WishList";

import "./CustomerProfileScreen.css";
import axios from "axios";

const CustomerProfileScreen = () => {
  const [orderHistory, setOrderHistory] = useState(true);
  const [wishList, setWishList] = useState(false);
  const [inquries, setInquries] = useState(false);
  const [username, setUsername] = useState(" ");
  const [email, setEmail] = useState(" ");
  const [address, setAddress] = useState(" ");
  const [phone, setPhone] = useState(" ");
  const [profilepic, setProfilePic] = useState(" ");

  useEffect(() => {
    const getCustomerData = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      try {
        await axios
          .get(
            "http://localhost:6500/ecom/api/customerpvt/profile/customer",
            config
          )
          .then((res) => {
            setUsername(res.data.customer.username);
            setEmail(res.data.customer.email);
            setPhone(res.data.customer.phone);
            setProfilePic(res.data.customer.profilePicture.imagePublicId);
            if (res.data.customer.address) {
              setAddress(res.data.customer.address);
            }
          })
          .catch((err) => {
            alert("Error occured!!! : " + err);
          });
      } catch (error) {
        alert("Error occured!!! : " + error);
      }
    };
    getCustomerData();
  }, []);

  return (
    <div className="custom-cusprof-body">
      <Row>
        <Col span={7}>
          <Row>
            <Container>
              <CustomerDetails
                cusUsername={username}
                cusEmail={email}
                cusPhone={phone}
                cusPP={profilepic}
                cusAddress={address}
              />
            </Container>
          </Row>
          <Row>
            <Container>
              <div className="custom-cusprof-navigation-panel">
                <ListGroup defaultActiveKey="#link1">
                  <ListGroup.Item
                    action
                    href="#link1"
                    onClick={() => {
                      setWishList(false);
                      setInquries(false);
                      setOrderHistory(true);
                    }}
                  >
                    Order History
                  </ListGroup.Item>
                  <ListGroup.Item
                    action
                    href="#link2"
                    onClick={() => {
                      setInquries(false);
                      setOrderHistory(false);
                      setWishList(true);
                    }}
                  >
                    Wish List
                  </ListGroup.Item>
                  <ListGroup.Item
                    action
                    href="#link3"
                    onClick={() => {
                      setWishList(false);
                      setOrderHistory(false);
                      setInquries(true);
                    }}
                  >
                    Inquries and Disputes
                  </ListGroup.Item>
                </ListGroup>
              </div>
            </Container>
          </Row>
        </Col>
        <Col span={17}>
          <Container className="custom-cusprof-dynamic-content-body">
            {orderHistory && <CustomerOrderHistory />}
            {inquries && <CustomerInquries />}
            {wishList && <CustomerWishList />}
          </Container>
        </Col>
      </Row>
    </div>
  );
};

export default CustomerProfileScreen;
