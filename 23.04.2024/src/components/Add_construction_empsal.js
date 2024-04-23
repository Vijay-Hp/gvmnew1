import React, { useState, useEffect, useContext } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Container from "react-bootstrap/Container";
import { Button, Col, Row, Table, Form, Modal } from "react-bootstrap";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import Add_construction_view from "./Add_construction_view";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import "./style.js";
import {
  Id,
  Name,
  Radio,
  No,
  Btn,
  Topbutton,
  Topbutton1,
  Date,
  Date1,
  Nameinvoice,
} from "./Input.js";
import { dataContext } from "./context/DataContext.jsx";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import logo from "../assets/login image.jpg";

function Add_construction_empsal() {
  const breadcrumbs = [
    <Link underline="hover" key="1" color="white">
      Constructions
    </Link>,
    <Link underline="hover" key="2" color="white">
      Add Expenses
    </Link>,
  ];
  // navigate submit button
  const [validated, setValidated] = useState(false);
  const { purchaseData, setPurchaseData } = useContext(dataContext);
  const [age, setAge] = useState("");
  const [type, setType] = useState("");

  const [record, setRecord] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const {
    purchaseData: contextPurchaseData,
    setPurchaseData: setContextPurchaseData,
  } = useContext(dataContext);
  const [rows, setRows] = useState([createRow("", 0, 0)]);
  const [taxRate, setTaxRate] = useState(0);
  const [showPreview, setShowPreview] = useState(false); // State variable to manage preview popup
  const navigate = useNavigate();

  console.log("purchaseData", rows);

  const handleDataChange = (e, index, field) => {
    const updatedRows = [...rows];

    const { name, value } = e.target;
    updatedRows[index] = {
      ...updatedRows[index],
      [field]: value,
    };
    setRecord((prevRecord) => ({ ...prevRecord, [name]: value }));

    if (field === "qty" || field === "service" || field === "labor") {
      const qty = parseFloat(updatedRows[index].qty);
      const service = parseFloat(updatedRows[index].service);
      const labor = parseFloat(updatedRows[index].labor);
      updatedRows[index].price = qty * service * labor;
    }
    setRows(updatedRows);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const total = subtotal(rows);
      const building = purchaseData.building;
      const expenses = purchaseData.expenses;
      const newData = {
        building: building,
        expenses: expenses,
        location: record.location,
        date1: record.date,
        service: rows,
        subtotal: subtotal,
        total: total,
      };

      console.log(newData);

      axios
        .post(
          "http://localhost/GVM_Backend/controllers/api/post/addConstructionDetails.php",
          newData
        )
        .then((response) => {
          // console.log("Data sent successfully:", response.data);
          toast.success("Data Insert Successfully!");
        })
        .catch((error) => {
          console.error("Error sending data:", error);
        });
    }
    setValidated(true);
  };

  //dropdown
  const handleDropdownChange = (e) => {
    const { value } = e.target;
    setValue(value);
    setPurchaseData({
      ...purchaseData,
      building: value,
    });
  };

  const [value, setValue] = useState("");
  const options = [
    { label: "Choose Building", value: "Choose Building" },
    { label: "red", value: "red" },
    { label: "green", value: "green" },
    { label: "pink", value: "pink" },
  ];

  const handleDropdownChange1 = (e) => {
    const { value } = e.target;
    setValue1(value);
    setPurchaseData({
      ...purchaseData,
      expenses: value,
    });
  };

  const [value1, setValue1] = useState("");
  const options1 = [
    { label: "Choose Expenses", value: "Choose Expenses" },
    { label: "Purchase", value: "purchase" },
    { label: "Salary", value: "salary" },
    { label: "Others", value: "others" },
  ];

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
          </Row>
          <Col
            xs={12}
            md={8}
            lg={{ span: 2, offset: 9 }}
            className="d-grid gap-2 "
          >
            <Button onClick={handleAddRow}>Add Row</Button>
          </Col>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="validationCustom01"
            >
              <Row>
                <Col
                  xs={12}
                  md={8}
                  lg={{ span: 3, offset: 1 }}
                  className="d-grid gap-2 mt-5"
                >
                  <Col sm={8}>
                    <select
                      className="form-select"
                      onChange={handleDropdownChange}
                      value={value}
                    >
                      {options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </Col>
                </Col>
                <Col
                  xs={12}
                  md={8}
                  lg={{ span: 3 }}
                  className="d-grid gap-2 mt-5"
                >
                  <Col sm={8}>
                    <select
                      className="form-select"
                      onChange={handleDropdownChange1}
                      value={value1}
                    >
                      {options1.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </Col>
                </Col>
              </Row>
              <Row>
                <Col
                  xs={12}
                  md={8}
                  lg={{ span: 3, offset: 1 }}
                  className="d-grid gap-2 mt-2"
                >
                  <Col sm={8}>
                    <Name
                      name="Location"
                      handleDataChange={handleDataChange}
                      textboxName="location"
                    />
                  </Col>
                </Col>
                <Col
                  xs={12}
                  md={8}
                  lg={{ span: 3 }}
                  className="d-grid gap-2 mt-2"
                >
                  <Col sm={8}>
                    <Date
                      name="Date"
                      handleDataChange={handleDataChange}
                      textboxName="date"
                    />
                  </Col>
                </Col>
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
                          <TableCell>Description</TableCell>
                          <TableCell>Comment</TableCell>
                          <TableCell>Amount</TableCell>
                          <TableCell>Qty</TableCell>
                          <TableCell>Total</TableCell>
                          <TableCell align="right">Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((row, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <Nameinvoice
                                name="Product"
                                handleDataChange={handleDataChange}
                                textboxName="desc"
                                index={index}
                                value={row.desc}
                              />
                            </TableCell>
                            <TableCell>
                              <Nameinvoice
                                name="Comment"
                                handleDataChange={handleDataChange}
                                textboxName="comment"
                                index={index}
                                value={row.comment}
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
                          <TableCell colSpan={4}>Subtotal</TableCell>
                          <TableCell align="right">
                            {ccyFormat(subtotal(rows))}
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
                    <Btn btn="Submit" />
                  </Col>
                </Row>
              </Row>
            </Form.Group>
          </Form>

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
        </Container>
      </div>
    </>
  );
}
export default Add_construction_empsal;
