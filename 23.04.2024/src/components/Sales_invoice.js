import React, { useState, useEffect, useContext } from "react";
import Container from "react-bootstrap/Container";
import { Button, Col, Row, Table, Form, Modal } from "react-bootstrap"; // Import Modal from react-bootstrap
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Id, Name, Mbl, Date } from "./Input.js";
import { dataContext } from "./context/DataContext.jsx";
import axios from "axios";
import html2pdf from "html2pdf.js"; // Import html2pdf library
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import logo from "../assets/login image.jpg";

function Sales_invoice() {
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit">
      Sales
    </Link>,
    <Link underline="hover" key="2" color="white">
      Sales Invoice
    </Link>,
  ];

  const [validated, setValidated] = useState(false);
  const [record, setRecord] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const {
    purchaseData: contextPurchaseData,
    setPurchaseData: setContextPurchaseData,
  } = useContext(dataContext);
  const [purchaseData, setPurchaseData] = useState([]);
  const [rows, setRows] = useState([createRow("", 0, 0)]);
  const [taxRate, setTaxRate] = useState(0);
  const [showPreview, setShowPreview] = useState(false); // State variable to manage preview popup
  const navigate = useNavigate();

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

  const handleTableRowClick = (purchase) => {
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
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      console.log("Submitted record:", record);
    }
    setValidated(true);
  };

  const handleDataChange = (e) => {
    const { name, value } = e.target;
    setRecord({
      ...record,
      [name]: value,
    });
  };
  //tax calculation
  const handleTaxRateChange = (e) => {
    const { value } = e.target;
    setTaxRate(parseFloat(value));
  };

  function ccyFormat(num) {
    return `${num.toFixed(2)}`;
  }

  function priceRow(qty, unit) {
    return qty * unit;
  }

  function createRow(desc, qty, unit) {
    const price = priceRow(qty, unit);
    return { desc, qty, unit, price };
  }

  function subtotal(items) {
    return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
  }

  const handleAddRow = () => {
    const newRow = createRow("", 0, 0);
    setRows([...rows, newRow]);
  };

  const handleRowChange = (e, index, field) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = e.target.value;

    if (field === "qty" || field === "unit") {
      const qty = parseFloat(updatedRows[index].qty);
      const unit = parseFloat(updatedRows[index].unit);
      updatedRows[index].price = qty * unit;
    }

    setRows(updatedRows);
  };

  const handleRemoveRow = (index) => {
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    setRows(updatedRows);
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  const handleClosePreview = () => {
    setShowPreview(false);
  };

  const handleDownload = () => {
    const element = document.getElementById("preview-content");

    html2pdf(element, {
      margin: 0.5,
      filename: "invoice.pdf",
      image: { type: "jpeg", quality: 0.98 }, // Optional
      html2canvas: { dpi: 192, letterRendering: true }, // Optional
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" }, // Optional
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
          <Row className="mt-3 justify-content-between align-items-center">
            <Col xs="auto">
              <Stack spacing={3} style={{ marginTop: "30px" }}>
                <Breadcrumbs
                  separator={<NavigateNextIcon fontSize="small" />}
                  aria-label="breadcrumb"
                >
                  {breadcrumbs}
                </Breadcrumbs>
              </Stack>
            </Col>
          </Row>
          <Row>
            <Col xs="auto" lg={{ span: 1, offset: 9 }}>
              <Button
                variant="success"
                onClick={handlePreview}
                style={{ width: "200px" }}
              >
                Preview
              </Button>
            </Col>
          </Row>

          <Row>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group as={Row} controlId="validationCustom01">
                <Col
                  xs={12}
                  md={8}
                  lg={{ span: 3, offset: 1 }}
                  className="d-grid gap-2 "
                >
                  <Id
                    name="Invoice Id"
                    handleDataChange={handleDataChange}
                    textboxName="purchase_id"
                  />
                  <Name
                    name="Customer Name"
                    handleDataChange={handleDataChange}
                    textboxName="customer_name"
                  />
                </Col>
                <Col
                  xs={12}
                  md={8}
                  lg={{ span: 3, offset: 1 }}
                  className="d-grid gap-2 "
                >
                  <Mbl
                    name="Mobile_number"
                    handleDataChange={handleDataChange}
                    textboxName="mobile_number"
                  />
                  <Date
                    name="Date"
                    handleDataChange={handleDataChange}
                    textboxName="date"
                  />
                </Col>
                <Col
                  xs={12}
                  md={8}
                  lg={{ span: 3, offset: 1 }}
                  className="d-grid gap-2"
                >
                  <Name
                    name="Location"
                    handleDataChange={handleDataChange}
                    textboxName="location"
                  />
                  <Id
                    name="GST NO"
                    handleDataChange={handleDataChange}
                    textboxName="gst_no"
                  />
                </Col>
              </Form.Group>
            </Form>
          </Row>
          <Row>
            <Col
              xs={12}
              md={8}
              lg={{ span: 10, offset: 1 }}
              className="d-grid gap-2 mt-3"
            >
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                  <TableHead>
                    <TableRow>
                      <TableCell>product_name</TableCell>
                      <TableCell align="right">Amount</TableCell>
                      <TableCell align="right">Qty</TableCell>
                      <TableCell align="right">Total</TableCell>
                      <TableCell align="right">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <input
                            type="text"
                            value={row.desc}
                            onChange={(e) => handleRowChange(e, index, "desc")}
                            maxLength={20}
                          />
                        </TableCell>
                        <TableCell align="right">
                          <input
                            type="number"
                            value={row.qty}
                            onChange={(e) => {
                              const value = e.target.value.slice(0, 8); // Limit to 6 digits
                              handleRowChange(
                                { ...e, target: { ...e.target, value } },
                                index,
                                "qty"
                              );
                            }}
                          />
                        </TableCell>
                        <TableCell align="right">
                          <input
                            type="number"
                            value={row.unit}
                            onChange={(e) => {
                              const value = e.target.value.slice(0, 6);
                              handleRowChange(
                                { ...e, target: { ...e.target, value } },
                                index,
                                "unit"
                              );
                            }}
                          />
                        </TableCell>
                        <TableCell align="right">
                          {ccyFormat(row.price)}
                        </TableCell>
                        <TableCell align="right">
                          <Button onClick={() => handleRemoveRow(index)}>
                            Remove
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={3}>Subtotal</TableCell>
                      <TableCell align="right">
                        {ccyFormat(subtotal(rows))}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={2}> GST(%):</TableCell>
                      <TableCell>
                        <input
                          type="number"
                          value={taxRate}
                          onChange={(e) => {
                            let value = e.target.value;
                            if (value.length > 5) {
                              value = value.slice(0, 5);
                            }
                            handleTaxRateChange({
                              ...e,
                              target: { ...e.target, value },
                            });
                          }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        {ccyFormat(subtotal(rows) * (taxRate / 100))}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={3}>Total</TableCell>
                      <TableCell align="right">
                        {ccyFormat(subtotal(rows) + subtotal(rows) * taxRate)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <Button onClick={handleAddRow}>Add Row</Button>
            </Col>
          </Row>
        </Container>
      </div>
      {/* Preview Popup */}
      <Modal
        show={showPreview}
        onHide={handleClosePreview}
        style={{ marginTop: "50px" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Invoice Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body id="preview-content">
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "20px",
              }}
            >
              <img
                src={logo}
                alt="Company Logo"
                style={{ width: "100px", height: "auto" }}
              />
            </div>
            <p style={{ textAlign: "center", fontSize: "30px" }}>
              GVM Constructions
            </p>
            <div>
              <p>G.Thirumurugan,</p>
              <p>3 Sivan East Street,</p>
              <p>Neravy,</p>
              <p>Karaikal- 609 604.</p>
            </div>
            <h4>Invoice Details:</h4>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              {/* Invoice Details */}
              <Row>
                <Col lg={6}>
                  <div>
                    <p>Invoice ID: {record.purchase_id}</p>
                    <p>Customer Name: {record.customer_name}</p>
                    <p>Mobile Number: {record.mobile_number}</p>
                  </div>
                </Col>
                <Col lg={{ span: 5, offset: 1 }}>
                  <div>
                    <p>Date: {record.date}</p>
                    <p>Location: {record.location}</p>
                    <p>GST NO: {record.gst_no}</p>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product Name</TableCell>
                  <TableCell align="right">Amount</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Total Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.desc}</TableCell>
                    <TableCell align="right">{row.qty}</TableCell>
                    <TableCell align="right">{row.unit}</TableCell>
                    <TableCell align="right">{ccyFormat(row.price)}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={3}>Subtotal</TableCell>
                  <TableCell align="right">
                    {ccyFormat(subtotal(rows))}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}>GST(%):</TableCell>
                  <TableCell></TableCell>
                  <TableCell align="right">
                    {ccyFormat(subtotal(rows) * (taxRate / 100))}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={3}>Total</TableCell>
                  <TableCell align="right">
                    {ccyFormat(subtotal(rows) + subtotal(rows) * taxRate)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Modal.Body>
        <Modal.Footer className="mb-3">
          <Button variant="secondary" onClick={handleClosePreview}>
            Close
          </Button>
          <Button variant="success" onClick={handleDownload}>
            Download
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Sales_invoice;
