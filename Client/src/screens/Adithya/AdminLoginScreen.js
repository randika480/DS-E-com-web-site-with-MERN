import React, { useState } from "react";
import "./AdminLoginScreen.css";
import { Container, Form, Button, Col, Row } from "react-bootstrap";
import axios from "axios";

const AdminLoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loginHandler = async (e) => {
    e.preventDefault();

    let role = "admin";

    if (email.trim().length === 0 || password.trim().length === 0) {
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Please fill all the fields");
    } else if (password.trim().length < 6) {
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Please use a valid password");
    } else {
      let postObject = { email, password, role };
      try {
        const { data } = await axios.post(
          "http://localhost:6500/ecom/api/auth/login",
          postObject
        );

        localStorage.setItem("authToken", data.token);
        localStorage.setItem("userRole", data.user.role);
        alert("token set:" + data.token + "and user ID:" + data.user._id);

        window.location = `/profile/${data.user.role}`;
      } catch (err) {
        setError(err.response.data.desc);
        setTimeout(() => {
          setError("");
        }, 5000);
      }
    }
  };

  return (
    <Container className="admin-login-container">
      <div className="admin-login-form-body">
        <Form onSubmit={loginHandler}>
          {error && <span className="error-message">{error}</span>}
          <h2>Admin Login</h2>
          <Form.Row>
            <Form.Group as={Col} md={12} controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md={12} controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md={12} className="login-btn">
              <Button variant="primary" type="submit" block>
                Login
              </Button>
            </Form.Group>
          </Form.Row>
        </Form>
      </div>
    </Container>
  );
};

export default AdminLoginScreen;
