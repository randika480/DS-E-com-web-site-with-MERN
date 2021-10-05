import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import Categories from "../../components/Adithya/Categories";
import OurServices from "../../components/Adithya/OurServices";
import CoverImageSlider from "../../components/Adithya/CoverImageSlider";
import AboutUs from "../../components/Adithya/AboutUs";
import "./HomeScreen.css";

const HomeScreen = () => {
  localStorage.removeItem("selectedCategory");
  return (
    <div>
      <CoverImageSlider />
      <Container fluid>
        <Row className="justify-content-md-center">
          <Categories />
        </Row>
        <Row>
          <OurServices />
        </Row>
        <Row className="justify-content-md-center">
          <Container className="custom-aboutus-content" fluid>
            <AboutUs />
          </Container>
        </Row>
      </Container>
    </div>
  );
};

export default HomeScreen;
