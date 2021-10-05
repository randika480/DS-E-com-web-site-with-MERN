import React, { useState } from 'react';
import { Modal }  from "antd";
import { ListGroup, Button, Col, Row, Form } from "react-bootstrap";
import axios from "axios";


const SellerProfile = (props) => {

    const [updatevisible, setUpdateVisible] = useState(false);
    const [deletevisible, setDeleteVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");


    const showUpdateModal = () => {
        setUsername(props.sellerUsername);
        setEmail(props.sellerEmail);
        setAddress(props.sellerAddress);
        setPhone(props.sellerPhone);
        setUpdateVisible(true);
      };
    
      const showDeleteModal = () => {
        setDeleteVisible(true);
      };

      const handleOkUpdate = () => {
        setConfirmLoading(true);
        updateSellerHandler();
        setTimeout(() => {
          setUpdateVisible(false);
          setConfirmLoading(false);
        }, 3000);
      };

      const handleOkDelete = () => {
        setConfirmLoading(true);
        deleteSellerHandler();
        setTimeout(() => {
          setDeleteVisible(false);
          setConfirmLoading(false);
        }, 3000);
      };

      const handleCancel = () => {
        setUpdateVisible(false);
        setDeleteVisible(false);
       
      };

      const updateSellerHandler = async () => {
        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        };
    
        let dataObject = {
          username,
          email,
          address,
          phone,
          
        };
    
        try {
          await axios
            .put(
              "http://localhost:6500/ecom/api/sellerpvt/seller/update",
              dataObject,
              config
            )
            .then((res) => {
              alert(res.data.desc);
            })
            .catch((err) => {
              alert(err);
            });
        } catch (error) {
          alert("Error Occured-" + error);
        }
      };

      const deleteSellerHandler = async () => {
        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        };
        try {
          await axios
            .delete(
              "http://localhost:6500/ecom/api/sellerpvt/seller/delete",
              config
            )
            .then((res) => {
              alert(res.data.desc);
            })
            .catch((err) => {
              alert(err);
            });
        } catch (error) {
          alert("Error Occured-" + error);
        }
      };
    return (
        <div>
          <h3>Seller Profile</h3>  
          <ListGroup>
          <ListGroup.Item>User Name : {props.sellerUsername}</ListGroup.Item>
          <ListGroup.Item>Email : {props.sellerEmail}</ListGroup.Item>
          <ListGroup.Item>Address : {props.sellerAddress}</ListGroup.Item>
          <ListGroup.Item>Contact Number : (+94) {props.sellerPhone}</ListGroup.Item>
          <ListGroup.Item>
          <Button onClick={showUpdateModal} size="sm" variant="outline-primary">
            Edit Account Details
          </Button>{" "}
          <Button onClick={showDeleteModal} size="sm" variant="outline-danger">
            Delete Account
          </Button>{" "}
          </ListGroup.Item>
          </ListGroup>
          <Modal
          title="Seller Profile Update"
          visible={updatevisible}
          onOk={handleOkUpdate}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
        <Form>
        {error && <span className="error-message">{error}</span>}
        <Form.Group controlId="formGroupUserName">
          <Form.Label>User Name</Form.Label>
          <Form.Control type="text"  value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}/>
        </Form.Group>
        <Form.Group controlId="formGroupEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email"  value={email}
          onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>
          <Form.Group controlId="formGroupAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text"   value={address}
          onChange={(e) => setAddress(e.target.value)}/>
       </Form.Group>
         <Form.Group controlId="formGroupPhone">
         <Form.Label>Phone</Form.Label>
         <Form.Control type="tel"   pattern="[0-9]{3}[0-9]{7}"  maxLength="10"
         minLength="10"
         value={phone}
         onChange={(e) => setPhone(e.target.value)}/>
      </Form.Group>
      </Form>
      </Modal>
      <Modal
        title="Profile Delete"
        visible={deletevisible}
        onOk={handleOkDelete}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>Press OK to confirm delete user account</p>
      </Modal>
           
        </div>
    )
}

export default SellerProfile