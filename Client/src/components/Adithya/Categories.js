import React from "react";
import { Col, Row } from "react-bootstrap";
import "./Categories.css";
import { BuildOutlined } from "@ant-design/icons";

const Categories = () => {
  const navigateToProdListing = (category) => {
    localStorage.setItem("selectedCategory", category);
    window.location = "/products";
  };

  return (
    <div className="custom-category-body">
      <Row className="custom-category-title">
        <BuildOutlined style={{ fontSize: "2em" }} />
        <h2>Categories</h2>
      </Row>
      <Row>
        <Col
          className="custom-home-category-card-style"
          onClick={() => {
            navigateToProdListing("1");
          }}
        >
          Women's Fashion
        </Col>
        <Col
          className="custom-home-category-card-style"
          onClick={() => {
            navigateToProdListing("2");
          }}
        >
          Men's Fashion
        </Col>
        <Col
          className="custom-home-category-card-style"
          onClick={() => {
            navigateToProdListing("3");
          }}
        >
          Mobile Phones
        </Col>
        <Col
          className="custom-home-category-card-style"
          onClick={() => {
            navigateToProdListing("4");
          }}
        >
          Computers
        </Col>
      </Row>
      <Row>
        <Col
          className="custom-home-category-card-style"
          onClick={() => {
            navigateToProdListing("5");
          }}
        >
          Consumer Electronics
        </Col>
        <Col
          className="custom-home-category-card-style"
          onClick={() => {
            navigateToProdListing("6");
          }}
        >
          Jewelry &amp; watches
        </Col>
        <Col
          className="custom-home-category-card-style"
          onClick={() => {
            navigateToProdListing("7");
          }}
        >
          Home, Pet &amp; Appliances
        </Col>
        <Col
          className="custom-home-category-card-style"
          onClick={() => {
            navigateToProdListing("8");
          }}
        >
          Bags &amp; Shoes
        </Col>
      </Row>
      <Row>
        <Col
          className="custom-home-category-card-style"
          onClick={() => {
            navigateToProdListing("9");
          }}
        >
          Toys , Kids &amp; Babies
        </Col>
        <Col
          className="custom-home-category-card-style"
          onClick={() => {
            navigateToProdListing("10");
          }}
        >
          Outdoor Fun &amp; Sports
        </Col>
        <Col
          className="custom-home-category-card-style"
          onClick={() => {
            navigateToProdListing("11");
          }}
        >
          Beauty, Health &amp; Hair
        </Col>
        <Col
          className="custom-home-category-card-style"
          onClick={() => {
            navigateToProdListing("12");
          }}
        >
          Automobiles &amp; Motorcycles
        </Col>
      </Row>
    </div>
  );
};

export default Categories;
