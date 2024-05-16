import React, { useState, useEffect, useContext } from "react";
import Container from "react-bootstrap/Container";
import { Button, Col, Row, Table, Form, Modal } from "react-bootstrap";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {
  Id,
  Name,
  Mbl,
  Date,
  Nameinvoice,
  Btn,
  No,
  Noinvoice,
  Noreadonly,
  Date1,
} from "./Input.js";
import { dataContext } from "./context/DataContext.jsx";
import axios from "axios";
import html2pdf from "html2pdf.js";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import logo from "../assets/login image.jpg";
import { ToastContainer, toast } from "react-toastify";

function Rental_products() {
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit">
      Rental Products
    </Link>,
    <Link underline="hover" key="2" color="white">
      Assign Rental
    </Link>,
  ];
  const [validated, setValidated] = useState(false);
  const [record, setRecord] = useState({}); // Ensure record is initialized properly
  const [filteredData, setFilteredData] = useState([]);
  const {
    purchaseData: contextPurchaseData,
    setPurchaseData: setContextPurchaseData,
  } = useContext(dataContext);
  const [purchaseData, setPurchaseData] = useState([]);
  const [rows, setRows] = useState([createRow("", 0, 0)]);
  const [taxRate, setTaxRate] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [value, setValue] = useState({});
  const navigate = useNavigate();

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get(
  //       "https://vebbox.in/gvmbackend/controllers/api/get/viewSales.php"
  //     );
  //     setPurchaseData(response.data);
  //     setFilteredData(response.data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };
  // console.log("purchaseData", purchaseData);
  const handleChange = (event) => {
    let newValue = { ...value };
    newValue[event.target.name] = event.target.value;
    setValue({
      ...newValue,
    });
    console.log(newValue);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("handle");

    const newData = {
      site_name: value.site_name,
      date: value.date,
      total: total,
      array_data: rows?.map((row) => ({
        site_name: value.site_name,
        date: row.fromDate,
        product_name: row.product_name,
        days: row.days,
        qty: row.qty,
        price: row.price,
        todate: row.todate,
      })),
    };
    axios
      .post(
        "https://vebbox.in/gvmbackend/controllers/api/post/addRentalDetails.php",
        newData
      )
      .then((response) => {
        toast.success("Data inserted successfully");
        setRows([]);
        setValue([]);
      })
      .catch((error) => {
        toast.error("Something went wrong");
      });
    // }

    // setValidated(true);
  };

  const handleDataChange = (e, index, field) => {
    const { name, value } = e.target;
    console.log(name, value);
    const updatedRows = [...rows];
    if (updatedRows[index]) {
      updatedRows[index][name] = value;
    }

    setRecord((prevRecord) => ({ ...prevRecord, [name]: value }));

    if (name === "qty" || name === "service" || name === "labor") {
      const qty = parseFloat(updatedRows[index].qty);
      const service = parseFloat(updatedRows[index].service);
      const labor = parseFloat(updatedRows[index].labor);
      updatedRows[index].price = qty * service * labor;
    }
    console.log(updatedRows);
    setRows(updatedRows);
  };

  const handleAddRow = () => {
    const newRow = createRow("", 0, 0);
    setRows([...rows, newRow]);
  };

  const handleRowChange = (e, index, field) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = e.target.value;

    if (field === "Days" || field === "Qty" || field === "Price") {
      const qty = parseFloat(updatedRows[index].Days);
      const service = parseFloat(updatedRows[index].Qty);
      const labor = parseFloat(updatedRows[index].Price);
      console.log(qty, service, labor, qty * service * labor);
      updatedRows[index].price = qty * service * labor;
    }

    setRows(updatedRows);
  };

  const handleRemoveRow = (index) => {
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    setRows(updatedRows);
  };

  const handleTaxRateChange = (e) => {
    const { value } = e.target;
    setTaxAmount((subtotal * value) / 100);
    setTaxRate(parseFloat(value));
  };
  console.log(taxAmount);
  function createRow(
    product_name,
    qty,
    unit,
    date,
    todate,
    days,
    fromDate,
    total
  ) {
    return {
      product_name,
      qty,
      unit,
      service: 0,
      labor: 0,
      price: 0,
      date,
      days,
      fromDate,
      todate,
      total,
    };
  }

  function ccyFormat(num) {
    return `${num.toFixed(2)}`;
  }

  const subtotal = rows.reduce((sum, row) => sum + row.price, 0);
  const gstAmount = subtotal * (taxRate / 100);
  const total = subtotal + gstAmount;

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

          <Col
            xs={12}
            md={8}
            lg={{ span: 2, offset: 9 }}
            className="d-grid gap-2 "
          >
            <Button onClick={handleAddRow}>Add Row</Button>
          </Col>
          <Row>
            {/* <Form noValidate validated={validated}>
              <Form.Group as={Row} controlId="validationCustom01"> */}
            <Col
              xs={12}
              md={8}
              lg={{ span: 3, offset: 1 }}
              className="d-grid gap-2 mt-3"
            >
              <Name
                name="Site Name"
                handleDataChange={handleChange}
                value={value?.site_name}
                textboxName="site_name"
              />
            </Col>
            <Col
              xs={12}
              md={8}
              lg={{ span: 3, offset: 1 }}
              className="d-grid gap-2 mt-3"
            >
              <Date
                name="Date"
                handleDataChange={handleChange}
                value={value?.date}
                textboxName="date"
              />
            </Col>
            <Col xs={12} className="d-grid gap-2 mt-2">
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Product Name</TableCell>
                      <TableCell>Days/Trip</TableCell>
                      <TableCell>Qty</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>From Date</TableCell>
                      <TableCell>To Date</TableCell>
                      <TableCell>Total Amount</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Nameinvoice
                            name="Product"
                            handleDataChange={(e) => handleDataChange(e, index)}
                            textboxName="product_name"
                            index={index}
                            value={row.rent_data}
                          />
                        </TableCell>
                        <TableCell>
                          <Noinvoice
                            name="days"
                            handleDataChange={(e) => handleDataChange(e, index)}
                            textboxName="days"
                            index={index}
                            value={row.days}
                          />
                        </TableCell>

                        <TableCell>
                          <Noinvoice
                            name="qty"
                            handleDataChange={(e) => handleDataChange(e, index)}
                            textboxName="qty"
                            index={index}
                            value={row.qty}
                          />
                        </TableCell>
                        <TableCell>
                          <Noinvoice
                            name="price"
                            handleDataChange={(e) => handleDataChange(e, index)}
                            textboxName="price"
                            index={index}
                            value={row.price}
                          />
                        </TableCell>
                        <TableCell>
                          <Date1
                            name="From Date"
                            handleDataChange={(e) => handleDataChange(e, index)}
                            textboxName="fromDate"
                            index={index}
                            value={row.fromDate}
                          />
                        </TableCell>

                        <TableCell>
                          <Date1
                            name="To Date"
                            handleDataChange={(e) => handleDataChange(e, index)}
                            textboxName="todate"
                            index={index}
                            value={row.todate}
                          />
                        </TableCell>
                        <TableCell>
                          <Noreadonly
                            name="Total Amt"
                            textboxName="price"
                            index={index}
                            value={row.price}
                          />
                        </TableCell>

                        <TableCell align="right">
                          <Button onClick={() => handleRemoveRow(index)}>
                            Remove
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}

                    <TableRow>
                      <TableCell colSpan={6}>Subtotal</TableCell>

                      <TableCell>
                        <Noreadonly
                          name="Subtotal"
                          handleDataChange={handleDataChange}
                          textboxName="subtotal"
                          index={-1}
                          value={subtotal}
                        />
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell colSpan={5}> GST(%):</TableCell>
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
                      <TableCell>
                        <Noreadonly
                          name="GST"
                          handleDataChange={handleDataChange}
                          textboxName="taxRate"
                          index={-2}
                          value={subtotal * (taxRate / 100)}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={6}>Total</TableCell>
                      <TableCell>
                        <Noreadonly
                          name="Total"
                          handleDataChange={handleDataChange}
                          textboxName="total"
                          index={-3}
                          value={Number(subtotal) + Number(taxAmount)}
                        />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Col>
            <Row>
              <Col
                xs={12}
                md={8}
                lg={{ span: 3, offset: 9 }}
                className="d-grid gap-2"
              >
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  style={{
                    backgroundColor: "#1976d2",
                    color: "white",
                    marginTop: "10px",
                  }}
                >
                  Submit
                </Button>
              </Col>
            </Row>
            {/* </Form.Group>
            </Form> */}
          </Row>
        </Container>
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
      </div>
    </>
  );
}

export default Rental_products;
