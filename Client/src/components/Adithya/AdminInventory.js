import React, { useState, useEffect } from "react";
import { Table, Button, Col, Row, Modal } from "antd";
import axios from "axios";
import { Image } from "cloudinary-react";
import "./AdminInventory.css";

const AdminInventory = () => {
  const [data, setData] = useState(null);
  const [emptyStorage, setEmptyStorage] = useState(true);

  useEffect(() => {
    setEmptyStorage(true);
    const getOrders = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      await axios
        .get("http://localhost:6500/ecom/api/adminpvt/fetchProducts", config)
        .then((res) => {
          setData(res.data.products);
          setEmptyStorage(false);
        })
        .catch((err) => {
          alert("Error occured!!! " + err);
        });
    };
    getOrders();
  }, []);

  const success = (product) => {
    Modal.success({
      title: "Product Details:",
      content: (
        <Col>
          <Row className="custom-prod-pp">
            <Image
              className="custom-prod-pp-img "
              cloudName="grid1234"
              publicId={product.productImage.imagePublicId}
            />
          </Row>
          <Row>Product name: {product.productName}</Row>
          <Row>Product category: {product.category}</Row>
          <Row>Description: {product.productDetails}</Row>
          <Row>Seller ID: {product.sellerID}</Row>
        </Col>
      ),
    });
  };

  const columns = [
    {
      title: "Product ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Product Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Unit Price",
      dataIndex: "unitPrice",
      key: "unitPrice",
    },
    {
      title: "In-stock qut.",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "",
      dataIndex: "",
      key: "_id",
      render: (product) => (
        <Button
          onClick={() => {
            success(product);
          }}
        >
          <a>...</a>
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h3>Inventory Details:</h3>
      {!emptyStorage && <Table columns={columns} dataSource={data} />}
    </div>
  );
};

export default AdminInventory;
