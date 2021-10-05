import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import axios from "axios";
import FileBase from "react-file-base64";
import "./Registration.css";

const Registration = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [enc2Data, setEnc2Data] = useState(null);
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [role, setRole] = useState("");

  const registrationHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmpassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords do not match");
    } else if (
      username.trim().length === 0 ||
      email.trim().length === 0 ||
      password.trim().length === 0 ||
      phone.trim().length === 0
    ) {
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Please fill all the fields");
    } else if (!phone.trim().match("^[0][0-9]*$") || phone.trim().length < 10) {
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Please provide valid contact number");
    } else if (password.trim().length < 6) {
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Please use a password with at least 6 characters");
    } else {
      if (role === "Customer") {
        let reqObject = {
          username: username,
          email: email,
          password: password,
          fileEnc: enc2Data,
          contactNo: phone,
        };
        await axios
          .post("http://localhost:6500/ecom/api/auth/reg-customer", reqObject)
          .then((res) => {
            localStorage.setItem("authToken", res.data.token);
            localStorage.setItem("userRole", res.data.role);
            window.location = `/profile/${res.data.role}`;
          })
          .catch((err) => {
            setError(err.response.data.desc);
            setTimeout(() => {
              setError("");
            }, 5000);
          });
      } else {
        let reqObject = {
          username,
          email,
          password,
          address,
          contactNo: phone,
        };
        await axios
          .post("http://localhost:6500/ecom/api/auth/reg-seller", reqObject)
          .then((res) => {
            localStorage.setItem("authToken", res.data.token);
            localStorage.setItem("userRole", res.data.role);
            window.location = `/profile/${res.data.role}`;
          })
          .catch((err) => {
            setError(err.response.data.desc);
            setTimeout(() => {
              setError("");
            }, 5000);
          });
      }
    }
  };

  return (
    <div className="reg-form-body">
      <Form onSubmit={registrationHandler}>
        {error && <span className="error-message">{error}</span>}
        <Form.Row>
          <Form.Group as={Col} md={6} controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
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
            <Form.Text className="text-muted">
              We won't share your email with anyone else.
            </Form.Text>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} md={6} controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password with at least 6 characters"
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col} md={6} controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Col md={7}>
            <Form.Group controlId="phone">
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
          </Col>
        </Form.Row>
        <Form.Group>
          <Form.Label as="legend" column sm={12}>
            Register as:
          </Form.Label>
          <Col sm={12}>
            <Form.Check
              type="radio"
              required={true}
              label="Customer"
              onClick={() => {
                setRole("Customer");
              }}
              id="formHorizontalRadios1"
              name="formHorizontalRadios"
            />
            <Form.Check
              type="radio"
              required={true}
              label="Selller"
              onClick={() => {
                setRole("Seller");
              }}
              id="formHorizontalRadios2"
              name="formHorizontalRadios"
            />
          </Col>
        </Form.Group>
        {role === "Customer" && (
          <div>
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

            <Button type="submit">Submit</Button>
          </div>
        )}
        {role === "Seller" && (
          <div>
            <Form.Group controlId="fileupload">
              <Form.Label>Shipping From address:</Form.Label>
              <Form.Control
                type="textarea"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>

            <Button type="submit">Submit</Button>
          </div>
        )}
      </Form>
    </div>
  );
};

export default Registration;
