import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="custom-footer-styles">
      <Container fluid>
        <Row className="w-100">
          <Col xs={3} className="custom-footer-mission">
            <h5 className="custom-footer-mission">Our Mission</h5>
            <p>
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim onsequat. Duis aute irure dolor in reprehenderit in voluptate
              velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
              occaecat cupidatat non proident, sunt in culpa qui officia
              deserunt mollit anim id est laborum."
            </p>
          </Col>
          <Col xs={3}>
            <Row>
              <h5 className="custom-footer-mission">Privacy Policy</h5>
              <p>
                We use Your Personal data to provide and improve the Service. By
                using the Service, You agree to the collection and use of
                information in accordance with this Privacy Policy.Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum
                dolore eu fugiat nulla pariatur. [Last updated: May 05, 2021]
              </p>
            </Row>
          </Col>
          <Col xs={3}>
            <div className="custom-footer-sitemap-links">
              <Row>Terms of Use</Row>
              <Row>Careers</Row>
              <Row>Support</Row>
              <Row>Contact:</Row>
              <Row>(+94) 711243567</Row>
              <Row>support@gridshop.com</Row>
            </div>
          </Col>
          <Col xs={3}>
            <Row>Social Media Links</Row>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="custom-footer-copyr">
              Copyright &copy; GRID-Ecom-Shop
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
