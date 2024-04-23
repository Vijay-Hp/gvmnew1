import React, { useState, useEffect, useContext } from "react";
import Container from "react-bootstrap/Container";
import { Row, Col, Button, Form } from "react-bootstrap";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import { dataContext } from "../context/DataContext.jsx";
import {
  Id,
  Name,
  Radio,
  No,
  Btn,
  Topbutton,
  Topbutton1,
  Mbl,
  Radio1,
} from "../Input.js";
import axios from "axios";

function UserAdd_sales() {
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit">
      Sales
    </Link>,
    <Link underline="hover" key="2" color="white">
      Add Sales
    </Link>,
  ];
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  const { purchaseData, setPurchaseData } = useContext(dataContext);

  console.log("purchaseData", purchaseData);

  const handleDataChange = (e) => {
    setPurchaseData({
      ...purchaseData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      navigate("/useradd_sales_payment");
    }

    setValidated(true);
  };

  return (
    <>
      <div
        style={{
          backgroundColor: "#3d3b52",
          borderRadius: "20px",
          paddingBottom: "50px",
        }}
      >
        <Container fluid>
          <Row>
            <Stack spacing={3} style={{ marginTop: "30px" }}>
              <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                aria-label="breadcrumb"
              >
                {breadcrumbs}
              </Breadcrumbs>
            </Stack>
            <Col xs={12} md={8} lg={4} className="d-grid gap-2 mt-5">
              <NavLink to="/useradd_sales" className="ul">
                <Topbutton topname="Sales" />
              </NavLink>
            </Col>
            <Col xs={12} md={8} lg={4} className="d-grid gap-2 mt-5">
              <NavLink to="/useradd_sales_payment" className="ul">
                <Topbutton1 topname="Payment" />
              </NavLink>
            </Col>
            <Col xs={12} md={8} lg={4} className="d-grid gap-2 mt-5">
              <NavLink to="/useradd_purchase_vehicle" className="ul">
                <Topbutton1 topname="Vehicle" />
              </NavLink>
            </Col>
          </Row>
        </Container>
      </div>

      <div
        style={{
          backgroundColor: "#3d3b52",
          borderRadius: "20px",
          paddingBottom: "50px",
          marginTop: "2px",
        }}
      >
        <Container fluid>
          <Row>
            <Col
              xs={12}
              md={8}
              lg={{ span: 6, offset: 3 }}
              className="d-grid gap-2 mt-3"
            >
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="validationCustom01"
                >
                  <Id
                    name="Sales Id"
                    handleDataChange={handleDataChange}
                    textboxName="sales_id"
                  />
                  <Mbl
                    name="Mobile Number"
                    handleDataChange={handleDataChange}
                    textboxName="mobile_no"
                  />
                  <Name
                    name="Customer Name"
                    handleDataChange={handleDataChange}
                    textboxName="customer_name"
                  />
                  <Radio1
                    name="Customer Type"
                    name1="customer_type"
                    label1="New"
                    label2="Existing"
                    value1="New"
                    value2="Existing"
                    handleDataChange={handleDataChange}
                    textboxName="customer_type"
                  />
                  <Name
                    name="Location"
                    handleDataChange={handleDataChange}
                    textboxName="location"
                  />
                  <Name
                    name="Site Name"
                    handleDataChange={handleDataChange}
                    textboxName="site_name"
                  />
                  <Btn btn="Next" />
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
export default UserAdd_sales;
