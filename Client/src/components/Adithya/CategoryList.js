import React from "react";
import { Container, ListGroup } from "react-bootstrap";

const CategoryList = () => {
  const setPreviewCategory = (categoryStr) => {
    localStorage.setItem("selectedCategory", categoryStr);
  };

  return (
    <Container>
      <ListGroup>
        <ListGroup.Item
          action
          href="#link1"
          onClick={() => {
            setPreviewCategory("1");
          }}
        >
          Women's Fashion
        </ListGroup.Item>
        <ListGroup.Item
          action
          href="#link2"
          onClick={() => {
            setPreviewCategory("2");
          }}
        >
          Men's Fashion
        </ListGroup.Item>
        <ListGroup.Item
          action
          href="#link3"
          onClick={() => {
            setPreviewCategory("3");
          }}
        >
          Mobile Phones
        </ListGroup.Item>
        <ListGroup.Item
          action
          href="#link4"
          onClick={() => {
            setPreviewCategory("Computers");
          }}
        >
          Computers
        </ListGroup.Item>
        <ListGroup.Item
          action
          href="#link5"
          onClick={() => {
            setPreviewCategory("Consumer Electronics");
          }}
        >
          Consumer Electronics
        </ListGroup.Item>
        <ListGroup.Item
          action
          href="#link6"
          onClick={() => {
            setPreviewCategory("Jewelry & watches");
          }}
        >
          Jewelry &amp; watches
        </ListGroup.Item>
        <ListGroup.Item
          action
          href="#link7"
          onClick={() => {
            setPreviewCategory("Home, Pet & Appliances");
          }}
        >
          Home, Pet &amp; Appliances
        </ListGroup.Item>
        <ListGroup.Item
          action
          href="#link8"
          onClick={() => {
            setPreviewCategory("Bags & Shoes");
          }}
        >
          Bags &amp; Shoes
        </ListGroup.Item>
        <ListGroup.Item
          action
          href="#link9"
          onClick={() => {
            setPreviewCategory("Toys , Kids & Babies");
          }}
        >
          Toys , Kids &amp; Babies
        </ListGroup.Item>
        <ListGroup.Item
          action
          href="#link10"
          onClick={() => {
            setPreviewCategory("Outdoor Fun & Sports");
          }}
        >
          Outdoor Fun &amp; Sports
        </ListGroup.Item>
        <ListGroup.Item
          action
          href="#link11"
          onClick={() => {
            setPreviewCategory("Beauty, Health & Hair");
          }}
        >
          Beauty, Health &amp; Hair
        </ListGroup.Item>
        <ListGroup.Item
          action
          href="#link12"
          onClick={() => {
            setPreviewCategory("Automobiles & Motorcycles");
          }}
        >
          Automobiles &amp; Motorcycles
        </ListGroup.Item>
      </ListGroup>
    </Container>
  );
};

export default CategoryList;
