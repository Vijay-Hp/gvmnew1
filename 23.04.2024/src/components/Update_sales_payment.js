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
  Idreadonly,
  Mbl,
  Name,
  No,
  Nopoint,
  Radio,
  Radio1,
  Topbutton,
  Topbutton1,
} from "./Input";
import { dataContext } from "./context/DataContext.jsx";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

function Update_sales_payment() {
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit">
      Purchase
    </Link>,
    <Link underline="hover" key="2" color="white">
      Payment History
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
        "http://localhost/GVM_Backend/controllers/api/get/viewSalesPayment.php"
      );
      setPurchaseDataContext(response.data);
      setPurchaseData1(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearchChange = (e) => {
    console.log("Search query:", e.target.value);
    const query = e.target.value;
    setSearchQuery(query);

    if (purchaseData && purchaseData.length > 0) {
      const filtered = purchaseData.filter(
        (item) =>
          item.customer_name &&
          item.customer_name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered);
    }
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
        `http://localhost/GVM_Backend/controllers/api/delete/purchaseDelete.php`,
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
            <Row>
              <Col xs={12} md={8} lg={6} className="d-grid gap-2 mt-5">
                <NavLink to="/update_sales" className="ul">
                  <Topbutton1 topname="Payment" />
                </NavLink>
              </Col>
              <Col xs={12} md={8} lg={6} className="d-grid gap-2 mt-5">
                <NavLink to="/update_sales_payment" className="ul">
                  <Topbutton topname="Payment History" />
                </NavLink>
              </Col>
            </Row>
            <Col xs={12} md={8} lg={4} className="d-grid gap-2 mt-5">
              <div className="search-container">
                <div style={{ position: "relative" }}>
                  <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search Customer Name"
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
                <MenuItem onClick={dateSubmit}>
                  <Button type="submit" size="lg" style={{ width: "100%" }}>
                    Submit
                  </Button>
                </MenuItem>
              </Menu>
            </Col>
            <Col
              xs={12}
              md={8}
              lg={{ span: 3, offset: 3 }}
              className="d-grid gap-2 mt-5 text-center"
            >
              <NavLink to="/update_sales" className="ul">
                <Button
                  size="lg"
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    width: "100%",
                  }}
                >
                  <img src={AddIcon} alt="update icon" className="updatebtn" />
                  Payment
                </Button>
              </NavLink>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={8} lg={12} className="d-grid gap-2 mt-5">
              <div style={{ overflowX: "auto", maxWidth: "100%" }}>
                <Table bordered className="table-center">
                  <thead>
                    <tr>
                      <th onClick={() => handleSort("purchase_id")}>
                        sales_id {getSortArrow("purchase_id")}
                      </th>
                      <th>mobile_no</th>
                      <th onClick={() => handleSort("vendor_name")}>
                        customer_name {getSortArrow("vendor_name")}
                      </th>
                      <th onClick={() => handleSort("date")}>
                        date {getSortArrow("date")}
                      </th>
                      <th>paid_amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedData().map((purchase) => (
                      <tr key={purchase.purchase_id}>
                        <td>{purchase.sales_id}</td>
                        <td>{purchase.mobile_no}</td>
                        <td>{purchase.customer_name}</td>
                        <td>{purchase.date}</td>
                        <td>{purchase.make_payment}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
export default Update_sales_payment;
