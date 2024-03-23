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

function Add_service() {
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit">
      Vehicle Service
    </Link>,
    <Link underline="hover" key="2" color="white">
      Add Service
    </Link>,
  ];

  const [validated, setValidated] = useState(false);
  const [record, setRecord] = useState({});
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

  console.log("purchaseData", record);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const newData = {
        vehicle_no: record.vehicle_no,
        date: record.date,
      };

      console.log(newData);

      axios
        .post(
          "http://localhost/GVM_Backend/controllers/api/post/addVehicleDetails.php",
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

  const handleDataChange = (e, index, field) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = e.target.value;

    const { name, value } = e.target;
    setRecord((prevRecord) => ({
      ...prevRecord,
      [name]: value,
    }));

    if (
      field === "qty" ||
      field === "unit" ||
      field === "service" ||
      field === "labor"
    ) {
      const qty = parseFloat(updatedRows[index].qty);
      const unit = parseFloat(updatedRows[index].unit);
      const service = parseFloat(updatedRows[index].service);
      const labor = parseFloat(updatedRows[index].labor);
      const price = qty * (service + labor);

      setRows((prevRows) =>
        prevRows.map((row, idx) =>
          idx === index ? { ...row, price: price } : row
        )
      );

      // Update the price in the record state as well
      setRecord((prevRecord) => ({
        ...prevRecord,
        [`price-${index}`]: price,
      }));
    } else {
      setRows(updatedRows);
    }
  };

  //tax calculation

  const handleAddRow = () => {
    const newRow = createRow("", 0, 0);
    setRows([...rows, newRow]);
  };

  const handleRowChange = (e, index, field) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = e.target.value;

    if (
      field === "qty" ||
      field === "unit" ||
      field === "service" ||
      field === "labor"
    ) {
      const qty = parseFloat(updatedRows[index].qty);
      const unit = parseFloat(updatedRows[index].unit);
      const service = parseFloat(updatedRows[index].service);
      const labor = parseFloat(updatedRows[index].labor);
      updatedRows[index].price = qty * (service + labor);
    }

    setRows(updatedRows);
  };

  const handleRemoveRow = (index) => {
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    setRows(updatedRows);

    // Remove corresponding data from the record state
    const updatedRecord = { ...record };
    for (const key in updatedRecord) {
      if (key.endsWith(index.toString())) {
        delete updatedRecord[key];
      }
    }
    setRecord(updatedRecord);
  };

  const handleTaxRateChange = (e) => {
    const { value } = e.target;
    setTaxRate(parseFloat(value));
  };

  function createRow(desc, qty, unit) {
    return { desc, qty, unit, service: 0, labor: 0, price: 0 };
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
          <Row>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group as={Row} controlId="validationCustom01">
                <Col
                  xs={12}
                  md={8}
                  lg={{ span: 3, offset: 1 }}
                  className="d-grid gap-2 "
                >
                  <Name
                    name="Vehicle No"
                    handleDataChange={handleDataChange}
                    textboxName="vehicle_no"
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
                    handleDataChange={handleDataChange}
                    textboxName="date"
                  />
                </Col>
              </Form.Group>
            </Form>
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
            <Col
              xs={12}
              md={8}
              lg={{ span: 10, offset: 1 }}
              className="d-grid gap-2 mt-2"
            >
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Description</TableCell>
                      <TableCell>Qty</TableCell>
                      <TableCell>Service Amt</TableCell>
                      <TableCell>Labor Amt</TableCell>
                      <TableCell>Total Amt</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Nameinvoice
                            name="Description"
                            handleDataChange={handleDataChange}
                            textboxName="desc"
                            index={index} // Pass index here
                            value={row.desc}
                          />
                        </TableCell>
                        <TableCell>
                          <Noinvoice
                            name="Quantity"
                            handleDataChange={handleDataChange}
                            textboxName="qty"
                            index={index} // Pass index here
                            value={row.qty}
                          />
                          {/* <input
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
                          /> */}
                        </TableCell>
                        <TableCell>
                          <Noinvoice
                            name="Service"
                            handleDataChange={handleDataChange}
                            textboxName="service"
                            index={index} // Pass index here
                            value={row.service}
                            onChange={(e) => {
                              const value = e.target.value.slice(0, 8); // Limit to 6 digits
                              handleRowChange(
                                { ...e, target: { ...e.target, value } },
                                index,
                                "service"
                              );
                            }}
                          />
                          {/* <input
                            type="number"
                            value={row.service}
                            onChange={(e) => {
                              const value = e.target.value.slice(0, 8); // Limit to 6 digits
                              handleRowChange(
                                { ...e, target: { ...e.target, value } },
                                index,
                                "service"
                              );
                            }}
                          /> */}
                        </TableCell>
                        <TableCell>
                          <Noinvoice
                            name="Labor"
                            handleDataChange={handleDataChange}
                            textboxName="labor"
                            index={index} // Pass index here
                            value={row.labor}
                          />
                          {/* <input
                            type="number"
                            value={row.labor}
                            onChange={(e) => {
                              const value = e.target.value.slice(0, 6);
                              handleRowChange(
                                { ...e, target: { ...e.target, value } },
                                index,
                                "labor"
                              );
                            }}
                          /> */}
                        </TableCell>

                        {/* <TableCell>{ccyFormat(row.price)}</TableCell> */}
                        <TableCell>
                          <Noreadonly
                            name="Price"
                            handleDataChange={handleDataChange}
                            textboxName="price"
                            index={index} // Pass index here
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
                      <TableCell colSpan={4}>Subtotal</TableCell>
                      {/* <TableCell>{ccyFormat(subtotal)}</TableCell> */}
                      <TableCell>
                        <Noreadonly
                          name="Subtotal"
                          handleDataChange={handleDataChange}
                          textboxName="subtotal"
                          index={-1} // Set index to -1 for subtotal
                          value={subtotal}
                        />
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell colSpan={3}> GST(%):</TableCell>
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
                        {/* {ccyFormat(subtotal * (taxRate / 100))} */}
                        <Noreadonly
                          name="GST"
                          handleDataChange={handleDataChange}
                          textboxName="taxRate"
                          index={-2} // Set index to a unique negative value for GST
                          value={subtotal * (taxRate / 100)}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={4}>Total</TableCell>
                      <TableCell>
                        {/* {ccyFormat(subtotal + subtotal * (taxRate / 100))} */}
                        <Noreadonly
                          name="Total"
                          handleDataChange={handleDataChange}
                          textboxName="total"
                          index={-3} // Set index to a unique negative value for the total
                          value={subtotal + subtotal * (taxRate / 100)}
                        />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Col>
          </Row>
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
        </Container>
      </div>
    </>
  );
}

export default Add_service;
