import React, { useState } from "react";
import { ListGroup } from "react-bootstrap";
import Pending from "../../components/Randika/DelPending";
import Shipped from "../../components/Randika/DelShipped";
import Delivered from "../../components/Randika/DelDelivered";
import Returned from "../../components/Randika/DelReturned";
import "./AdminDelivery.css";

const AdminDelivery = () => {
  const [pendingSection, setPendingSection] = useState(true);
  const [shippedSection, setShippedSection] = useState(false);
  const [deliveredSection, setDeliveredSection] = useState(false);
  const [returnedSection, setReturnedSection] = useState(false);

  return (
    <div className="adminDelContainor">
      <div>
        <ListGroup horizontal className="nav">
          <ListGroup.Item
            className="navItem"
            onClick={() => {
              setShippedSection(false);
              setDeliveredSection(false);
              setReturnedSection(false);
              setPendingSection(true);
            }}
          >
            Pending
          </ListGroup.Item>
          <ListGroup.Item
          className="navItem"
            onClick={() => {
              setDeliveredSection(false);
              setReturnedSection(false);
              setPendingSection(false);
              setShippedSection(true);
            }}
          >
            Shipped
          </ListGroup.Item>
          <ListGroup.Item
          className="navItem"
            onClick={() => {
              setReturnedSection(false);
              setPendingSection(false);
              setShippedSection(false);
              setDeliveredSection(true);
            }}
          >
            Delivered
          </ListGroup.Item>
          <ListGroup.Item
          className="navItem"
            onClick={() => {
              setPendingSection(false);
              setShippedSection(false);
              setDeliveredSection(false);
              setReturnedSection(true);
            }}
          >
            Returned
          </ListGroup.Item>
        </ListGroup>
      </div>

      <div className="bodyContainor">
        {pendingSection && <Pending />}
        {shippedSection && <Shipped />}
        {deliveredSection && <Delivered />}
        {returnedSection && <Returned />}
      </div>
    </div>
  );
};

export default AdminDelivery;
