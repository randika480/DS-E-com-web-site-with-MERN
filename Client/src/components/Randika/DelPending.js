import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Row } from "antd";
import { ListGroup } from "react-bootstrap";
import "./DelItem.css";

const DelPending = () => {
  //modal
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [delOrders, setDelOrders] = useState([]);
  const [cusEmail, setCusEmail] = useState(null);

  //view-----------------------------------------------------------------------

  const [billAmount, setbillAmount] = useState("");
  const [deliveryAddress, setdeliveryAddress] = useState("");
  const [OrderId, setOrderId] = useState("");
  const [delStatus, setDelStatus] = useState("");
  const [delFee, setDelFee] = useState("");
  const [cusId, setCusId] = useState("");
  const [buyerEmail, setbuyerEmail] = useState("");
  const [cusName, setCusName] = useState("");
  const [cusPhone, setCusPhone] = useState("");
  const [cusAddress, setCusAddress] = useState("");

  const fetchCustomer = async (cusId) => {
    const id = cusId;
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };

    await axios
      .get(`http://localhost:6500/ecom/api/adminpvt/getCusEmail/${id}`, config)
      .then((res) => {
        setbuyerEmail(res.data.customer.email);
        setCusId(res.data.customer._id);
        setCusName(res.data.customer.username);
        setCusPhone(res.data.customer.phone);
        setCusAddress(res.data.customer.address);
      })
      .then(showModal())
      .catch((err) => {
        alert(err.message);
      });
  };

  const getSingleOrder = async (orderId) => {
    const id = orderId;
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    try {
      await axios
        .get(
          `http://localhost:6500/ecom/api/adminpvt/fetchSingleOrder/${id}`,
          config
        )
        .then((res) => {
          setbillAmount(res.data.order.billAmount);
          setdeliveryAddress(res.data.order.deliveryAddress);
          setOrderId(res.data.order._id);
          setDelStatus(
            res.data.order.deliveryStatus[
              res.data.order.deliveryStatus.length - 1
            ].status
          );
          setDelFee(res.data.order.deliveryFee);

          fetchCustomer(res.data.order.buyerID);
        })
        .catch((err) => {
          alert("Error in order set : " + err);
        });
    } catch (err) {
      alert("Error in order fetching : " + err);
    }
  };
  //modal
  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setVisible(false);
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  //--------------------------------------------------------------------------------------------------
  const fetchCusEmail = async (cusid, orderId, billAmmount) => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };

    await axios
      .get(
        `http://localhost:6500/ecom/api/adminpvt/getCusEmail/${cusid}`,
        config
      )
      .then((res) => {
        setCusEmail(res.data.customer);
        ship(orderId, res.data.customer, billAmmount);
      })

      .catch((err) => {
        alert(err.message);
      });
  };

  const ship = async (id, customer, ammount) => {
    alert(localStorage.getItem("authToken"));

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    const status = "Shipped";
    let dataObject = {
      status: status,
      id: id,
    };
    await axios
      .put(
        "http://localhost:6500/ecom/api/adminpvt/updateDeliveryStatus",
        dataObject,
        config
      )
      .then((res) => {
        //window.location.reload(false);
        sendMail(status, customer, ammount, id);
      })
      .catch(alert("error"));
  };

  const sendMail = async (st, customer, ammount, id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    const email = customer.email;
    const cusName = customer.username;
    const status = st;
    const billAmmount = ammount;
    const orderId = id;

    const mailObject = {
      status: status,
      email: email,
      cusName: cusName,
      billAmmount: billAmmount,
      orderId: orderId,
    };

    await axios
      .post(
        "http://localhost:6500/ecom/api/adminpvt/EmailController",
        mailObject,
        config
      )
      .then(() => {
        alert("email sent");
      });
  };

  useEffect(() => {
    const getdelOrder = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      try {
        await axios
          .get("http://localhost:6500/ecom/api/adminpvt/fetchOrders", config)
          .then((res) => {
            setDelOrders(res.data.orders);
          })
          .catch((err) => {
            alert(err.message);
          });
      } catch (err) {
        alert("error :" + err);
      }
    };
    getdelOrder();
  }, []);
  return (
    <div className="delItems">
      <h1>Pending Orders</h1>
      <table className="table table-sm" style={{ fontSize: "0.7em" }}>
        <thead className="thead-dark">
          <tr>
            <th scope="col">Index</th>
            <th scope="col">OrderId</th>
            <th scope="col">Delivery Address</th>
            <th scope="col">Buyer ID</th>
            <th scope="col">Delivery Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {delOrders
            .filter(
              (wrk) =>
                wrk.deliveryStatus[wrk.deliveryStatus.length - 1].status ===
                "Pending"
            )
            .map((delOrder, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <th>{delOrder._id}</th>
                <th>{delOrder.deliveryAddress}</th>

                <th>{delOrder.buyerID}</th>

                <th>
                  {
                    delOrder.deliveryStatus[delOrder.deliveryStatus.length - 1]
                      .status
                  }
                </th>

                <th>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      fetchCusEmail(
                        delOrder.buyerID,
                        delOrder._id,
                        delOrder.billAmount
                      );
                    }}
                  >
                    Ship
                  </button>{" "}
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      getSingleOrder(delOrder._id);
                    }}
                  >
                    View
                  </button>
                </th>

                <th></th>
              </tr>
            ))}
        </tbody>
      </table>

      <Modal
        title="Oder Info"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={null}
      >
        <Row>
          <div className="orderDet">
            <h4>Order Details</h4>
            <ListGroup>
              <ListGroup.Item>Order Id : {OrderId}</ListGroup.Item>
              <ListGroup.Item>Bill Ammount : {billAmount}</ListGroup.Item>
              <ListGroup.Item>
                Delivery Address : {deliveryAddress}
              </ListGroup.Item>
              <ListGroup.Item>Delivery Status : {delStatus}</ListGroup.Item>
              <ListGroup.Item>Delivery Fee : {delFee}</ListGroup.Item>
            </ListGroup>
          </div>

          <div className="cusDets">
            <h4>Buyer Details</h4>
            <ListGroup>
              <ListGroup.Item>Buyer Id : {cusId}</ListGroup.Item>
              <ListGroup.Item>Buyer Name : {cusName}</ListGroup.Item>
              <ListGroup.Item>Buyer Email : {buyerEmail}</ListGroup.Item>
              <ListGroup.Item>Buyer Contact No : {cusPhone}</ListGroup.Item>
            </ListGroup>
          </div>
        </Row>
      </Modal>
    </div>
  );
};

export default DelPending;
