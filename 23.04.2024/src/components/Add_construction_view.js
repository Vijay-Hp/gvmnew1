import React, { useState, useEffect, useContext } from "react";
import { Button, Col, Row, Table, Modal, Form } from "react-bootstrap";
import { styled, useTheme } from "@mui/material/styles";
import "./style";
import Container from "react-bootstrap/Container";
import AddIcon from "../icons/add-icon.svg";
import DownloadIcon from "@mui/icons-material/Download";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { saveAs } from "file-saver";
import { Document, pdf, Page, Text, View } from "@react-pdf/renderer";
import Card from "react-bootstrap/Card";
import FilterListIcon from "@mui/icons-material/FilterList";
import UpdateIcon from "@mui/icons-material/Update";
import {
  Btn,
  Btn1,
  Btncancel,
  Date,
  Id,
  Idnotreq,
  Idreadonly,
  Mbl,
  Name,
  Namenotreq,
  No,
  Nopoint,
  Radio,
  Radio1,
} from "./Input";
import { dataContext } from "./context/DataContext.jsx";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { EditCalendarOutlined } from "@mui/icons-material";
import ClearAllIcon from "@mui/icons-material/ClearAll";

function Add_construction_view() {
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit">
      Constructions
    </Link>,
    <Link underline="hover" key="2" color="white">
      View Expenses
    </Link>,
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [purchaseData1, setPurchaseData1] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "" });
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [selectedFields, setSelectedFields] = useState([]);
  const { purchaseData, setPurchaseData: setPurchaseDataContext } =
    useContext(dataContext);
  const [isModalOpen, setIsModalOpen] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost/GVM_Backend/controllers/api/get/viewPurchase.php"
      );
      setPurchaseDataContext(response.data);
      setPurchaseData1(response.data);
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

  //delete
  const [showPurchaseForm, setShowPurchaseForm] = useState(false);
  const [showQuitForm, setShowQuitForm] = useState(false);
  const [selectedVal, setSelectedVal] = useState({});
  const handlePurchaseButtonClick = (val) => {
    if (val === "purchase") {
      setShowPurchaseForm(false);
      setShowQuitForm(false);
    } else if (val === "payment") {
      setShowPurchaseForm(false);
      setShowQuitForm(true);
    }
  };

  useEffect(() => {
    setShowPurchaseForm(true);
    setShowQuitForm(false);
  }, []);

  const deleteData = async () => {
    let payload = {
      purchaseId: selectedVal?.purchase_id,
    };
    // console.log(payload);
    await axios
      .post(
        "http://localhost/GVM_Backend/controllers/api/delete/purchaseDelete.php",
        payload
      )
      .then((res) => {
        if (res.data.message === "deleted") {
          // alert("deleted succussfully");
          toast.success("Deleted Successfully!");
          setShowPurchaseForm(true);
          setShowQuitForm(true);
          fetchData();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleCancelClick = () => {
    setShowPurchaseForm(true);
    setShowQuitForm(false);
  };

  //sorting
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = () => {
    if (!sortConfig.key) return filteredData;

    const sorted = [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (sortConfig.direction === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
    return sorted;
  };

  const getSortArrow = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? (
        <ArrowDropUpIcon />
      ) : (
        <ArrowDropDownIcon />
      );
    }
    return null;
  };

  //csv
  const handleExportCsv = () => {
    const data = sortedData().map((purchase) => {
      const selectedData = {};
      selectedFields.forEach((field) => {
        selectedData[field] = purchase[field];
      });
      return selectedData;
    });

    const csvData = [
      Object.keys(data[0]),
      ...data.map((item) => Object.values(item)),
    ];
    const csvContent = csvData.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "purchasesdata.csv");
    // Close the download modal after confirming the download
    setShowDownloadModal(false);
  };

  //update
  const [updateData, setUpdateData] = useState({
    mobile_no: "",
    vendor_name: "",
    vendor_type: "",
    product_name: "",
    product_quantity: "",
    total_amount: "",
    balance_amount: "",
    paid_amount: "",
    payment_method: "",
    payment_type: "",
    gst_no: "",
    vehicle_no: "",
    vehicle_type: "",
    driver_name: "",
    fuel_liter: "",
    fuel_amount: "",
    date: "",
    wages: "",
    wages_amount: "",
    other_expenses: "",
    expenses_amount: "",
    wages_total_amount: "",
    rental_amount: "",
    balance_amount1: "",
  });

  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const [validated, setValidated] = useState(false);
  const [record, setRecord] = useState(null);
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const info = purchaseData?.length ? purchaseData[0] : "";
    const { purchase_id = "" } = info;
    purchase_id && setRecord(info);
  }, [purchaseData]);

  const handleUpdateClick = (purchase) => {
    setSelectedPurchase(purchase);
    setUpdateData({
      mobile_no: purchase.mobile_no,
      vendor_name: purchase.vendor_name,
      vendor_type: purchase.vendor_type,
      mobile_no: purchase.mobile_no,
      product_name: purchase.product_name,
      product_quantity: purchase.product_quantity,
      total_amount: purchase.total_amount,
      paid_amount: purchase.paid_amount,
      balance_amount: purchase.balance_amount,
      payment_method: purchase.payment_method,
      payment_type: purchase.payment_type,
      gst_no: purchase.gst_no,
      vehicle_no: purchase.vehicle_no,
      vehicle_type: purchase.vehicle_type,
      driver_name: purchase.driver_name,
      fuel_liter: purchase.fuel_liter,
      fuel_amount: purchase.fuel_amount,
      date: purchase.date,
      wages: purchase.wages,
      wages_amount: purchase.wages_amount,
      other_expenses: purchase.other_expenses,
      expenses_amount: purchase.expenses_amount,
      wages_total_amount: purchase.wages_total_amount,
      rental_amount: purchase.rental_amount,
      balance_amount1: purchase.balance_amount1,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const newData = {
        purchase_id: selectedPurchase.purchase_id,
        mobile_no: updateData.mobile_no,
        vendor_name: updateData.vendor_name,
        vendor_type: updateData.vendor_type,
        product_name: updateData.product_name,
        product_quantity: updateData.product_quantity,
        total_amount: updateData.total_amount,
        paid_amount: updateData.paid_amount,
        balance_amount: updateData.balance_amount,
        payment_method: updateData.payment_method,
        payment_type: updateData.payment_type,
        gst_no: updateData.gst_no,
        vehicle_no: updateData.vehicle_no,
        vehicle_type: updateData.vehicle_type,
        driver_name: updateData.driver_name,
        fuel_liter: updateData.fuel_liter,
        fuel_amount: updateData.fuel_amount,
        date: updateData.date,
        wages: updateData.wages,
        wages_amount: updateData.wages_amount,
        other_expenses: updateData.other_expenses,
        expenses_amount: updateData.expenses_amount,
        wages_total_amount: updateData.wages_total_amount,
        rental_amount: updateData.rental_amount,
        balance_amount1: updateData.balance_amount1,
      };

      toast.success("Data Update Successfully!");
      console.log(newData);

      axios
        .post(
          "http://localhost/GVM_Backend/controllers/api/put/updatePurchase.php",
          newData
        )
        .then((response) => {
          console.log("Data sent successfully:", response.data);
          // Update purchaseDataContext with new values
          setPurchaseDataContext((prevPurchaseData) => {
            const updatedPurchaseData = prevPurchaseData.map((purchase) => {
              if (purchase.purchase_id === selectedPurchase.purchase_id) {
                return newData;
              } else {
                return purchase;
              }
            });
            return updatedPurchaseData;
          });

          // Reset state variables
          setSelectedPurchase(null);
          setUpdateData({
            mobile_no: "",
            vendor_name: "",
            vendor_type: "",
            product_name: "",
            product_quantity: "",
            total_amount: "",
            paid_amount: "",
            balance_amount: "",
            payment_method: "",
            payment_type: "",
            gst_no: "",
            vehicle_no: "",
            vehicle_type: "",
            driver_name: "",
            fuel_liter: "",
            fuel_amount: "",
            date: "",
            wages: "",
            wages_amount: "",
            other_expenses: "",
            expenses_amount: "",
            wages_total_amount: "",
            rental_amount: "",
            balance_amount1: "",

            // Reset other fields as needed
          });
          // Refetch data to update the UI
          fetchData();
        })
        .catch((error) => {
          console.error("Error sending data:", error);
          toast.error("Failed to update data.");
        });
    }
    setValidated(true);
  };

  //date fliter
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [tableData, setTableData] = useState([]); // Assuming you have table data
  const [filteredTableData, setFilteredTableData] = useState([]);
  const [loading, setLoading] = useState(false); // Define the loading state
  const [error, setError] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const dateSubmit = () => {
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);

    // Create a data object with the start date and end date
    const data = {
      start_date: startDate,
      end_date: endDate,
    };

    // Make an Axios POST request with the data object as the request body
    axios
      .post(
        "http://localhost/GVM_Backend/controllers/api/get/purchaseFliter.php",
        data
      )
      .then((response) => {
        setFilteredData(response.data);
      })
      .catch((error) => {
        setError("Error fetching filtered data");
      })
      .finally(() => {
        setLoading(false);
      });
    handleClose();
  };
  //dropdown
  const [purchaseData2, setPurchaseData2] = useState({});
  const handleDropdownChange = (e) => {
    const { value } = e.target;
    setValue(value); // Update state with selected value
    setPurchaseData2({
      ...purchaseData2,
      wages_type: value, // Update data context with selected value
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
    setValue1(value); // Update state with selected value
    setPurchaseData2({
      ...purchaseData2,
      wages_type: value, // Update data context with selected value
    });
  };

  const [value1, setValue1] = useState("");
  const options1 = [
    { label: "Choose Expenses", value: "Choose Expenses" },
    { label: "Purchase", value: "Purchase" },
    { label: "Salary", value: "Salary" },
    { label: "Others", value: "Others" },
  ];
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
            {/* filter */}
            <Col xs={12} md={8} lg={1} className="d-grid gap-2 mt-5">
              <IconButton
                type="button"
                sx={{ p: "0px", color: "white" }}
                aria-label="search"
                onClick={handleClick}
              >
                <FilterListIcon style={{ position: "absolute", top: "10px" }} />
              </IconButton>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem>
                  <Form.Control
                    required
                    type="date"
                    placeholder="startdate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </MenuItem>
                <MenuItem>
                  <Form.Control
                    required
                    type="date"
                    placeholder="end date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </MenuItem>
                <MenuItem>
                  <Button
                    type="submit"
                    onClick={dateSubmit}
                    size="lg"
                    style={{ width: "100%" }}
                  >
                    Submit
                  </Button>
                </MenuItem>
              </Menu>
            </Col>
            {/* download */}
            {/* <Col
              xs={12}
              md={8}
              lg={3}
              className="d-grid gap-2 mt-5 text-center"
            >
              <Button
                size="lg"
                style={{
                  backgroundColor: "green",
                  color: "white",
                  width: "100%",
                }}
                onClick={() => setShowDownloadModal(true)}
              >
                <DownloadIcon />
                Download
              </Button>
            </Col> */}
            <Col
              xs={12}
              md={8}
              lg={{ span: 3, offset: 3 }}
              className="d-grid gap-2 mt-5 text-center"
            >
              <NavLink to="/add_purchase" className="ul">
                <Button
                  size="lg"
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    width: "100%",
                  }}
                >
                  <img src={AddIcon} alt="update icon" className="updatebtn" />
                  Add
                </Button>
              </NavLink>
            </Col>
          </Row>
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
            <Col xs={12} md={8} lg={{ span: 3 }} className="d-grid gap-2 mt-5">
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
        </Container>
      </div>

      <Row>
        <Col xs={12} md={8} lg={12} className="d-grid gap-2 mt-5">
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {!loading && !error && (
            <div style={{ overflowX: "auto", maxWidth: "100%" }}>
              <Table bordered className="table-center">
                <thead>
                  <tr>
                    <th>Action</th>
                    <th onClick={() => handleSort("purchase_id")}>
                      purchase_id {getSortArrow("purchase_id")}
                    </th>
                    <th>mobile_no</th>
                    <th onClick={() => handleSort("vendor_name")}>
                      vendor_name {getSortArrow("vendor_name")}
                    </th>
                    <th>vendor_type</th>
                    <th onClick={() => handleSort("product_name")}>
                      product_name {getSortArrow("product_name")}
                    </th>
                    <th>product_quantity</th>
                    <th>total_amount</th>
                    <th>paid_amount</th>
                    <th>balance_amount</th>
                    <th>payment_method</th>
                    <th>payment_type</th>
                    <th>gst_no</th>
                    <th>vehicle_no</th>
                    <th>vechicle_type</th>
                    <th>driver_name</th>
                    <th>fuel_liter</th>
                    <th>fuel_amount</th>
                    <th>date</th>
                    <th>wages</th>
                    <th>wages_amount</th>
                    <th>other_expenses</th>
                    <th>expenses_amount</th>
                    <th>wages_total_amount</th>
                    <th>rental_amount</th>
                    <th>balance_amount1</th>
                  </tr>
                </thead>
                <tbody>
                  {(sortedData() || []).map((purchase) => (
                    <tr key={purchase.purchase_id}>
                      <td style={{ whiteSpace: "nowrap" }}>
                        <button
                          style={{
                            border: "none",
                            backgroundColor: "inherit",
                            display: "inline-block",
                          }}
                          onClick={() => handleUpdateClick(purchase)}
                        >
                          <UpdateIcon />
                        </button>
                        <button
                          style={{
                            border: "none",
                            backgroundColor: "inherit",
                          }}
                          onClick={() => {
                            handlePurchaseButtonClick("purchase");
                            setSelectedVal(purchase);
                          }}
                        >
                          <DeleteIcon />
                        </button>
                      </td>
                      <td>{purchase.purchase_id}</td>
                      <td>{purchase.mobile_no}</td>
                      <td>{purchase.vendor_name}</td>
                      <td>{purchase.vendor_type}</td>
                      <td>{purchase.product_name}</td>
                      <td>{purchase.product_quantity}</td>
                      <td>{purchase.total_amount}</td>
                      <td>{purchase.paid_amount}</td>
                      <td>{purchase.balance_amount}</td>
                      <td>{purchase.payment_method}</td>
                      <td>{purchase.payment_type}</td>
                      <td>{purchase.gst_no}</td>
                      <td>{purchase.vehicle_no}</td>
                      <td>{purchase.vehicle_type}</td>
                      <td>{purchase.driver_name}</td>
                      <td>{purchase.fuel_liter}</td>
                      <td>{purchase.fuel_amount}</td>
                      <td>{purchase.date}</td>
                      <td>{purchase.wages}</td>
                      <td>{purchase.wages_amount}</td>
                      <td>{purchase.other_expenses}</td>
                      <td>{purchase.expenses_amount}</td>
                      <td>{purchase.wages_total_amount}</td>
                      <td>{purchase.rental_amount}</td>
                      <td>{purchase.balance_amount1}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Col>
      </Row>
      {showPurchaseForm ? (
        <div></div>
      ) : (
        isModalOpen && (
          <div>
            <Row>
              <Col
                xs={12}
                md={8}
                lg={{ span: 8, offset: 2 }}
                className="d-grid gap-2"
              >
                <Card
                  style={{
                    backgroundColor: "#232135",
                    marginTop: "-450px",
                    height: "300px",
                  }}
                >
                  <Card.Body
                    className="mt-5"
                    style={{ textAlign: "center", color: "white" }}
                  >
                    <Card.Title>Are you sure want to </Card.Title>
                    <Card.Title>Delete? </Card.Title>
                    <Row
                      style={{
                        textAlign: "center",
                        color: "white",
                        marginTop: "50px",
                      }}
                    >
                      <Col lg={{ span: 3, offset: 3 }} className="text-center">
                        <Button
                          size="lg"
                          variant="light"
                          className="w-100"
                          onClick={handleCancelClick}
                        >
                          Cancel
                        </Button>
                      </Col>
                      <Col lg={3} className="text-center">
                        <Button
                          size="lg"
                          variant="danger"
                          style={{ border: "none" }}
                          className="w-100"
                          onClick={deleteData}
                        >
                          Delete
                        </Button>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        )
      )}
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
      {/* /update */}
      {selectedPurchase && (
        <Modal
          size="lg"
          show={true}
          onHide={() => setSelectedPurchase(null)}
          style={{ marginTop: "80px" }}
        >
          <Modal.Dialog style={{ width: "700px" }}>
            <Modal.Header style={{ backgroundColor: "rgb(61, 59, 82)" }}>
              {/* closeButton this line add icon close automated */}
              <Modal.Title style={{ color: "white" }}>
                Update Purchase
              </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: "rgb(61, 59, 82)" }}>
              <Container>
                <Row>
                  <Form
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmit}
                  >
                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="validationCustom01"
                    >
                      <Col xs={12} md={6}>
                        <Mbl
                          name="Mobile Number"
                          handleDataChange={handleInputChange}
                          textboxName="mobile_no"
                          value={updateData?.mobile_no}
                        />
                        <Name
                          name="Vendor Name"
                          handleDataChange={handleInputChange}
                          textboxName="vendor_name"
                          value={updateData?.vendor_name}
                        />
                        <Radio
                          name="Vendor Type"
                          name1="vendor_type"
                          label1="New"
                          label2="Existing"
                          value1="New"
                          value2="Existing"
                          handleDataChange={handleInputChange}
                          choose={updateData.vendor_type}
                        />
                        <Name
                          name="Location"
                          handleDataChange={handleInputChange}
                          textboxName="location"
                          value={updateData?.location}
                        />
                        <Name
                          name="Product Name"
                          handleDataChange={handleInputChange}
                          textboxName="product_name"
                          value={updateData?.product_name}
                        />
                        <No
                          name="Product Quantity"
                          handleDataChange={handleInputChange}
                          textboxName="product_quantity"
                          value={updateData?.product_quantity}
                        />
                        <No
                          name="Total Amount"
                          handleDataChange={handleInputChange}
                          textboxName="total_amount"
                          value={updateData?.total_amount}
                        />
                        <No
                          name="Paid Amount"
                          handleDataChange={handleInputChange}
                          textboxName="paid_amount"
                          value={updateData?.paid_amount}
                        />
                        <Idreadonly
                          name="Balance Amount"
                          handleDataChange={handleInputChange}
                          textboxName="balance_amount"
                          val={updateData?.balance_amount}
                        />
                        <Radio
                          name="Payment Method"
                          name1="payment_method"
                          label1="Cash"
                          label2="Online Transaction"
                          value1="Cash"
                          value2="Online Transaction"
                          handleDataChange={handleInputChange}
                          textboxName="payment_method"
                          choose={updateData.payment_method}
                        />
                        <Radio
                          name="Payment Type"
                          name1="payment_type"
                          label1="Debit"
                          label2="Credit"
                          value1="Debit"
                          value2="Credit"
                          handleDataChange={handleInputChange}
                          textboxName="payment_type"
                          choose={updateData.payment_type}
                        />
                        <Idnotreq
                          name="GST No"
                          handleDataChange={handleInputChange}
                          textboxName="gst_no"
                          value={updateData?.gst_no}
                        />
                      </Col>
                      <Col xs={6} md={6}>
                        <Id
                          name="Vehicle No"
                          handleDataChange={handleInputChange}
                          textboxName="vehicle_no"
                          value={updateData?.vehicle_no}
                        />
                        <Namenotreq
                          name="Vehicle Type"
                          handleDataChange={handleInputChange}
                          textboxName="vehicle_type"
                          value={updateData?.vehicle_type}
                        />
                        <Name
                          name=" Driver Name"
                          handleDataChange={handleInputChange}
                          textboxName="driver_name"
                          value={updateData?.driver_name}
                        />
                        <Nopoint
                          name="Fuel Liter"
                          handleDataChange={handleInputChange}
                          textboxName="fuel_liter"
                          value={updateData?.fuel_liter}
                        />
                        <No
                          name="Fuel Amount"
                          handleDataChange={handleInputChange}
                          textboxName="fuel_amount"
                          value={updateData?.fuel_amount}
                        />
                        <Date
                          name="Date"
                          handleDataChange={handleInputChange}
                          textboxName="date"
                          value={updateData?.date}
                        />
                        <Namenotreq
                          name="Wages"
                          handleDataChange={handleInputChange}
                          textboxName="wages"
                          value={updateData?.wages}
                        />
                        <No
                          name="Wages Amount"
                          handleDataChange={handleInputChange}
                          textboxName="wages_amount"
                          value={updateData?.wages_amount}
                        />
                        <Namenotreq
                          name="Other Expenses"
                          handleDataChange={handleInputChange}
                          textboxName="other_expenses"
                          value={updateData?.other_expenses}
                        />
                        <No
                          name="Expenses Amount"
                          handleDataChange={handleInputChange}
                          textboxName="expenses_amount"
                          value={updateData?.expenses_amount}
                        />
                        <No
                          name="Wages Total Amount"
                          handleDataChange={handleInputChange}
                          textboxName="wages_total_amount"
                          value={updateData?.wages_total_amount}
                        />
                        <No
                          name="Rental Amount"
                          handleDataChange={handleInputChange}
                          textboxName="rental_amount"
                          value={updateData?.rental_amount}
                        />
                        <No
                          name="Balance Amount"
                          handleDataChange={handleInputChange}
                          textboxName="balance_amount1"
                          value={updateData?.balance_amount1}
                        />
                      </Col>
                      <Btncancel
                        btn="Cancel"
                        setSelectedPurchase={() => setSelectedPurchase(null)}
                      />
                      <Btn1 btn="Update" />
                    </Form.Group>
                  </Form>
                </Row>
              </Container>
            </Modal.Body>
          </Modal.Dialog>
        </Modal>
      )}

      {/* download */}
      <Modal
        size="lg"
        show={showDownloadModal}
        onHide={() => setShowDownloadModal(false)}
        style={{ marginTop: "80px" }}
      >
        <Modal.Dialog>
          <Modal.Header closeButton>
            <Modal.Title>Select Download Fields</Modal.Title>
            <Form.Check
              type="checkbox"
              label="Select All"
              style={{ marginLeft: "300px" }}
              checked={
                selectedFields.length ===
                Object.keys(sortedData().length > 0 ? sortedData()[0] : {})
                  .length
              }
              onChange={(e) => {
                if (e.target.checked) {
                  const allFields = Object.keys(
                    sortedData().length > 0 ? sortedData()[0] : {}
                  );
                  setSelectedFields(allFields);
                } else {
                  setSelectedFields([]);
                }
              }}
            />
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row>
                {Object.keys(
                  sortedData().length > 0 ? sortedData()[0] : {}
                ).map((field) => (
                  <Col key={field} xs={4}>
                    <Form.Check
                      type="checkbox"
                      label={field}
                      checked={selectedFields.includes(field)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedFields([...selectedFields, field]);
                        } else {
                          setSelectedFields(
                            selectedFields.filter((f) => f !== field)
                          );
                        }
                      }}
                    />
                  </Col>
                ))}
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Btncancel
              btn="Close"
              setSelectedPurchase={() => setShowDownloadModal(false)}
            />
            <Btn1 btn="Confirm Download" btnEvent={handleExportCsv} />
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
    </>
  );
}

export default Add_construction_view;
