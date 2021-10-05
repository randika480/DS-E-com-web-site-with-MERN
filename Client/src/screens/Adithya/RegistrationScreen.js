import React from "react";
import "./RegistrationScreen.css";
import { Row, Col, Image } from "antd";

import Registration from "../../components/Adithya/Registration";

const RegistrationScreen = () => {
  localStorage.removeItem("selectedCategory");
  return (
    <div className="reg-body">
      <Row>
        <Col span={24}>
          Register with no-time and start shopping without any hassle...
        </Col>
      </Row>
      <Row>
        <Col
          span={12}
          lg={12}
          md={24}
          sm={24}
          xs={24}
          className="reg-form-side"
        >
          <Registration />
        </Col>
        <Col span={12} lg={12} md={24} sm={24} xs={24} className="reg-img-side">
          <Image
            preview={false}
            height={550}
            width="90%"
            src={"https://i.ibb.co/N9Gc4RK/undraw-secure-login-pdn4.png"}
          />
        </Col>
      </Row>
    </div>
  );
};

export default RegistrationScreen;
