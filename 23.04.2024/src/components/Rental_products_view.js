import React, { useState, useEffect, useContext } from "react";
import { Button, Col, Row, Table, Form } from "react-bootstrap";
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
import { NavLink, useNavigate } from "react-router-dom";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import Card from "react-bootstrap/Card";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Btn } from "./Input";
import { dataContext } from "./context/DataContext.jsx";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import {
  CircularProgress,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  Slide,
  Snackbar,
  TextField,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DELETE, EDIT, EDIT_RENTAL_HISTORY } from "../utils/constant.js";
import dayjs from "dayjs";

function Rental_products_view() {
  const breadcrumbs = [
    <Link underline="hover" key="1" color="white">
      Rental
    </Link>,
    <Link underline="hover" key="2" color="white">
      View Rental
    </Link>,
  ];

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
        "http://localhost/GVM_Backend/controllers/api/get/viewRental.php"
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
        item.site_name.toLowerCase().includes(query.toLowerCase()) ||
        item.product_name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };

  // Handle table row click
  const handleTableRowClick = async (purchase) => {
    await axios
      .post(
        "https://vebbox.in/gvmbackend/controllers/api/get/viewParticulerRental.php",
        {
          id: purchase?.id,
        }
      )
      .then((response) => {
        console.log(response.data);
        setSelectedSite(response.data);
        if (response?.data?.length <= 0) {
          toast.error("No records Found");
        }
      })
      .catch((error) => console.error("Error:", error));
  };
  // Handle form submission
  const handleSubmit = (event) => {
    // event.preventDefault(); this code enable page is not refershed

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      // Calculate the new paid amount by adding make_payment to the existing paid_amount
      const newPaidAmount =
        parseFloat(record.paid) + parseFloat(record.make_payment);

      // Validate if the make payment amount is greater than the balance amount
      const balance = parseFloat(record.balance);
      const makePayment = parseFloat(record.make_payment);
      if (makePayment > balance) {
        alert("Please Check Make Payment Amount");
        return; // Exit the function if make payment amount is greater than balance amount
      }
      // Prepare the data for the initial POST request
      const newData = {
        site_name: record.site_name,
        make_payment: record.make_payment,
        date: record.date,
        payment_method: record.payment_method,
      };

      // Send the initial POST request to add the purchase payment
      axios
        .post(
          "http://localhost/GVM_Backend/controllers/api/post/addRentalPayment.php",
          newData
        )
        .then((response) => {
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
      axios
        .put(
          "http://localhost/GVM_Backend/controllers/api/put/updateRentalPayment.php",
          updateData
        )
        .then((response) => {
          toast.success("Data Updated Successfully!");
        })
        .catch((error) => {
          console.error("Error updating data:", error);
          toast.error("Data Not Updated!");
        });
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
    const totalAmount = parseFloat(record.total);
    const paidAmount = parseFloat(record.paid);
    const makePayment = parseFloat(record.make_payment) || 0; // Set default value to 0 if makePayment is NaN

    if (!isNaN(totalAmount) && !isNaN(paidAmount) && !isNaN(makePayment)) {
      let balance_amount = totalAmount - (paidAmount + makePayment);
      if (balance_amount < 0) {
        balance_amount = 0; // Set balance_amount to 0 if negative
      }
      return balance_amount.toString();
    } else {
      return "0";
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
  const [isOpen, setIsOpen] = React.useState(false);

  const handleClickOpen = () => {
    setIsOpen((prev) => !prev);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const dateSubmit = () => {
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

  const [record, setRecord] = useState(null);
  const [validated, setValidated] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const [selectedSite, setSelectedSite] = useState([]);
  const [data, setData] = useState();
  const [actionType, setActionType] = useState("");
  const handleActionClick = (e, purchase, actionType) => {
    e.stopPropagation();
    setData(purchase);
    setActionType(actionType);
    handleClickOpen();
  };

  //delete
  const [showPurchaseForm, setShowPurchaseForm] = useState(false);
  const [showQuitForm, setShowQuitForm] = useState(false);
  const [selectedVal, setSelectedVal] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(true);
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
      site_name: selectedVal?.site_name,
    };
    await axios
      .post(
        "http://localhost/GVM_Backend/controllers/api/delete/rentalDelete.php",
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
  const getData = async () => {
    await axios
      .get("https://vebbox.in/gvmbackend/controllers/api/get/viewRental.php")
      .then((response) => {
        setFilteredData(response.data);
      })
      .catch((error) => console.error("Error:", error));
  };
  useEffect(() => {
    getData();
  }, []);
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
            <Col xs={12} md={8} lg={4} className="d-grid gap-2 mt-1">
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
            <Col xs={12} md={8} lg={1} className="d-grid gap-2 mt-1">
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
              lg={{ span: "3", offset: "3" }}
              className="d-grid gap-2 text-center  mt-1"
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

          {/* Table */}
          <Row>
            <Col xs={12} className="d-grid gap-2 mt-1">
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
                      <th>Site Name</th>
                      <th>Date</th>
                      <th>Total Amount</th>
                      <th>Paid Amount</th>
                      <th>Balance Amount</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredData?.map((purchase) => (
                      <tr
                        key={purchase.purchase_id}
                        onClick={() => handleTableRowClick(purchase)}
                      >
                        <td>{purchase.site_name}</td>
                        <td>{purchase.date}</td>
                        <td>
                          {!!purchase.totalAmount ? purchase.totalAmount : "0"}
                        </td>
                        <td>
                          {!!purchase.paidAmount ? purchase.paidAmount : "0"}
                        </td>
                        <td>{!!purchase.balance ? purchase.balance : "0"}</td>
                        <td style={{ whiteSpace: "nowrap" }}>
                          <button
                            style={{
                              border: "none",
                              backgroundColor: "inherit",
                              display: "inline-block",
                            }}
                            onClick={(e) =>
                              handleActionClick(e, purchase, EDIT)
                            }
                          >
                            <EditIcon />
                          </button>
                          {/* <button
                            style={{
                              border: "none",
                              backgroundColor: "inherit",
                            }}
                            onClick={(e) => {
                              handleActionClick(e, purchase, DELETE);
                            }}
                          >
                            <DeleteIcon />
                          </button> */}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                {filteredData.length <= 0 && (
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <CircularProgress />
                  </div>
                )}
              </div>
            </Col>
            {/* second table */}
            <Col xs={12} md={12} lg={12} className="d-grid gap-2 mt-1">
              <div
                style={{
                  overflowX: "auto",
                  maxWidth: "100%",
                  maxHeight: "300px",
                  overflowY: "scroll",
                }}
              >
                {selectedSite?.length > 0 && (
                  <Table bordered className="table-center">
                    <thead>
                      <tr>
                        <th>Site Name</th>
                        <th>Date</th>
                        <th>Product Name</th>
                        <th>Days</th>
                        <th>qty</th>
                        <th>Price</th>
                        {/* <th>From Date</th> */}
                        <th>To Date</th>
                        <th>Total</th>
                        {/* <th>Paid</th>
                      <th>Balance </th>
                      <th>Action </th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {selectedSite.map((data, i) => {
                        return (
                          <tr key={i}>
                            <td>{!!data.site_name ? data.site_name : "-"}</td>
                            <td>{!!data.date ? data.date : "-"}</td>
                            <td>
                              {!!data.product_name ? data.product_name : "-"}
                            </td>
                            <td>{!!data.days ? data.days : "-"}</td>
                            <td>{!!data.qty ? data.qty : "-"}</td>
                            <td>{!!data.price ? data.price : "-"}</td>
                            {/* <td>{!!data.fromDate ? data.fromDate : "-"}</td> */}
                            <td>{!!data.todate ? data.todate : "-"}</td>
                            <td>{!!data.total ? data.total : "-"}</td>
                            {/* <td>{!!data.paidAmount ? data.paidAmount : "-"}</td>
                          <td>{!!data.balance ? data.balance : "-"}</td>
                          <td style={{ whiteSpace: "nowrap" }}>
                            <button
                              style={{
                                border: "none",
                                backgroundColor: "inherit",
                                display: "inline-block",
                              }}
                              onClick={(e) => handleActionClick(e, data, EDIT)}
                            >
                              <EditIcon />
                            </button>
                            <button
                              style={{
                                border: "none",
                                backgroundColor: "inherit",
                              }}
                              onClick={(e) => {
                                handleActionClick(e, data, DELETE);
                              }}
                            >
                              <DeleteIcon />
                            </button>
                          </td> */}
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                )}
              </div>
            </Col>
            <Col xs={12} md={8} lg={6} className="d-grid gap-2 mt-3">
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="validationCustom01"
                >
                  {/* <Idpayment
                    name="Site Name"
                    handleDataChange={handleDataChange}
                    textboxName="site_name"
                    value={record.site_name}
                  />
                  <Date
                    name="Date"
                    handleDataChange={handleDataChange}
                    textboxName="date"
                    value={record.date1}
                  />
                  <Nopayment
                    name="Total Amount"
                    handleDataChange={handleDataChange}
                    textboxName="total_amount"
                    value={record.total}
                  />
                  <Nopayment
                    name="Paid Amount"
                    handleDataChange={handleDataChange}
                    textboxName="paid_amount"
                    value={record.paid}
                  />
                  <Nopayment
                    name="Balance Amount"
                    handleDataChange={handleDataChange}
                    textboxName="balance_amount"
                    value={record.balance}
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
                  /> */}

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
                        marginTop: "-650px",
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
                          <Col
                            lg={{ span: 3, offset: 3 }}
                            className="text-center"
                          >
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
        </Container>
      </div>
      <CustomDialogue
        isOpen={isOpen}
        data={data}
        handleClick={handleClickOpen}
        actionType={actionType}
        maxWidth="sm"
        getData={getData}
      />
    </>
  );
}
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const CustomDialogue = ({
  isOpen,
  handleClick,
  data,
  actionType,
  maxWidth = "xs",
  getData,
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={handleClick}
      TransitionComponent={Transition}
      keepMounted
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth={maxWidth}
    >
      <DialogTitle id="alert-dialog-title">{actionType} Rental</DialogTitle>
      <Divider />
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {actionType === EDIT && (
            <EditAction
              data={data}
              handleClose={handleClick}
              getData={getData}
            />
          )}
          {actionType === DELETE && (
            <DeleteAction
              data={data}
              handleClose={handleClick}
              getData={getData}
            />
          )}
          {actionType === EDIT_RENTAL_HISTORY && (
            <EditRentalHistoryAction data={data} />
          )}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

const EditAction = ({ data, handleClose, getData }) => {
  const [value, setValue] = useState({});
  const handleChange = (event) => {
    let newValue = { ...value };
    if (event.target.name === "paid") {
      newValue[event.target.name] = event.target.value;
      newValue.balance = Number(newValue.total) - Number(event.target.value);
    }
    setValue({
      ...newValue,
    });
    console.log(newValue);
  };
  const handleSave = async () => {
    if (value.balance >= 0) {
      toast.success("Data updated successfully");
      await axios
        .post(
          "https://vebbox.in/gvmbackend/controllers/api/put/updateRentalPayment.php",
          { id: value.id, paid_amount: value.paidAmount }
        )
        .then((response) => {
          getData();
        })
        .catch((error) => console.error("Error:", error));
      handleClose();
    } else {
      toast.error("Paid Amount must be equal or Lest than the Total amount");
    }
  };
  useEffect(() => {
    setValue(data);
  }, [data]);
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            id="site_name"
            label="Site Name"
            name="site_name"
            variant="outlined"
            fullWidth
            value={value?.site_name}
            disabled
          />
        </Grid>
        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="Date"
                name="date"
                value={dayjs(value?.date)}
                disabled
              />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="total"
            label="Total Amount"
            name="total"
            variant="outlined"
            fullWidth
            value={value?.total}
            disabled
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="paid"
            label="Paid Amount"
            name="paid"
            variant="outlined"
            fullWidth
            autoFocus
            onChange={handleChange}
            value={value?.paid}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="balanceAmount"
            label="Balance Amount"
            name="balanceAmount"
            variant="outlined"
            fullWidth
            value={value?.balance}
            disabled
          />
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="contained"
            style={{ border: "1px solid" }}
            onClick={handleSave}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
const EditRentalHistoryAction = (data) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          required
          id="siteName"
          label="Site Name"
          name="siteName"
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid item xs={6} style={{ paddingTop: "8px" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker label="Date" />
          </DemoContainer>
        </LocalizationProvider>
      </Grid>
      <Grid item xs={6}>
        <TextField
          required
          id="productName"
          label="Product Name"
          name="productName"
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          required
          id="days"
          label="Days"
          name="days"
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          required
          id="quantity"
          label="Quantity"
          name="quantity"
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          required
          id="price"
          label="Price"
          name="price"
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker label="From Date" />
          </DemoContainer>
        </LocalizationProvider>
      </Grid>
      <Grid item xs={6}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker label="To Date" />
          </DemoContainer>
        </LocalizationProvider>
      </Grid>
      <Grid item xs={4}>
        <TextField
          required
          id="total"
          label="Total"
          name="total"
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          required
          id="paid"
          label="Paid"
          name="paid"
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          required
          id="balance"
          label="Balance"
          name="balance"
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid
        item
        xs={12}
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button variant="contained" style={{ border: "1px solid" }}>
          Save
        </Button>
      </Grid>
    </Grid>
  );
};
const DeleteAction = ({ data, handleClose, getData }) => {
  const handleDelete = async () => {
    await axios
      .post(
        "https://vebbox.in/gvmbackend/controllers/api/put/updateRentalPayment.php",
        { id: data.id }
      )
      .then(() => {
        toast.success("Data deleted successfully");
        getData();
        handleClose();
      })
      .catch((error) =>
        toast.success("Unable to delete this data " + error.message)
      );
  };
  return (
    <div
      style={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <h4>Do you want delete?</h4>

      <div style={{ display: "flex", gap: "24px" }}>
        <Button onClick={handleDelete}>Delete</Button>
        <Button autoFocus>Cancel</Button>
      </div>
    </div>
  );
};
export default Rental_products_view;
