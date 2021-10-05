import React, { useState, useEffect } from "react";
import { Table, Button, message } from "antd";
import { GiftTwoTone } from "@ant-design/icons";
import axios from "axios";

const CustomerOrderHistory = () => {
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
        .get(
          "http://localhost:6500/ecom/api/customerpvt/profile/customer/getOrders",
          config
        )
        .then((res) => {
          setData(res.data.orders);
          setEmptyStorage(false);
        })
        .catch((err) => {
          alert("Error occured!!! " + err);
        });
    };
    getOrders();
  }, []);

  const columns = [
    {
      title: "Order ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Delivery Address",
      dataIndex: "deliveryAddress",
      key: "deliveryAddress",
    },
    {
      title: "Total Bill",
      dataIndex: "billAmount",
      key: "billAmount",
    },
    {
      title: "Check Delivery Status",
      dataIndex: "",
      key: "_id",
      render: (order) => (
        <Button
          onClick={() => {
            console.log(
              order.deliveryStatus[order.deliveryStatus.length - 1].status
            );

            message.warning({
              content: `Current Order Status: ${
                order.deliveryStatus[order.deliveryStatus.length - 1].status
              }`,
              duration: 5,
              style: {
                fontSize: "1.5em",
              },
              icon: <GiftTwoTone style={{ fontSize: "1.8em" }} />,
            });
          }}
        >
          <a>...</a>
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h3>Order Details:</h3>
      {!emptyStorage && <Table columns={columns} dataSource={data} />}
    </div>
  );
};

export default CustomerOrderHistory;
