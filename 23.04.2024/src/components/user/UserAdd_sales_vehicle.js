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
  Nopoint,
  Place,
  Date,
  Topbutton,
  Topbutton1,
  Nocal,
  Idreadonlycal,
} from "../Input.js";
import { dataContext } from "../context/DataContext.jsx";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function UserAdd_sales_vehicle() {
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit">
      Sales
    </Link>,
    <Link underline="hover" key="2" color="white">
      Add Sales
    </Link>,
  ];
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate(); // Use useNavigate to get the navigate function
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
      const newData = {
        sales_id: purchaseData.sales_id,
        mobile_no: purchaseData.mobile_no,
        customer_name: purchaseData.customer_name,
        customer_type: purchaseData.customer_type,
        location: purchaseData.location,
        site_name: purchaseData.site_name,
        product_name: purchaseData.product_name,
        product_quantity: purchaseData.product_quantity,
        total_amount: purchaseData.total_amount,
        paid_amount: purchaseData.paid_amount,
        balance_amount: purchaseData.balance_amount,
        payment_method: purchaseData.payment_method,
        payment_type: purchaseData.payment_type,
        gst_no: purchaseData.gst_no,
        vehicle_no: purchaseData.vehicle_no,
        vehicle_type: purchaseData.vehicle_type,
        driver_name: purchaseData.driver_name,
        fuel_liter: purchaseData.fuel_liter,
        fuel_amount: purchaseData.fuel_amount,
        date: purchaseData.date,
        wages: purchaseData.wages,
        wages_amount: purchaseData.wages_amount,
        other_expenses: purchaseData.other_expenses,
        expenses_amount: purchaseData.expenses_amount,
        wages_total_amount: purchaseData.wages_total_amount,
        rental_amount: purchaseData.rental_amount,
        balance_amount1: purchaseData.balance_amount1,
      };
      // alertbox
      toast.success("Data Insert Successfully!");

      console.log(newData);

      axios
        .post(
          "http://localhost/GVM_Backend/controllers/api/post/addSalesDetails.php",
          newData
        )
        .then((response) => {
          console.log("Data sent successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error sending data:", error);
        });
    }

    setValidated(true);
  };
  //string to ingerger convert
  const calculateTotalAmount1 = () => {
    const wagesAmount = parseInt(purchaseData.wages_amount);
    const expensesAmount = parseInt(purchaseData.expenses_amount);
    const fuelAmount = parseInt(purchaseData.fuel_amount);

    const totalAmount1 =
      (Number.isNaN(wagesAmount) ? 0 : wagesAmount) +
      (Number.isNaN(expensesAmount) ? 0 : expensesAmount) +
      (Number.isNaN(fuelAmount) ? 0 : fuelAmount);

    return isNaN(totalAmount1)
      ? "Invalid calculation"
      : totalAmount1.toString();
  };

  const calculateBalanceAmount1 = () => {
    const rentalAmount = parseInt(purchaseData.rental_amount);
    const totalAmount1 = calculateTotalAmount1();

    const tot = parseInt(totalAmount1);
    const balanceAmount1 =
      (Number.isNaN(rentalAmount) ? 0 : rentalAmount) -
      (Number.isNaN(tot) ? 0 : tot);

    return isNaN(balanceAmount1)
      ? "Invalid calculation"
      : balanceAmount1.toString();
  };

  useEffect(() => {
    const balance = calculateBalanceAmount1(); // Calculate the balance using the new function
    const totalAmount1 = calculateTotalAmount1(); // Calculate totalAmount1 using the new function
    setPurchaseData({
      ...purchaseData,
      balance_amount1: balance,
      wages_total_amount: totalAmount1,
    });
  }, [
    purchaseData.rental_amount,
    purchaseData.fuel_amount,
    purchaseData.wages_amount,
    purchaseData.expenses_amount,
  ]);
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
              <NavLink to="/user_addsales" className="ul">
                <Topbutton1 topname="Sales" />
              </NavLink>
            </Col>
            <Col xs={12} md={8} lg={4} className="d-grid gap-2 mt-5">
              <NavLink to="/useradd_sales_payment" className="ul">
                <Topbutton1 topname="Payment" />
              </NavLink>
            </Col>
            <Col xs={12} md={8} lg={4} className="d-grid gap-2 mt-5">
              <NavLink to="/useradd_sales_vehicle" className="ul">
                <Topbutton topname="Vehicle" />
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
                    name="Vehicle No"
                    handleDataChange={handleDataChange}
                    textboxName="vehicle_no"
                  />
                  <Name
                    name="Vehicle Type"
                    handleDataChange={handleDataChange}
                    textboxName="vehicle_type"
                  />
                  <Name
                    name=" Driver Name"
                    handleDataChange={handleDataChange}
                    textboxName="driver_name"
                  />
                  <Nopoint
                    name="Fuel Liter"
                    handleDataChange={handleDataChange}
                    textboxName="fuel_liter"
                  />
                  <No
                    name="Fuel Amount"
                    handleDataChange={handleDataChange}
                    textboxName="fuel_amount"
                  />
                  <Date
                    name="Date"
                    handleDataChange={handleDataChange}
                    textboxName="date"
                  />
                  <Name
                    name="Wages"
                    handleDataChange={handleDataChange}
                    textboxName="wages"
                  />
                  <Nocal
                    name="Wages Amount"
                    handleDataChange={handleDataChange}
                    textboxName="wages_amount"
                  />
                  <Name
                    name="Other Expenses"
                    handleDataChange={handleDataChange}
                    textboxName="other_expenses"
                  />
                  <Nocal
                    name="Expenses Amount"
                    handleDataChange={handleDataChange}
                    textboxName="expenses_amount"
                  />
                  <Idreadonlycal
                    name="Wages Total Amount"
                    handleDataChange={handleDataChange}
                    textboxName="wages_total_amount"
                    val={calculateTotalAmount1()}
                  />
                  <No
                    name="Rental Amount"
                    handleDataChange={handleDataChange}
                    textboxName="rental_amount"
                  />
                  <Idreadonlycal
                    name="Balance Amount"
                    handleDataChange={handleDataChange}
                    textboxName="balance_amount1"
                    val={calculateBalanceAmount1()}
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
export default UserAdd_sales_vehicle;
