import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Form, Button, Col, Row } from "react-bootstrap";
import axios from "axios";
import "./LoginScreen.css";

const LoginScreen = () => {
  localStorage.removeItem("selectedCategory");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [role, setRole] = useState("");
  const [part2, setPart2] = useState(false);

  const part2Handler = () => {
    if (!role) {
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Select your account type to proceed with Login");
    } else {
      setPart2(true);
    }
  };

  const goBackHandler = () => {
    setPart2(false);
    setRole("");
  };

  const loginHandler = async (e) => {
    e.preventDefault();

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
    <Container className="login-container">
      <div className="login-form-body">
        <Row>
          <Col span={12} className="login-body-img-side"></Col>
          <Col span={12} className="login-body-form-side">
            <Form onSubmit={loginHandler}>
              {error && <span className="error-message">{error}</span>}
              {!part2 ? (
                <div>
                  <Form.Group className="login-role-selection">
                    <Form.Label as="legend" column sm={12}>
                      Login as:
                    </Form.Label>
                    <Col sm={12}>
                      <Form.Check
                        type="radio"
                        required={true}
                        label="Customer"
                        onClick={() => {
                          setRole("customer");
                        }}
                        id="formHorizontalRadios1"
                        name="formHorizontalRadios"
                      />
                      <Form.Check
                        type="radio"
                        required={true}
                        label="Seller"
                        onClick={() => {
                          setRole("seller");
                        }}
                        id="formHorizontalRadios2"
                        name="formHorizontalRadios"
                      />
                    </Col>
                  </Form.Group>
                  <Button variant="warning" onClick={part2Handler}>
                    Next
                  </Button>
                </div>
              ) : (
                <div className="login-body-p2">
                  <Button
                    className="back-btn"
                    variant="warning"
                    onClick={goBackHandler}
                  >
                    Back
                  </Button>
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
                    <Form.Group as={Col} md={12}>
                      <Form.Text className="text-muted">
                        Forgot password?
                      </Form.Text>
                      <Button variant="outline-success" size="sm">
                        switch to reset password
                      </Button>
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} md={12} className="login-btn">
                      <Button variant="primary" type="submit" block>
                        Login
                      </Button>
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Text className="text-muted">
                      Create new account&nbsp;
                    </Form.Text>
                    <Link to="/registration" className="custom-text-size">
                      &nbsp;Click here!
                    </Link>
                  </Form.Row>
                </div>
              )}
            </Form>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default LoginScreen;
