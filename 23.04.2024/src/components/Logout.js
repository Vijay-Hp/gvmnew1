import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Container from "react-bootstrap/Container";
import { Row, Col, Button, Form } from "react-bootstrap";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Card from "react-bootstrap/Card";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import Logout1 from "./login/logout ";

const Logout = () => {
  const breadcrumbs = [
    <Link underline="hover" key="1" color="white">
      Logout
    </Link>,
  ];
  return (
    <>
      <div
        style={{
          backgroundColor: "#3d3b52",
          borderRadius: "20px",
          paddingBottom: "50px",
          height: "630px",
        }}
      >
        <Container fluid>
          <Row>
            <Col xs={12} md={8} lg={12} className="d-grid gap-2 mt-5">
              <Stack spacing={3} style={{ marginTop: "30px" }}>
                <Breadcrumbs
                  separator={<NavigateNextIcon fontSize="small" />}
                  aria-label="breadcrumb"
                >
                  {breadcrumbs}
                </Breadcrumbs>
              </Stack>
            </Col>
          </Row>
          <Row>
            <Col
              xs={12}
              md={8}
              lg={{ span: 8, offset: 2 }}
              className="d-grid gap-2 mt-5"
            >
              <Card style={{ backgroundColor: "#232135" }}>
                <Card.Body
                  className="mt-5"
                  style={{ textAlign: "center", color: "white" }}
                >
                  <Card.Title>Are you sure want to </Card.Title>
                  <Card.Title>Log out? </Card.Title>
                </Card.Body>
                <Row
                  style={{
                    textAlign: "center",
                    color: "white",
                    height: "100px",
                  }}
                >
                  <Col lg={{ span: 3, offset: 3 }} className="text-center">
                    <NavLink to="/Dashboard" className="ul">
                      <Button size="lg" variant="light" className="w-100">
                        Cancel
                      </Button>
                    </NavLink>
                  </Col>
                  <Col lg={3} className="text-center">
                    <NavLink to="/" className="ul">
                      {/* <Button
                        size="lg"
                        style={{ backgroundColor: "#00a368", border: "none" }}
                        className="w-100"
                      >
                        Yes
                      </Button> */}
                      <Logout1 />
                    </NavLink>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Logout;
