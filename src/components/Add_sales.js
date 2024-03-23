import React, { useState, useEffect, useContext } from "react";
import Container from "react-bootstrap/Container";
import { Row, Col, Button, Form } from "react-bootstrap";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Id,
  Name,
  Radio,
  No,
  Btn,
  Topbutton,
  Topbutton1,
  Radio1,
  Mbl,
} from "./Input.js";
import { dataContext } from "./context/DataContext.jsx";
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function Add_sales() {
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
  const [age, setAge] = useState("");
  console.log("purchaseData", purchaseData);

  const handleDataChange = (e) => {
    const { name, value } = e.target;
    if (name === "wages_type") {
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
      navigate("/add_sales_payment");
    }

    setValidated(true);
  };
  //dropdown
  const handleDropdownChange = (e) => {
    const { value } = e.target;
    setValue(value); // Update state with selected value
    setPurchaseData({
      ...purchaseData,
      wages_type: value, // Update data context with selected value
    });
  };

  const [value, setValue] = useState("");
  const options = [
    { label: "none", value: "none" },
    { label: "red", value: "red" },
    { label: "green", value: "green" },
    { label: "pink", value: "pink" },
  ];

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
              <NavLink to="/add_sales" className="ul">
                <Topbutton topname="Sales" />
              </NavLink>
            </Col>
            <Col xs={12} md={8} lg={4} className="d-grid gap-2 mt-5">
              <NavLink to="/add_sales_payment" className="ul">
                <Topbutton1 topname="Payment" />
              </NavLink>
            </Col>
            <Col xs={12} md={8} lg={4} className="d-grid gap-2 mt-5">
              <NavLink to="/add_purchase_vehicle" className="ul">
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
                  {/* <Name
                    name="Others"
                    handleDataChange={handleDataChange}
                    textboxName="others"
                  />
                  <Form.Label
                    column
                    sm={4}
                    style={{
                      color: "white",
                      marginTop: "5px",
                      marginBottom: "30px",
                    }}
                  >
                    Constructions
                  </Form.Label>
                  <Col sm={8}>
                    <select
                      className="form-select"
                      onChange={handleDropdownChange}
                      value={value}
                    >
                      {options.map((option) => (
                        <option value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </Col> */}
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
export default Add_sales;
