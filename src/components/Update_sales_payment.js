import React, { useState, useEffect, useContext } from "react";
import Container from "react-bootstrap/Container";
import { Row, Col, Button, Form } from "react-bootstrap";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import {
  Id,
  Name,
  Radio,
  No,
  Btn,
  Topbutton,
  Topbutton1,
  Idreadonly,
} from "./Input.js";
import { dataContext } from "./context/DataContext.jsx";

function Update_sales_payment() {
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit">
      Sales
    </Link>,
    <Link underline="hover" key="2" color="white">
      Update Sales Payment
    </Link>,
  ];
  // navigate submit button
  const [validated, setValidated] = useState(false);
  const [record, setRecord] = useState({});
  const navigate = useNavigate(); // Use useNavigate to get the navigate function
  const { purchaseData, setPurchaseData } = useContext(dataContext);

  console.log("purchaseData", purchaseData);

  const handleDataChange = (e) => {
    const { name, value } = e.target;
    setPurchaseData({
      ...purchaseData,
      [e.target.name]: e.target.value,
    });
  //  textbox value change in after fetch
    
    setRecord(prevState => ({
      ...prevState,
      [name]: value
    }));
      //radio button after change fetch 
   if (name === "payment_method"||name==="payment_mode"||name==="payment_type") {
    setRecord(prevState => ({
      ...prevState,
      [name]: value
    }));
  } else {
    setPurchaseData({
      ...purchaseData,
      [name]: value,
    });
  }
  };

    // new fetch form data
    useEffect(()=>{
      console.log(purchaseData);
      const info = purchaseData?.length ? purchaseData[0]: '' 
      const {purchase_id=''} = info
      console.log(info);
      purchase_id && setRecord(info)
    },[purchaseData])
  
  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      navigate("/update_sales_vehicle");
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
              <NavLink to="/update_sales" className="ul">
                <Topbutton1 topname="Sales" />
              </NavLink>
            </Col>
            <Col xs={12} md={8} lg={4} className="d-grid gap-2 mt-5">
              <NavLink to="/update_sales_payment" className="ul">
                <Topbutton topname="Payment" />
              </NavLink>
            </Col>
            <Col xs={12} md={8} lg={4} className="d-grid gap-2 mt-5">
              <NavLink to="/update_sales_vehicle" className="ul">
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
                  <Idreadonly name="sales Id" val={purchaseData.sales_id} />
                  <No
                    name="Total Amount"
                    handleDataChange={handleDataChange}
                    textboxName="total_amount1"
                    value={purchaseData?.total_amount1}
                  />
                  <No
                    name="Paid Amount"
                    handleDataChange={handleDataChange}
                    textboxName="paid_amount"
                    value={purchaseData?.paid_amount}
                  />
                  <No
                    name="Balance Amount"
                    handleDataChange={handleDataChange}
                    textboxName="balance_amount"
                    value={purchaseData?.balance_amount}
                  />
                  <Radio
                    name="Payment Method"
                    name1="payment_method"
                    label1="Cash"
                    label2="Online Transaction"
                    value1="Cash"
                    value2="Online Transaction"
                    handleDataChange={handleDataChange}
                    choose={purchaseData.payment_method}
                  />
                  <Radio
                    name="Payment Mode"
                    name1="payment_mode"
                    label1="Weekly"
                    label2="Monthly"
                    value1="Weekly"
                    value2="Monthly"
                    handleDataChange={handleDataChange}
                    choose={purchaseData.payment_mode}
                  />
                  <Radio
                    name="Payment Type"
                    name1="payment_type"
                    label1="Debit"
                    label2="Credit"
                    value1="Debit"
                    value2="Credit  "
                    handleDataChange={handleDataChange}
                    choose={purchaseData.payment_type}
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
export default Update_sales_payment;
