import React from "react";
import { Row, Col } from "antd";
import "./OurServices.css";
import {
  SendOutlined,
  DollarOutlined,
  FileProtectOutlined,
} from "@ant-design/icons";

const style = {
  justifyContent: "center",
  alignItems: "center",
};

const OurServices = () => {
  return (
    <div className="custom-our-services-body">
      <Row>
        <Col span={24} className="custom-services-title">
          <h3>Our Services</h3>
        </Col>
      </Row>
      <Row type="flex" align="middle">
        <Col span={8}>
          <Row {...{ style }}>
            <SendOutlined style={{ fontSize: "4em" }} />
          </Row>
          <Row {...{ style }}>Island-wide Delivery</Row>
          <Row {...{ style }}>Description</Row>
        </Col>
        <Col span={8}>
          <Row {...{ style }}>
            <DollarOutlined style={{ fontSize: "4em" }} />
          </Row>
          <Row {...{ style }}>Refund and Disputes</Row>
          <Row {...{ style }}>
            Our Buyer Protection covers your purchase from click to delivery.
          </Row>
        </Col>
        <Col span={8}>
          <Row {...{ style }}>
            <FileProtectOutlined style={{ fontSize: "4em" }} />
          </Row>
          <Row {...{ style }}>Comprehensive Data management</Row>
          <Row {...{ style }}>Description</Row>
        </Col>
      </Row>
    </div>
  );
};

export default OurServices;
