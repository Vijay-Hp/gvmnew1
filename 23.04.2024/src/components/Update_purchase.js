import React, { useState, useEffect, useContext } from "react";
import { Button, Col, Row, Table, Modal, Form } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import "./style.js";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import {
  No,
  Btn,
  Topbutton,
  Topbutton1,
  Radio1,
  Mblpayment,
  Namepayment,
  Nopayment,
  Idpayment,
  Date,
  DateComponent,
  Idreadonly,
} from "./Input.js";
import { dataContext } from "./context/DataContext.jsx";
import axios from "axios";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Update_purchase() {
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit">
      Purchase
    </Link>,
    <Link underline="hover" key="2" color="white">
      Update Purchase
    </Link>,
  ];
  // State variables
  const [validated, setValidated] = useState(false);
  const [record, setRecord] = useState({
    purchase_id: "",
    mobile_no: "",
    vendor_name: "",
    product_name: "",
    product_quantity: "",
    total_amount: "",
    paid_amount: "",
    balance_amount: "",
    make_payment: "",
    payment_method: "",
    payment_type: "",
    pending_amount: "",
    date: "",
    gst_no: "",
  });
  const {
    purchaseData: contextPurchaseData,
    setPurchaseData: setContextPurchaseData,
  } = useContext(dataContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [purchaseData, setPurchaseData] = useState([]);
  const navigate = useNavigate();

  // Fetch data from API
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost/GVM_Backend/controllers/api/get/viewPurchase.php"
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
      mobile_no: purchase.mobile_no,
      vendor_name: purchase.vendor_name,
      product_name: purchase.product_name,
      product_quantity: purchase.product_quantity,
      total_amount: purchase.total_amount,
      paid_amount: purchase.paid_amount,
      balance_amount: purchase.balance_amount,
      make_payment: purchase.make_payment,
      payment_method: purchase.payment_method,
      payment_type: purchase.payment_type,
      pending_amount: purchase.pending_amount,
      date: purchase.date,
      gst_no: purchase.gst_no,
    });
  };

  // Handle form submission
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const newPaidAmount =
        parseFloat(record.paid_amount) + parseFloat(record.make_payment);

      // Validate if the make payment amount is greater than the balance amount
      const balance = parseFloat(record.balance_amount);
      const makePayment = parseFloat(record.make_payment);
      if (makePayment > balance) {
        alert("Please Check Make Payment Amount");
        return; // Exit the function if make payment amount is greater than balance amount
      }
      // Prepare the data for the initial POST request
      const newData = {
        purchase_id: record.purchase_id,
        mobile_no: record.mobile_no,
        vendor_name: record.vendor_name,
        product_name: record.product_name,
        product_quantity: record.product_quantity,
        total_amount: record.total_amount,
        paid_amount: newPaidAmount,
        balance_amount: record.balance_amount,
        make_payment: record.make_payment,
        payment_method: record.payment_method,
        payment_type: record.payment_type,
        date: record.date,
        gst_no: record.gst_no,
      };

      // Send the initial POST request to add the purchase payment
      axios
        .post(
          "http://localhost/GVM_Backend/controllers/api/post/addPurchasePayment.php",
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

      // Prepare the data for the PUT request to update the purchase payment
      const updateData = {
        purchase_id: record.purchase_id,
        paid_amount: newPaidAmount,
        balance_amount: balanceAmount(), // Update paid_amount with the new value
      };

      // Send the PUT request to update the purchase payment
      // axios
      //   .put(
      //     "http://localhost/GVM_Backend/controllers/api/put/updatePurchasePayment.php",
      //     updateData
      //   )
      //   .then((response) => {
      //     console.log("Data updated successfully:", response.data);
      //     toast.success("Data Updated Successfully!");
      //   })
      //   .catch((error) => {
      //     console.error("Error updating data:", error);
      //     toast.error("Data Not Updated!");
      //   });
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
  // Calculate balance amount
  const balanceAmount = () => {
    const totalAmount = parseFloat(record.total_amount);
    const paidAmount = parseFloat(record.paid_amount);
    const makePayment = parseFloat(record.make_payment) || 0; // Set default value to 0 if makePayment is NaN

    if (!isNaN(totalAmount) && !isNaN(paidAmount) && !isNaN(makePayment)) {
      let balance_amount = totalAmount - (paidAmount + makePayment);
      if (balance_amount < 0) {
        balance_amount = 0; // Set balance_amount to 0 if negative
      }
      console.log("balance:", balance_amount);
      return balance_amount.toString();
    } else {
      return "0";
    }
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
            <Col xs={12} md={8} lg={6} className="d-grid gap-2 mt-3">
              <NavLink to="/update_purchase" className="ul">
                <Topbutton topname="Payment" />
              </NavLink>
            </Col>
            <Col xs={12} md={8} lg={6} className="d-grid gap-2 mt-3">
              <NavLink to="/update_purchase_payment" className="ul">
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
                      <th>purchase_id</th>
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
                    value={record.mobile_no}
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
                  <Idreadonly
                    name="Pending Amount"
                    handleDataChange={handleDataChange}
                    textboxName="pending_amount"
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
                  {/* Payment button */}
                  <Btn btn="Payment" />
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

export default Update_purchase;
