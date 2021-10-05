import React, { useState } from "react";
import { Modal, Alert } from "antd";
import { ListGroup, Button, Col, Form } from "react-bootstrap";
import "./CustomerDetails.css";
import { Image } from "cloudinary-react";
import axios from "axios";
import FileBase from "react-file-base64";

const CustomerDetails = (props) => {
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [enc2Data, setEnc2Data] = useState(null);
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  const showModal1 = () => {
    setUsername(props.cusUsername);
    setEmail(props.cusEmail);
    setPhone(props.cusPhone);
    setAddress(props.cusAddress);
    setVisible1(true);
  };

  const showModal2 = () => {
    setVisible2(true);
  };

  const showModal3 = () => {
    setVisible3(true);
  };

  const handleOk1 = () => {
    setConfirmLoading(true);
    updateCustomerHanler();
    setTimeout(() => {
      setVisible1(false);
      setConfirmLoading(false);
    }, 3000);
  };

  const handleOk2 = () => {
    setConfirmLoading(true);
    // updatePictureHanler();
    setTimeout(() => {
      setVisible2(false);
      setConfirmLoading(false);
    }, 3000);
  };

  const handleOk3 = () => {
    setConfirmLoading(true);
    deleteCustomerHandler();
    setTimeout(() => {
      setVisible3(false);
      setConfirmLoading(false);
    }, 3000);
  };

  const handleCancel = () => {
    setVisible1(false);
    setVisible2(false);
    setVisible3(false);
  };

  //   const updatePictureHanler = async () => {
  //     const config = {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  //       },
  //     };

  //     let dataObject = { fileEnc: enc2Data };
  //     await axios.post()
  //   };

  const deleteCustomerHandler = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    try {
      await axios
        .delete(
          "http://localhost:6500/ecom/api/customerpvt/profile/customer/delete",
          config
        )
        .then((res) => {
          localStorage.removeItem("authToken");
          localStorage.removeItem("userRole");
          // localStorage.setItem("authToken", undefined);
          // localStorage.setItem("userRole", undefined);
          window.location = "/";
        })
        .catch((err) => {
          alert(err);
        });
    } catch (error) {
      alert("Error Occured-" + error);
    }
  };

  const updateCustomerHanler = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };

    let dataObject = {
      username,
      email,
      contactNo: phone,
      address,
    };

    try {
      await axios
        .put(
          "http://localhost:6500/ecom/api/customerpvt/profile/customer/update",
          dataObject,
          config
        )
        .then((res) => {
          alert("Customer Update Successfully!");
          window.location.reload();
        })
        .catch((err) => {
          alert(err);
        });
    } catch (error) {
      alert("Error Occured-" + error);
    }
  };

  return (
    <div className="custom-cusprof-navigation-panel">
      <ListGroup variant="flush">
        <ListGroup.Item className="custom-cusprof-pp">
          <Image
            className="custom-cusprof-pp-img "
            cloudName="grid1234"
            publicId={props.cusPP}
          />
        </ListGroup.Item>
        <ListGroup.Item>{props.cusUsername}</ListGroup.Item>
        <ListGroup.Item>{props.cusEmail}</ListGroup.Item>
        <ListGroup.Item>
          {props.cusAddress.length > 1 ? (
            props.cusAddress
          ) : (
            <Alert
              message="Please add your delivery address"
              description="You can either provide perment delivery address in user profile or use tempory address when purchasing products"
              type="warning"
              showIcon
            />
          )}
        </ListGroup.Item>
        <ListGroup.Item>(+94) {props.cusPhone}</ListGroup.Item>
        <ListGroup.Item>
          <Button onClick={showModal1} size="sm" variant="outline-primary">
            Edit Details
          </Button>{" "}
          <Button onClick={showModal3} size="sm" variant="outline-danger">
            Delete Account
          </Button>{" "}
          <Button onClick={showModal2} size="sm" variant="outline-success">
            Update Picture
          </Button>
        </ListGroup.Item>
      </ListGroup>
      <Modal
        title="Customer Profile Update"
        visible={visible1}
        onOk={handleOk1}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form>
          {error && <span className="error-message">{error}</span>}
          <Form.Row>
            <Form.Group as={Col} md={6} controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter new username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group as={Col} md={6} controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md={6} controlId="phone">
              <Form.Label>Contact no.</Form.Label>
              <Form.Control
                type="text"
                placeholder="0xx-xxxxxxx"
                maxLength="10"
                minLength="10"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col} md={6} controlId="phone">
              <Form.Label>Delivery Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="(Optional)"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>
          </Form.Row>
        </Form>
      </Modal>
      <Modal
        title="Profile Picture Update"
        visible={visible2}
        onOk={handleOk2}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form.Group controlId="fileupload">
          <Form.Label>Profile Picture</Form.Label>
          <h6>**Please do not exceed the amount of file size 25MB </h6>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => {
              setEnc2Data(base64);
            }}
          />
        </Form.Group>
      </Modal>
      <Modal
        title="Profile Delete"
        visible={visible3}
        onOk={handleOk3}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>This process can not undo, Press OK to delete user account</p>
      </Modal>
    </div>
  );
};

export default CustomerDetails;
