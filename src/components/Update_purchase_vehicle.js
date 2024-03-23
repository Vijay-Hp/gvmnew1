  import React, { useState, useEffect, useContext } from "react";
  import Container from "react-bootstrap/Container";
  import { Row, Col, Button, Form } from "react-bootstrap";
  import AddIcon from "@mui/icons-material/Add";
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
    Nopoint,
    Place,
    Date,
    Topbutton,
    Topbutton1,
  } from "./Input.js";
  import { dataContext } from "./context/DataContext.jsx";
  import axios from "axios";
  import { toast, ToastContainer } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
  import MenuItem from "@mui/material/MenuItem";
  import FormControl from "@mui/material/FormControl";
  import Select from "@mui/material/Select";

  function Update_purchase_vehicle() {
    const breadcrumbs = [
      <Link underline="hover" key="1" color="inherit">
        Purchase
      </Link>,
      <Link underline="hover" key="2" color="white">
        Update Purchase Vechical
      </Link>,
    ];
    const [validated, setValidated] = useState(false);
    const [record, setRecord] = useState({});
    const navigate = useNavigate(); // Use useNavigate to get the navigate function
    const { purchaseData, setPurchaseData } = useContext(dataContext);
    const [age, setAge] = useState("");
    console.log("purchaseData", purchaseData);

    const handleDataChange = (e) => {
      setPurchaseData({
        ...purchaseData,
        [e.target.name]: e.target.value,
      });
    //  textbox value change in after fetch
      const { name, value } = e.target;
      setRecord(prevState => ({
        ...prevState,
        [name]: value
      }));
      //radio button after change fetch 
    if (name === "vendor_type") {
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
        // console.log(purchaseData);
        const info = purchaseData?.length ? purchaseData[0]: '' 
        const {purchase_id=''} = info
        // console.log(info);
        purchase_id && setRecord(info)
      },[purchaseData])

    const handleSubmit = (event) => {
      event.preventDefault();

      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.stopPropagation();
      } else {
        const newData = {
          purchase_id: purchaseData.purchase_id,
          buyer_name: purchaseData.buyer_name,
          buyer_id: purchaseData.buyer_id,
          vendor_type: purchaseData.vendor_type,
          vendor_name: purchaseData.vendor_name,
          product_name: purchaseData.product_name,
          product_quantity: purchaseData.product_quantity,
          total_amount: purchaseData.total_amount,
          total_amount1: purchaseData.total_amount1,
          paid_amount: purchaseData.paid_amount,
          balance_amount: purchaseData.balance_amount,
          payment_method:purchaseData.payment_method,
          payment_mode:purchaseData.payment_mode, 
          payment_type:purchaseData.payment_type,
          vehicle_no: purchaseData.vehicle_no,
          driver_name: purchaseData.driver_name,
          chassic_no: purchaseData.chassic_no,
          rcbook_no: purchaseData.rcbook_no,
          product_quantity1: purchaseData.product_quantity1,
          fuel_liter: purchaseData.fuel_liter,
          fuel_amount: purchaseData.fuel_amount,
          location: purchaseData.location,
          date: purchaseData.date,
          wages: purchaseData.wages,
          wages_type: purchaseData.wages_type,
        };
        // alertbox
        toast.success("Data Update Successfully!");

        console.log(newData);

        axios
          .post(
            "http://localhost/GVM_Backend/controllers/api/put/updatePurchase.php",
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
                <NavLink to="/update_purchase" className="ul">
                  <Topbutton1 topname="Purchase" />
                </NavLink>
              </Col>

              <Col xs={12} md={8} lg={4} className="d-grid gap-2 mt-5">
                <NavLink to="/update_purchase_payment" className="ul">
                  <Topbutton1 topname="Payment" />
                </NavLink>
              </Col>

              <Col xs={12} md={8} lg={4} className="d-grid gap-2 mt-5">
                <NavLink to="/update_purchase_vehicle" className="ul">
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
                      value={purchaseData?.vehicle_no}
                    />
                    <Name
                      name=" Driver Name"
                      handleDataChange={handleDataChange}
                      textboxName="driver_name"
                      value={purchaseData?.driver_name}
                    />
                    <Nopoint
                      name="Fuel Liter"
                      handleDataChange={handleDataChange}
                      textboxName="fuel_liter"
                      value={purchaseData?.fuel_liter}
                    />
                    <No
                      name="Fuel Amount"
                      handleDataChange={handleDataChange}
                      textboxName="fuel_amount"
                      value={purchaseData?.fuel_amount}
                    />
                    <Name
                      name="Location"
                      handleDataChange={handleDataChange}
                      textboxName="location"
                      value={purchaseData?.location}
                    />
                    <Date
                      name="Date"
                      handleDataChange={handleDataChange}
                      textboxName="date"
                      value={purchaseData?.date}
                    />
                    <Name
                      name="Wages"
                      handleDataChange={handleDataChange}
                      textboxName="wages"
                      value={purchaseData?.wages}
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
                      Wages Type
                    </Form.Label>
                    <Col sm={8}>
                      <FormControl fullWidth>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={purchaseData?.wages_type}
                          onChange={handleDataChange}
                          textboxName="wages_type"
                          name="wages_type"
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                      </FormControl>
                    </Col>
                    <Btn btn="Update" />
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
  export default Update_purchase_vehicle;
