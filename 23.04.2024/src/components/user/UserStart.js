import React, { useState, useEffect, useContext } from "react";
import Container from 'react-bootstrap/Container';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { Routes, Route, NavLink,useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
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
} from "../Input.js";
import { dataContext } from "../context/DataContext.jsx";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const UserStart = () => {
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit">
      Rental Products
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="white"

    >
      Add Products
    </Link>
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
      }  else {
        const newData = {
          product_quantity: purchaseData.product_quantity,
          total_amount: purchaseData.total_amount,
          product_id: purchaseData.product_id,
          product_name: purchaseData.product_name,
          product_quantity1: purchaseData.product_quantity1,
          days: purchaseData.days,
          date: purchaseData.date,
          total_amount1: purchaseData.total_amount1,
          balance_amount: purchaseData.balance_amount,
          payment_method: purchaseData.payment_method,
        };
        
        console.log(newData);
  
        axios
          .post(
            "https://vebbox.in/gvmbackend/controllers/api/post/addRentalDetails.php",
            newData
          )
          .then((response) => {
            console.log("Data sent successfully:", response.data);
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
      <div style={{ backgroundColor: '#3d3b52', borderRadius: '20px', paddingBottom: '50px' }}>
        <Container fluid>
          <Row>
            <Stack spacing={3} style={{ marginTop: '30px' }}>
              <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                {breadcrumbs}
              </Breadcrumbs>
            </Stack>
            <Col xs={12} md={8} lg={4} className="d-grid gap-2 mt-5">
              <NavLink to="/user_rentalproducts" activeClassName="activeButtonStyle">
                <ArrowBackIcon style={{ color: 'white', size: '30px' }} />
              </NavLink>
            </Col>
          </Row>
        </Container>
      </div>
      <div style={{ backgroundColor: '#3d3b52', borderRadius: '20px', paddingBottom: '50px', marginTop: '2px' }}>
        <Container fluid>
          <Row>
            <Col xs={12} md={8} lg={{ span: 6, offset: 3 }} className="d-grid gap-2 mt-3">
               <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="validationCustom01"
                >
                  <Id
                    name="Product Id"
                    handleDataChange={handleDataChange}
                    textboxName="product_id"
                  />
                  <Name
                    name="Product Name"
                    handleDataChange={handleDataChange}
                    textboxName="product_name"
                  />
                  <No
                    name="Product Quantity"
                    handleDataChange={handleDataChange}
                    textboxName="product_quantity1"
                  />
                  <No
                    name="Days"
                    handleDataChange={handleDataChange}
                    textboxName="days"
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
                    textboxName="date"
                  />
                  <No
                    name="Total Amount"
                    handleDataChange={handleDataChange}
                    textboxName="total_amount1"
                  />
                  <No
                    name="Balance Amount"
                    handleDataChange={handleDataChange}
                    textboxName="balance_amount"
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

export default UserStart;
