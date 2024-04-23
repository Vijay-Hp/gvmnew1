import React, { useState, useEffect, useContext } from "react";
import Container from "react-bootstrap/Container";
import { Row, Col, Button, Form } from "react-bootstrap";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import "./style.js";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import {
  Id,
  Name,
  Radio,
  No,
  Btn,
  Topbutton,
  Topbutton1,
  Dropdown,
  Radio1,
  Mbl,
} from "../Input.js";
import { dataContext } from "../context/DataContext.jsx";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";

function UserAdd_purchase() {
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit">
      Purchase
    </Link>,
    <Link underline="hover" key="2" color="white">
      Add Purchase
    </Link>,
  ];
  // navigate submit button
  const navigate = useNavigate();
  const { purchaseData, updateDropdownPurchaseData, setPurchaseData } =
    useContext(dataContext);
  const [validated, setValidated] = useState(false);
  const [age, setAge] = useState("");

  console.log("purchaseData", purchaseData);

  const handleDataChange = (e) => {
    const { name, value } = e.target;
    if (name === "wages type") {
      setPurchaseData({
        ...purchaseData,
        [name]: value,
      });
      setAge(value);
    } else {
      setPurchaseData({
        ...purchaseData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      navigate("/useradd_purchase_payment");
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
              <NavLink to="/user_addpurchase" className="ul">
                <Topbutton topname="Purchase" />
              </NavLink>
            </Col>

            <Col xs={12} md={8} lg={4} className="d-grid gap-2 mt-5">
              <NavLink to="/useradd_purchase_payment" className="ul">
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
                    name="Purchase Id"
                    handleDataChange={handleDataChange}
                    textboxName="purchase_id"
                  />
                  <Mbl
                    name="Mobile Number"
                    handleDataChange={handleDataChange}
                    textboxName="mobile_number"
                  />
                  <Name
                    name="Vendor Name"
                    handleDataChange={handleDataChange}
                    textboxName="vendor_name"
                  />
                  <Radio1
                    name="Vendor Type"
                    name1="vendor_type"
                    label1="New"
                    label2="Existing"
                    value1="New"
                    value2="Existing"
                    handleDataChange={handleDataChange}
                    textboxName="vendor_type"
                  />
                  <Name
                    name="Location"
                    handleDataChange={handleDataChange}
                    textboxName="location"
                  />
                  <Btn
                    btn="Next"
                    handleDataChange={handleDataChange}
                    textboxName="total_amount"
                  />
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
export default UserAdd_purchase;
