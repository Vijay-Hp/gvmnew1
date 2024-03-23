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
import { Id, Name, Radio, No, Btn, Topbutton, Topbutton1 } from "./Input.js";
import { dataContext } from "./context/DataContext.jsx";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function Add_construction_empsal() {
  const breadcrumbs = [
    <Link underline="hover" key="1" color="white">
      Constructions
    </Link>,
    <Link underline="hover" key="2" color="white">
      Employee Salary
    </Link>,
  ];
  // navigate submit button
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  const { purchaseData, setPurchaseData } = useContext(dataContext);
  const [age, setAge] = useState("");
  const [type, setType] = useState("");
  console.log("purchaseData", purchaseData);

  const handleDataChange = (e) => {
    const { name, value } = e.target;
    if (name === "category") 
    {
      setPurchaseData({
        ...purchaseData,
        [name]: value,
      });
      setAge(value);
    }
    if (name === "type") 
    {
      setPurchaseData({
        ...purchaseData,
        [name]: value,
      });
      setType(value);
    } 
    else 
    {
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
      const newData = {
        building_name: purchaseData.building_name,
        manager_name: purchaseData.manager_name,
        total_workers: purchaseData.total_workers,
        total_amount: purchaseData.total_amount,
        location: purchaseData.location,
        category: purchaseData.category,
        type: purchaseData.type,
        salary_amount: purchaseData.salary_amount,
        payment_method: purchaseData.payment_method
      };
      
      console.log(newData);

      axios
        .post(
          "http://localhost/GVM_Backend/controllers/api/post/addConstructionDetails.php",
          newData
        )
        .then((response) => {
         // console.log("Data sent successfully:", response.data);
          toast.success("Data Insert Successfully!");
        })
        .catch((error) => {
          console.error("Error sending data:", error);
        });
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
              <NavLink to="/add_construction" className="ul">
                <Topbutton1 topname="Add Details" />
              </NavLink>
            </Col>

            <Col xs={12} md={8} lg={4} className="d-grid gap-2 mt-5">
              <NavLink to="/add_construction" className="ul">
                <Topbutton topname="Employee Salary" />
              </NavLink>
            </Col>

            <Col xs={12} md={8} lg={4} className="d-grid gap-2 mt-5">
              <NavLink to="/add_construction_view" className="ul">
                <Topbutton1 topname="View Details" />
              </NavLink>
            </Col>
          </Row>
        </Container>
      </div>

      <div
        style={{
          backgroundColor: "#3d3b52",
          borderRadius: "20px",
          paddingBottom: "173px",
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
                  <Form.Label
                    column
                    sm={4}
                    style={{
                      color: "white",
                      marginTop: "5px",
                      marginBottom: "30px",
                    }}
                  >
                   Category
                  </Form.Label>
                  <Col sm={8}>
                    <FormControl fullWidth>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}
                        onChange={handleDataChange}
                        textboxName="category"
                        name="category"
                      >
                        <MenuItem value={"none"}>None</MenuItem>
                        <MenuItem value={"Category1"}>Category1</MenuItem>
                        <MenuItem value={"Category2"}>Category2</MenuItem>
                        <MenuItem value={"Category3"}>Category3</MenuItem>
                      </Select>
                    </FormControl>
                  </Col>

                  <Form.Label
                    column
                    sm={4}
                    style={{
                      color: "white",
                      marginTop: "5px",
                      marginBottom: "30px",
                    }}
                  >
                     Type
                  </Form.Label>
                  <Col sm={8}>
                    <FormControl fullWidth>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={type}
                        onChange={handleDataChange}
                        textboxName="type"
                        name="type"
                      
                      >
                        <MenuItem value={"None"}>None</MenuItem>
                        <MenuItem value={"Type1"}>Type1</MenuItem>
                        <MenuItem value={"Type2"}>Type2</MenuItem>
                        <MenuItem value={"Type3"}>Type3</MenuItem>
                      </Select>
                    </FormControl>
                  </Col>
                  <No
                    name="Salary Amount"
                    handleDataChange={handleDataChange}
                    textboxName="salary_amount"
                  />
                  <Radio
                    name="Payment Method"
                    name1="payment_method"
                    label1="Cash"
                    label2="Online Transaction"
                    value1="Cash"
                    value2="Online Transaction"
                    handleDataChange={handleDataChange}
                    textboxName="payment_method"
                  />
                  <Btn btn="Submit" />
                  <ToastContainer
                    position="top-right"
                    autoClose={2500}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
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
export default Add_construction_empsal;
