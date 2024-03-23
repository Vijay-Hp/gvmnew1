import React from "react";
import { Row, Col, Button, Form, Container } from "react-bootstrap";
import { Route, NavLink, useNavigate } from "react-router-dom";
import "./style.js";
import { PATH } from "./Routes";
import Logimg from "../assets/login image.jpg";
import Signin from "../icons/google.svg";
import Login from "./login/login.js";
import Logout from "./login/logout .js";
import { useEffect } from "react";
import { gapi } from "gapi-script";

const clientId =
  "126838586158-7bu4j5fqu3l170am4rb6s8utlnq4ohfa.apps.googleusercontent.com";

export default function Logindef() {
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    }
    gapi.load("client:auth2", start);
  });

  const navigate = useNavigate();
  const handleAdminClick = () => {
    navigate(PATH.DASHBOARD);
  };
  const handleAdminClick1 = () => {
    navigate(PATH.USERDASHBOARD);
  };
  const bodyStyle = {
    backgroundColor: "#3d3b52",
    minHeight: "100vh", // Ensure the background covers the entire viewport height
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const box = {
    backgroundColor: "white",
    minHeight: "50vh",
    width: "100vh",
  };
  const signin = {
    textAlign: "center",
    fontSize: "30px",
    marginTop: "40px",
    fontWeight: "bold",
  };
  return (
    <>
      <div>
        <Button size="lg" onClick={handleAdminClick}>
          Admin
        </Button>
        <Button size="lg" onClick={handleAdminClick1}>
          User
        </Button>
      </div>
      <div style={bodyStyle}>
        <div style={box}>
          <Container>
            <Row>
              <Col xs={12} md={8} lg={6} className="d-grid gap-2 mt-5">
                <p style={signin}>Sign in</p>
                <Login />
                <br />
              </Col>
              <Col xs={12} md={8} lg={6} className="d-grid gap-2 mt-5">
                <img
                  src={Logimg}
                  className="rounded mx-auto d-block img-fluid"
                  alt="google logo"
                />
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
}
