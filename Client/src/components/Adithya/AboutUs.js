import React from "react";
import { Row, Col } from "antd";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div>
      <Row>
        <Col span={10}>
          <img
            src="https://i.ibb.co/wCX7Gc0/Illustration-aboutus-1.png"
            width="100%"
            height="250"
            alt="about-us-image"
          />
        </Col>
        <Col span={14}>
          <p className="custom-about-us-description">
            We Empower People and Create Economic Opportunity GRID-Ecom-Shop is
            a global commerce leader that connects millions of buyers and
            sellers around the world. We exist to enable economic opportunity
            for individuals, entrepreneurs, businesses and organizations of all
            sizes. Our portfolio of brands includes Marketplace and Classifieds
            Group, operating in 190 markets around the world. Buyers who shop on
            our Marketplace and Classifieds platforms enjoy a highly
            personalized experience with an unparalleled selection at great
            value.
          </p>
        </Col>
      </Row>
    </div>
  );
};

export default AboutUs;
