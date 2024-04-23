import React, { useState, useContext, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { Row, Col, Button, Form } from "react-bootstrap";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import "./style.js";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Id,
  Name,
  Radio,
  No,
  Btn,
  Topbutton,
  Topbutton1,
  Idreadonly,
  Radio1,
  Idnot,
  Idnotreq,
} from "./Input.js";
import { dataContext } from "./context/DataContext.jsx";

function Add_purchase_payment() {
  const breadcrumbs = [
    <Link underline="hover" key="1" color="white">
      Purchase
    </Link>,
    <Link underline="hover" key="2" color="white">
      Add Payment
    </Link>,
  ];
  // navigate submit button
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate(); // Use useNavigate to get the navigate function
  const { purchaseData, setPurchaseData } = useContext(dataContext);

  console.log("purchaseData", purchaseData);

  const handleDataChange = (e) => {
    setPurchaseData({ ...purchaseData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      navigate("/add_purchase_vehicle");
    }

    setValidated(true);
  };

  const balanceAmount = () => {
    const totalAmount = parseFloat(purchaseData.total_amount);
    const paidAmount = parseFloat(purchaseData.paid_amount);

    if (!isNaN(totalAmount) && !isNaN(paidAmount)) {
      const balance_amount = totalAmount - paidAmount;
      console.log("balance:", balance_amount);
      return isNaN(balance_amount)
        ? "Invalid calculation"
        : balance_amount.toString();
    } else {
      return "0";
    }
  };

  useEffect(() => {
    const balance = balanceAmount();
    setPurchaseData({ ...purchaseData, balance_amount: balance });
  }, [purchaseData.total_amount, purchaseData.paid_amount]);

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
              <NavLink to="/add_purchase" className="ul">
                <Topbutton1 topname="Purchase" />
              </NavLink>
            </Col>

            <Col xs={12} md={8} lg={4} className="d-grid gap-2 mt-5">
              <NavLink to="/add_purchase_payment" className="ul">
                <Topbutton topname="Payment" />
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
                  <Idreadonly
                    name="Purchase Id"
                    val={purchaseData.purchase_id}
                  />
                  <Name
                    name="Product Name"
                    handleDataChange={handleDataChange}
                    textboxName="product_name"
                  />
                  <No
                    name="Product Quantity"
                    handleDataChange={handleDataChange}
                    textboxName="product_quantity"
                  />
                  <No
                    name="Total Amount"
                    handleDataChange={handleDataChange}
                    textboxName="total_amount"
                  />
                  <No
                    name="Paid Amount"
                    handleDataChange={handleDataChange}
                    textboxName="paid_amount"
                  />
                  <Idreadonly
                    name="Balance Amount"
                    handleDataChange={handleDataChange}
                    textboxName="balance_amount"
                    val={balanceAmount()}
                  />
                  <Radio1
                    name="Payment Method"
                    name1="payment_method"
                    label1="Cash"
                    label2="Online Transaction"
                    value1="Cash"
                    value2="Online Transaction"
                    handleDataChange={handleDataChange}
                    textboxName="payment_method"
                  />
                  <Radio1
                    name="Payment Type"
                    name1="payment_type"
                    label1="Debit"
                    label2="Credit"
                    value1="Debit"
                    value2="Credit"
                    handleDataChange={handleDataChange}
                    textboxName="payment_type"
                  />
                  <Idnotreq
                    name="GST No"
                    handleDataChange={handleDataChange}
                    textboxName="gst_no"
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
export default Add_purchase_payment;
