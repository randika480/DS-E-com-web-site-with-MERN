import React, { useState } from "react";
import { Row, Col } from "antd";
import { Container, ListGroup } from "react-bootstrap";
import "./AdminProfileScreen.css";
import AdminDashboard from "../../components/Adithya/AdminDashboard";
import AdminInquiries from "../../components/Adithya/AdminInquiries";
import AdminInventory from "../../components/Adithya/AdminInventory";
import AdminOtherControls from "../../components/Adithya/AdminOtherControls";
import AdminDelivery from "../Randika/AdminDelivery"

const AdminProfileScreen = () => {
  const [dashboardSection, setDashboardSection] = useState(true);
  const [deliverySection, setDeliverySection] = useState(false);
  const [inquirySection, setInquirySection] = useState(false);
  const [inventorySection, setInventorySection] = useState(false);
  const [otherSection, setOtherSection] = useState(false);

  return (
    <div>
      <Row className="custom-adminprof-body">
        <Col span={4}>
          <Container className="custom-adminprof-nav-links">
            <ListGroup defaultActiveKey="#link1">
              <ListGroup.Item
                action
                href="#link1"
                onClick={() => {
                  setDeliverySection(false);
                  setInquirySection(false);
                  setInventorySection(false);
                  setOtherSection(false);
                  setDashboardSection(true);
                }}
              >
                Dashboard
              </ListGroup.Item>
              <ListGroup.Item
                action
                href="#link2"
                onClick={() => {
                  setDeliverySection(false);
                  setInquirySection(false);
                  setDashboardSection(false);
                  setOtherSection(false);
                  setInventorySection(true);
                }}
              >
                Inventory
              </ListGroup.Item>
              <ListGroup.Item
                action
                href="#link3"
                onClick={() => {
                  setInquirySection(false);
                  setInventorySection(false);
                  setDashboardSection(false);
                  setOtherSection(false);
                  setDeliverySection(true);
                }}
              >
                Delivery
              </ListGroup.Item>
              <ListGroup.Item
                action
                href="#link4"
                onClick={() => {
                  setDeliverySection(false);
                  setInventorySection(false);
                  setDashboardSection(false);
                  setOtherSection(false);
                  setInquirySection(true);
                }}
              >
                Inquries and Disputes
              </ListGroup.Item>
              <ListGroup.Item
                action
                href="#link5"
                onClick={() => {
                  setDeliverySection(false);
                  setInventorySection(false);
                  setDashboardSection(false);
                  setInquirySection(false);
                  setOtherSection(true);
                }}
              >
                Additional Controls
              </ListGroup.Item>
            </ListGroup>
          </Container>
        </Col>
        <Col span={20}>
          <Container className="custom-adminprof-dynamic-content-body">
            {dashboardSection && <AdminDashboard />}
            {inventorySection && <AdminInventory />}
            {inquirySection && <AdminInquiries />}
            {otherSection && <AdminOtherControls />}
            {deliverySection && <AdminDelivery />}
            {/* {deliverySection && <h1>Heloooo</h1>} */}
          </Container>
        </Col>
      </Row>
    </div>
  );
};

export default AdminProfileScreen;
