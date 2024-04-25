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
import UpdateIcon from "@mui/icons-material/Update";
import { Btn } from "./Input";
import { dataContext } from "./context/DataContext.jsx";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  Slide,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Padding } from "@mui/icons-material";

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
      console.log(response);
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
  const handleTableRowClick = (purchase) => {
    setRecord({
      site_name: purchase.site_name,
      date1: purchase.date1,
      desc: purchase.desc,
      labor: purchase.labor,
      price: purchase.price,
      qty: purchase.qty,
      service: purchase.service,
      date: purchase.date,
      todate: purchase.todate,
      total: purchase.total,
      paid: purchase.paid,
      balance: purchase.balance,
    });
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
      axios
        .put(
          "http://localhost/GVM_Backend/controllers/api/put/updateRentalPayment.php",
          updateData
        )
        .then((response) => {
          console.log("Data updated successfully:", response.data);
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
      console.log("balance:", balance_amount);
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
    console.log(isOpen);
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

  const [record, setRecord] = useState(null);
  const [validated, setValidated] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const [updateData, setUpdateData] = useState({
    site_name: "",
    date1: "",
    total_amount: "",
    paid_amount: "",
    payment_method: "",
  });

  const handleUpdateClick = (purchase) => {
    setSelectedPurchase(purchase);
    setUpdateData({
      site_name: purchase.site_name,
      date1: purchase.date1,
      wages_type: purchase.wages_type,
      salary_amount: purchase.salary_amount,
      paid_amount: purchase.paid_amount,
      payment_method: purchase.payment_method,
    });
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
            <Col xs={12} md={8} lg={12} className="d-grid gap-2 mt-1">
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
                      <th>Action</th>
                      <th>site_name</th>
                      <th>date</th>
                      <th>total amount</th>
                      <th>paid amount</th>
                      <th>balance amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((purchase) => (
                      <tr
                        key={purchase.purchase_id}
                        onClick={() => handleTableRowClick(purchase)}
                      >
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
                        <td>{purchase.site_name}</td>
                        <td>{purchase.date1}</td>
                        <td>{purchase.total}</td>
                        <td>{purchase.paid}</td>
                        <td>{purchase.balance}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
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
                <Table bordered className="table-center">
                  <thead>
                    <tr>
                      <th>site_name</th>
                      <th>date</th>
                      <th>prodcut name</th>
                      <th>days</th>
                      <th>qty</th>
                      <th>price</th>
                      <th>date</th>
                      <th>todate</th>
                      <th>total</th>
                      <th>paid</th>
                      <th>balance </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* <tr key={record.site_name}>
                      <td>{record.site_name}</td>
                      <td>{record.date1}</td>
                      <td>{record.desc}</td>
                      <td>{record.labor}</td>
                      <td>{record.price}</td>
                      <td>{record.qty}</td>
                      <td>{record.service}</td>
                      <td>{record.date}</td>
                      <td>{record.todate}</td>
                      <td>{record.total}</td>
                      <td>{record.paid}</td>
                      <td>{record.balance}</td>
                    </tr> */}
                  </tbody>
                </Table>
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
        handleClick={handleClickOpen}
        maxWidth="sm"
      />
      <button onClick={handleClickOpen}>click</button>
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
      <DialogTitle id="alert-dialog-title">Edit Rental</DialogTitle>
      <Divider />
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {/* <EditAction />
          <DeleteAction /> */}
          <EditRentalHistoryAction />
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

const EditAction = (data) => {
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
      <Grid item xs={12}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker label="Date" />
          </DemoContainer>
        </LocalizationProvider>
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          id="totalAmount"
          label="Total Amount"
          name="totalAmount"
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          id="paidAmount"
          label="Paid Amount"
          name="paidAmount"
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          id="balanceAmount"
          label="Balance Amount"
          name="balanceAmount"
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
const DeleteAction = (data) => {
  return (
    <div>
      <center>
        <h4>Do you want delete?</h4>
      </center>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <Button>Delete</Button>
        <Button autoFocus>Cancel</Button>
      </div>
    </div>
  );
};
export default Rental_products_view;
