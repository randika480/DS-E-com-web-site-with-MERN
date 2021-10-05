import React, { useEffect } from "react";
import "./Header.css";
import { Container, Navbar, Nav } from "react-bootstrap";
import {
  ShoppingCartOutlined,
  UserAddOutlined,
  UserSwitchOutlined,
  PoweroffOutlined,
  UserOutlined,
} from "@ant-design/icons";

const Header = () => {
  const hasToken = localStorage.getItem("authToken");
  const hasRole = localStorage.getItem("userRole");

  const logOutHandler = () => {
    // localStorage.setItem("authToken", undefined);
    // localStorage.setItem("userRole", undefined);
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    window.location = "/login";
  };

  return (
    <div className="custome-header-body">
      <Navbar
        className="custome-nav-bar-styles"
        variant="dark"
        expand="lg"
        collapseOnSelect
      >
        <Container className="py-1">
          <Navbar.Brand href="/">
            <div className="custom-style-shopName">GRID-Ecom-Shop</div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              {hasRole === "customer" && (
                <Nav.Link href="/cart" className="custom-style-header-navlinks">
                  <ShoppingCartOutlined style={{ fontSize: "1.5em" }} />
                  Cart
                </Nav.Link>
              )}
              {hasToken && (
                <Nav.Link
                  href={`/profile/${hasRole}`}
                  className="custom-style-header-navlinks"
                >
                  <UserOutlined style={{ fontSize: "1.5em" }} />
                  Profile
                </Nav.Link>
              )}

              {!hasToken && (
                <Nav.Link
                  href="/registration"
                  className="custom-style-header-navlinks"
                >
                  <UserAddOutlined style={{ fontSize: "1.5em" }} />
                  SignUp
                </Nav.Link>
              )}

              {!hasToken && (
                <Nav.Link
                  href="/login"
                  className="custom-style-header-navlinks"
                >
                  <UserSwitchOutlined style={{ fontSize: "1.5em" }} />
                  Login
                </Nav.Link>
              )}

              {hasToken && (
                <Nav.Link
                  onClick={logOutHandler}
                  className="custom-style-header-navlinks"
                >
                  <PoweroffOutlined style={{ fontSize: "1.5em" }} />
                  Logout
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
