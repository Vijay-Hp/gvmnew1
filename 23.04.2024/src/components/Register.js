import React, { useState, useEffect ,useContext} from "react";
import Container from "react-bootstrap/Container";
import { Row, Col, Button, Form } from "react-bootstrap";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Card from "react-bootstrap/Card";
import { Id, Name, Radio, No, Btn, Dropdown, Radiothree, Topbutton1, Topbutton, Mail } from "./Input.js";
import { dataContext } from "./context/DataContext.jsx";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Register() {
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit">
      Admin
    </Link>,
    <Link underline="hover" key="2" color="white">
      Register
    </Link>,
  ];
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  const { purchaseData, setPurchaseData } = useContext(dataContext);

  console.log("purchaseData", purchaseData);

  const handleDataChange = (e) => {
    const newData = {
      ...purchaseData,
      [e.target.name]: e.target.value,
    };
    setPurchaseData(newData);
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const newData = {
        email: purchaseData.email,
      };

      console.log(newData);

      axios
        .post(
          "https://vebbox.in/gvmbackend/controllers/api/post/addUserDetails.php",
          newData
        )
        .then((response) => {
          console.log("Data sent successfully:", response.data);
          toast.success("Data Insert Successfully!");
        })
        .catch((error) => {
          console.error("Error sending data:", error);
          toast.error("Data Not Insert!");
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
            <Col xs={12} md={8} lg={6} className="d-grid gap-2 mt-5">
              <NavLink to="/register" className="ul">
              <Topbutton topname="Add User" />
              </NavLink>
            </Col>
            <Col xs={12} md={8} lg={6} className="d-grid gap-2 mt-5">
              <NavLink to="/register_exist" className="ul">
              <Topbutton1 topname="Already Exist" />
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
              className="d-grid gap-2"
              style={{ marginTop: "100px", marginBottom: "180px" }}
            >
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="validationCustom01"
                >
                  <Mail name="E-Mail Id"  handleDataChange={handleDataChange} textboxName="email"/>
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
export default Register;
