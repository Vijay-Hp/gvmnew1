import React, { useState, useEffect, useContext } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Container from "react-bootstrap/Container";
import { Row, Col, Button, Form } from "react-bootstrap";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import Add_construction_view from "./Add_construction_view";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import "./style.js";
import {
  Id,
  Name,
  Radio,
  No,
  Btn,
  Topbutton,
  Topbutton1,
  Date,
  Mbl,
} from "./Input.js";
import { dataContext } from "./context/DataContext.jsx";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";

function Add_construction() {
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit">
      Constructions
    </Link>,
    <Link underline="hover" key="2" color="white">
      Registration
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
      navigate("/add_construction_empsalary");
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

            {/* <Col xs={12} md={8} lg={4} className="d-grid gap-2 mt-5">
              <NavLink to="/add_construction" className="ul">
                <Topbutton topname="Add Details" />
              </NavLink>
            </Col>

            <Col xs={12} md={8} lg={4} className="d-grid gap-2 mt-5">
              <NavLink to="/add_construction_empsalary" className="ul">
                <Topbutton1 topname="Employee Salary" />
              </NavLink>
            </Col>

            <Col xs={12} md={8} lg={4} className="d-grid gap-2 mt-5">
              <NavLink to="/add_construction_view" className="ul">
                <Topbutton1 topname="View Details" />
              </NavLink>
            </Col> */}

            <Col
              xs={12}
              md={8}
              lg={{ span: 6, offset: 3 }}
              className="d-grid gap-2 mt-5"
            >
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="validationCustom01"
                >
                  <Name
                    name="Construction Id"
                    handleDataChange={handleDataChange}
                    textboxName="construction_id"
                  />
                  <Name
                    name="Building Name"
                    handleDataChange={handleDataChange}
                    textboxName="building_name"
                  />
                  <Name
                    name="Manager Name"
                    handleDataChange={handleDataChange}
                    textboxName="manager_name"
                  />
                  <Mbl
                    name="Mobile Number"
                    handleDataChange={handleDataChange}
                    textboxName="mobile_number"
                  />
                  <No
                    name="Total Workers"
                    handleDataChange={handleDataChange}
                    textboxName="total_workers"
                  />
                  <No
                    name="Total Amount"
                    handleDataChange={handleDataChange}
                    textboxName="total_amount"
                  />
                  <Date
                    name="Date"
                    handleDataChange={handleDataChange}
                    textboxName="date"
                  />
                  <Name
                    name="Location"
                    handleDataChange={handleDataChange}
                    textboxName="location"
                  />
                  <Btn btn="Submit" />
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
export default Add_construction;
