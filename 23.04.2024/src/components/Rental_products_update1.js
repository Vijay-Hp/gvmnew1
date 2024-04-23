import React, { useState, useEffect, useContext } from "react";
import Container from "react-bootstrap/Container";
import { Row, Col, Button, Form } from "react-bootstrap";
import Rental_products from "./Rental_products";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {
  Id,
  Name,
  Radio,
  No,
  Btn,
  Nopoint,
  Place,
  Date,
  Topbutton,
  Topbutton1,
} from "./Input.js";
import { dataContext } from "./context/DataContext.jsx";
import axios from "axios";

const formStyle = {
  backgroundColor: "#232135",
  color: "white",
  border: "none",
};

const Start = () => {
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit">
      Rental Products
    </Link>,
    <Link underline="hover" key="2" color="white">
      Update Products
    </Link>,
  ];
  // navigate submit button
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate(); // Use useNavigate to get the navigate function
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
      // navigate("/add_purchase_payment");
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
              <NavLink
                to="/rental_products_update"
                activeClassName="activeButtonStyle"
              >
                <ArrowBackIcon style={{ color: "white", size: "30px" }} />
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
                    name="Product Id"
                    handleDataChange={handleDataChange}
                    textboxName="Product_id"
                  />
                  <Name
                    name="Product Name"
                    handleDataChange={handleDataChange}
                    textboxName="Product_name"
                  />
                  <No
                    name="Product Quantity"
                    handleDataChange={handleDataChange}
                    textboxName="Product_quantity"
                  />
                  <No
                    name="Days"
                    handleDataChange={handleDataChange}
                    textboxName="Days"
                  />
                  {/* <Form.Label
                    column
                    sm={4}
                    style={{ color: "white", marginTop: "5px" }}
                  >
                    From Date
                  </Form.Label>
                  <Col sm={3}>
                    <style>
                      {`
                        .date-input::-webkit-calendar-picker-indicator {
                          filter: invert(1);
                        } 
                      `}
                    </style>
                    <Form.Control
                      type="date"
                      style={formStyle}
                      className="date-input"
                    />
                  </Col>
                  <Form.Label
                    column
                    sm={1}
                    style={{ color: "white", marginTop: "5px" }}
                  >
                    To
                  </Form.Label>
                  <Col sm={4}>
                    <style>
                      {`
                        .date-input::-webkit-calendar-picker-indicator {
                          filter: invert(1);
                        } 
                      `}
                    </style>
                    <Form.Control
                      type="date"
                      style={formStyle}
                      className="date-input"
                    />
                  </Col> */}
                  <Date
                    name="Date"
                    handleDataChange={handleDataChange}
                    textboxName="Date"
                  />
                  <No
                    name="Total Amount"
                    handleDataChange={handleDataChange}
                    textboxName="total_amount"
                  />
                  <No
                    name="Balance Amount"
                    handleDataChange={handleDataChange}
                    textboxName="Balance_amount"
                  />
                  <Radio
                    name="Payment Method"
                    name1="Payment Method"
                    label1="Cash"
                    label2="Online Transaction"
                    value1="Cash"
                    value2="Online Transaction"
                    handleDataChange={handleDataChange}
                  />
                  <Btn btn="Update" />
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>

      <Routes>
        <Route path="/rental_products" element={<Rental_products />} />
      </Routes>
    </>
  );
};

export default Start;
