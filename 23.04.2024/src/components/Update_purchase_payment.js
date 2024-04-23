import React, { useState, useEffect, useContext } from "react";
import { Button, Col, Row, Table, Modal, Form } from "react-bootstrap";
import "./style";
import Container from "react-bootstrap/Container";
import AddIcon from "../icons/add-icon.svg";
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
import Card from "react-bootstrap/Card";
import FilterListIcon from "@mui/icons-material/FilterList";
import { dataContext } from "./context/DataContext.jsx";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

function Update_purchase_payment() {
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit">
      Purchase
    </Link>,
    <Link underline="hover" key="2" color="white">
      Payment History
    </Link>,
  ];
  const [purchaseData, setPurchaseData] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "" });
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [selectedFields, setSelectedFields] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost/GVM_Backend/controllers/api/get/viewPurchasePayment.php"
      );
      setPurchaseData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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

  // Handle search input change
  const handleSearchChange = (e) => {
    console.log("Search query:", e.target.value);
    const query = e.target.value;
    setSearchQuery(query);

    if (purchaseData && purchaseData.length > 0) {
      const filtered = purchaseData.filter(
        (item) =>
          item.vendor_name &&
          item.vendor_name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered);
    }
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
  // State variables
  const [validated, setValidated] = useState(false);
  const [record, setRecord] = useState({
    purchase_id: "",
    mobile_no: "",
    vendor_name: "",
    paid_amount: "",
    date: "",
  });
  const {
    purchaseData: contextPurchaseData,
    setPurchaseData: setContextPurchaseData,
  } = useContext(dataContext);

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

            <Col
              xs={12}
              md={8}
              lg={{ span: 3, offset: 4 }}
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
        </Container>
      </div>

      <Row>
        <Col xs={12} md={8} lg={12} className="d-grid gap-2 mt-5">
          <div style={{ overflowX: "auto", maxWidth: "100%" }}>
            <Table bordered className="table-center">
              <thead>
                <tr>
                  <th>purchase_id</th>
                  <th>mobile_no</th>
                  <th>vendor_name</th>
                  <th>date</th>
                  <th>paid_amount</th>
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
                    <td>{purchase.date}</td>
                    <td>{purchase.make_payment}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>

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
    </>
  );
}

export default Update_purchase_payment;
