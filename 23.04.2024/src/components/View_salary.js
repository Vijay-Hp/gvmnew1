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

function View_salary() {
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit">
      Salary
    </Link>,
    <Link underline="hover" key="2" color="white">
      View Salary
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
        "https://vebbox.in/gvmbackend/controllers/api/get/viewSalary.php"
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
    const filtered = purchaseData.filter((item) =>
      item.employee_name.toLowerCase().includes(query.toLowerCase())
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
      employeeId: selectedVal?.employee_id,
    };
    // console.log(payload);
    await axios
      .post(
        "https://vebbox.in/gvmbackend/controllers/api/delete/salaryDelete.php",
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
    employee_name: "",
    wages_type: "",
    salary_amount: "",
    paid_amount: "",
    payment_method: "",
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
      employee_name: purchase.employee_name,
      wages_type: purchase.wages_type,
      salary_amount: purchase.salary_amount,
      paid_amount: purchase.paid_amount,
      payment_method: purchase.payment_method,
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
        employee_id: selectedPurchase.employee_id,
        mobile_no: updateData.mobile_no,
        employee_name: updateData.employee_name,
        wages_type: updateData.wages_type,
        salary_amount: updateData.salary_amount,
        paid_amount: updateData.paid_amount,
        payment_method: updateData.payment_method,
      };

      toast.success("Data Update Successfully!");
      console.log(newData);

      axios
        .post(
          "https://vebbox.in/gvmbackend/controllers/api/put/updateSalary.php",
          newData
        )
        .then((response) => {
          console.log("Data sent successfully:", response.data);
          // Update purchaseDataContext with new values
          setPurchaseDataContext((prevPurchaseData) => {
            const updatedPurchaseData = prevPurchaseData.map((purchase) => {
              if (purchase.vehicle_no === selectedPurchase.vehicle_no) {
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
            employee_name: "",
            wages_type: "",
            salary_amount: "",
            paid_amount: "",
            payment_method: "",
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
        "https://vebbox.in/gvmbackend/controllers/api/get/vehicleFliter.php",
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
            <Col xs={12} md={8} lg={4} className="d-grid gap-2 mt-5">
              <div className="search-container">
                <div style={{ position: "relative" }}>
                  <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search Employee name"
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
            {/* <Col xs={12} md={8} lg={1} className="d-grid gap-2 mt-5">
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
            </Col> */}
            {/* download */}
            <Col
              xs={12}
              md={8}
              lg={{ span: 3, offset: 1 }}
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
            </Col>
            <Col
              xs={12}
              md={8}
              lg={3}
              className="d-grid gap-2 mt-5 text-center"
            >
              <NavLink to="/add_salary" className="ul">
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
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {!loading && !error && (
            <div style={{ overflowX: "auto", maxWidth: "100%" }}>
              <Table bordered className="table-center">
                <thead>
                  <tr>
                    <th>Action</th>
                    <th onClick={() => handleSort("employee_id")}>
                      employee_id {getSortArrow("employee_id")}
                    </th>
                    <th>mobile_no</th>
                    <th onClick={() => handleSort("employee_name")}>
                      employee_name{getSortArrow("employee_name")}
                    </th>
                    <th>wages_type</th>
                    <th>salary_amount</th>
                    <th>paid_amount</th>
                    <th>payment_method</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedData().map((purchase) => (
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
                          style={{ border: "none", backgroundColor: "inherit" }}
                          onClick={() => {
                            handlePurchaseButtonClick("purchase");
                            setSelectedVal(purchase);
                          }}
                        >
                          <DeleteIcon />
                        </button>
                      </td>
                      <td>{purchase.employee_id}</td>
                      <td>{purchase.mobile_no}</td>
                      <td>{purchase.employee_name}</td>
                      <td>{purchase.wages_type}</td>
                      <td>{purchase.salary_amount}</td>
                      <td>{purchase.paid_amount}</td>
                      <td>{purchase.payment_method}</td>
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
                          name="Mobile No"
                          handleDataChange={handleInputChange}
                          textboxName="mobile_no"
                          value={updateData?.mobile_no}
                        />
                        <Id
                          name="Employee name"
                          handleDataChange={handleInputChange}
                          textboxName="employee_name"
                          value={updateData?.employee_name}
                        />
                        <Radio
                          name="Wages type"
                          name1="wages_type"
                          label1="Daily"
                          label2="Weekly"
                          value1="Daily"
                          value2="Weekly"
                          handleDataChange={handleInputChange}
                          textboxName="wages_type"
                          choose={updateData.wages_type}
                        />

                        {/* 
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
                        */}
                      </Col>
                      <Col xs={6} md={6}>
                        <Id
                          name="Salary Amount"
                          handleDataChange={handleInputChange}
                          textboxName="salary_amount"
                          value={updateData?.salary_amount}
                        />
                        <Id
                          name="Paid Amount"
                          handleDataChange={handleInputChange}
                          textboxName="paid_amount"
                          value={updateData?.paid_amount}
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

export default View_salary;
