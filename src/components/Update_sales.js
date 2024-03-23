import React, { useState, useEffect, useContext } from "react";
import Container from "react-bootstrap/Container";
import { Button, Col, Row, Table, Modal, Form } from "react-bootstrap";
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
  Idpayment,
  Mblpayment,
  Namepayment,
  Nopayment,
  Radio1,
  Date,
} from "./Input.js";
import { dataContext } from "./context/DataContext.jsx";
import axios from "axios";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";

function Update_sales() {
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit">
      Sales
    </Link>,
    <Link underline="hover" key="2" color="white">
      Update Sales
    </Link>,
  ];
  // navigate submit button
  // const [validated, setValidated] = useState(false);
  // const [record, setRecord] = useState({});
  // const navigate = useNavigate(); // Use useNavigate to get the navigate function
  // const { purchaseData, setPurchaseData } = useContext(dataContext);

  // console.log("purchaseData", purchaseData);

  // const handleDataChange = (e) => {
  //   const { name, value } = e.target;
  //   setPurchaseData({
  //     ...purchaseData,
  //     [e.target.name]: e.target.value,
  //   });

  //   //textbox value change in after fetch
  //   setRecord((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  //   //radio button after change fetch
  //   if (name === "customer_type") {
  //     setRecord((prevState) => ({
  //       ...prevState,
  //       [name]: value,
  //     }));
  //   } else {
  //     setPurchaseData({
  //       ...purchaseData,
  //       [name]: value,
  //     });
  //   }
  // };

  // State variables
  const [validated, setValidated] = useState(false);
  const [record, setRecord] = useState({});
  const {
    purchaseData: contextPurchaseData,
    setPurchaseData: setContextPurchaseData,
  } = useContext(dataContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [purchaseData, setPurchaseData] = useState([]);
  const navigate = useNavigate();
  // new fetch form data
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost/GVM_Backend/controllers/api/get/viewSales.php"
      );
      setPurchaseData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filtered = purchaseData.filter(
      (item) =>
        item.vendor_name.toLowerCase().includes(query.toLowerCase()) ||
        item.product_name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };

  // Handle table row click
  const handleTableRowClick = (purchase) => {
    // Set the clicked row's values in the state
    setRecord({
      purchase_id: purchase.purchase_id,
      mobile_number: purchase.mobile_no,
      vendor_name: purchase.vendor_name,
      product_name: purchase.product_name,
      product_quantity: purchase.product_quantity,
      total_amount: purchase.total_amount,
      paid_amount: purchase.paid_amount,
      balance_amount: purchase.balance_amount,
      payment_method: purchase.payment_method,
      payment_type: purchase.payment_type,
      gst_no: purchase.gst_no,
      // Add other fields as needed
    });
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      // Handle form submission or navigation here
    }
    setValidated(true);
  };

  // Handle input change for textboxes
  const handleDataChange = (e) => {
    const { name, value } = e.target;
    setRecord({
      ...record,
      [name]: value,
    });
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
              <NavLink to="/update_sales" className="ul">
                <Topbutton topname="Payment" />
              </NavLink>
            </Col>
            <Col xs={12} md={8} lg={6} className="d-grid gap-2 mt-5">
              <NavLink to="/update_sales_payment" className="ul">
                <Topbutton1 topname="Payment History" />
              </NavLink>
            </Col>
          </Row>
          {/* search */}
          <Row>
            <Col xs={12} md={8} lg={4} className="d-grid gap-2 mt-3">
              <div className="search-container">
                <div style={{ position: "relative" }}>
                  <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search Vendor Name or Product Name"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    style={{
                      width: "350px",
                      height: "40px",
                      paddingRight: "40px",
                    }}
                    className="search"
                  />
                  <IconButton
                    type="button"
                    sx={{
                      p: "0px",
                      color: "black",
                      position: "absolute",
                      left: "320px",
                    }}
                    aria-label="search"
                  >
                    <SearchIcon style={{ position: "absolute", top: "10px" }} />
                  </IconButton>
                </div>
              </div>
            </Col>
          </Row>
          {/* Table */}
          <Row>
            <Col xs={12} md={8} lg={6} className="d-grid gap-2 mt-3">
              <div
                style={{
                  overflowX: "auto",
                  maxWidth: "100%",
                  maxHeight: "300px",
                  overflowY: "scroll",
                }}
              >
                <Table bordered className="table-center">
                  <thead>
                    <tr>
                      <th>sales_id</th>
                      <th>mobile_no</th>
                      <th>vendor_name</th>
                      <th>product_name</th>
                      <th>product_quantity</th>
                      <th>total_amount</th>
                      <th>paid_amount</th>
                      <th>balance_amount</th>
                      <th>gst_no</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((purchase) => (
                      <tr
                        key={purchase.purchase_id}
                        onClick={() => handleTableRowClick(purchase)}
                      >
                        <td>{purchase.purchase_id}</td>
                        <td>{purchase.mobile_no}</td>
                        <td>{purchase.vendor_name}</td>
                        <td>{purchase.product_name}</td>
                        <td>{purchase.product_quantity}</td>
                        <td>{purchase.total_amount}</td>
                        <td>{purchase.paid_amount}</td>
                        <td>{purchase.balance_amount}</td>
                        <td>{purchase.gst_no}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Col>
            {/* side form */}
            <Col xs={12} md={8} lg={6} className="d-grid gap-2 mt-3">
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="validationCustom01"
                >
                  <Idpayment
                    name="Purchase Id"
                    handleDataChange={handleDataChange}
                    textboxName="purchase_id"
                    value={record.purchase_id}
                  />
                  <Mblpayment
                    name="Mobile Number"
                    handleDataChange={handleDataChange}
                    textboxName="mobile_number"
                    value={record.mobile_number}
                  />
                  <Namepayment
                    name="Vendor Name"
                    handleDataChange={handleDataChange}
                    textboxName="vendor_name"
                    value={record.vendor_name}
                  />
                  <Namepayment
                    name="Product Name"
                    handleDataChange={handleDataChange}
                    textboxName="product_name"
                    value={record.product_name}
                  />
                  <Nopayment
                    name="Product Quantity"
                    handleDataChange={handleDataChange}
                    textboxName="product_quantity"
                    value={record.product_quantity}
                  />
                  <Nopayment
                    name="Total Amount"
                    handleDataChange={handleDataChange}
                    textboxName="total_amount"
                    value={record.total_amount}
                  />
                  <Nopayment
                    name="Paid Amount"
                    handleDataChange={handleDataChange}
                    textboxName="paid_amount"
                    value={record.paid_amount}
                  />
                  <Nopayment
                    name="Balance Amount"
                    handleDataChange={handleDataChange}
                    textboxName="balance_amount"
                    value={record.balance_amount}
                  />

                  <No
                    name="Make Payment"
                    handleDataChange={handleDataChange}
                    textboxName="make_payment"
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
                  <Date
                    name="Date"
                    handleDataChange={handleDataChange}
                    textboxName="date"
                  />
                  <Idpayment
                    name="GST NO"
                    handleDataChange={handleDataChange}
                    textboxName="gst_no"
                    value={record.gst_no}
                  />
                  <Btn btn="Payment" />
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
export default Update_sales;
