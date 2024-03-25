import React, { useState, useContext } from "react";
import Container from "react-bootstrap/Container";
import { Row, Col, Form } from "react-bootstrap";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import "../style.js";
import { Name, Btn } from "../../Input.js";
import { useNavigate } from "react-router-dom";
import { dataContext } from "../../context/DataContext.jsx";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import CustomTable from "./CustomTable/index.js";

function ConstructionAddExpenses() {
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
  const navigate = useNavigate(); // Use useNavigate to get the navigate function
  const { purchaseData, setPurchaseData } = useContext(dataContext);

  const handleDataChange = (e) => {
    setPurchaseData({
      ...purchaseData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const newData = {
        employee_id: purchaseData.employee_id,
        mobile_no: purchaseData.mobile_no,
        employee_name: purchaseData.employee_name,
        wages_type: purchaseData.wages_type,
        salary_amount: purchaseData.salary_amount,
        paid_amount: purchaseData.paid_amount,
        payment_method: purchaseData.payment_method,
      };

      console.log(newData);

      axios
        .post(
          "http://localhost/GVM_Backend/controllers/api/post/addSalaryDetails.php",
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
    }

    setValidated(true);
  };
  const [apiTableData, setApiTableData] = useState([]);
  const MENU_TABLE_DATA = [
    {
      field: "si_no",
      label: "SI.No.",
    },
    {
      field: "description",
      label: "Description",
    },
    {
      field: "comment",
      label: "Comment",
    },
    {
      field: "amount",
      label: "Amount",
    },
    {
      field: "qty",
      label: "Qty",
    },
    {
      field: "totalCost",
      label: "Total cost",
    },
    {
      field: "action",
      label: "Action",
    },
  ];
  return (
    <div
      style={{
        backgroundColor: "#3d3b52",
        borderRadius: "20px",
        paddingBottom: "50px",
        marginTop: "2px",
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
          <Col
            xs={12}
            md={8}
            lg={{ span: 6, offset: 1 }}
            className="d-grid gap-2"
            style={{ marginTop: "50px", paddingBottom: "80px" }}
          >
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="validationCustom01"
              >
                <Grid container spacing={4}>
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Choose Building
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Choose Building"
                        style={{ backgroundColor: "white" }}
                      >
                        <MenuItem value={10}>Choose Building 1</MenuItem>
                        <MenuItem value={20}>Choose Building 2</MenuItem>
                        <MenuItem value={30}>Choose Building 3</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Choose Expense Type
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Choose Expense Type"
                        style={{ backgroundColor: "white" }}
                      >
                        <MenuItem value={10}>Choose Expense Type 1</MenuItem>
                        <MenuItem value={20}>Choose Expense Type 2</MenuItem>
                        <MenuItem value={30}>Choose Expense Type 3</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={6}>
                    <Name
                      name="Location"
                      handleDataChange={handleDataChange}
                      textboxName="employee_id"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Name
                      name="Date"
                      handleDataChange={handleDataChange}
                      textboxName="employee_name"
                    />
                  </Grid>
                </Grid>

                <Grid container>
                  <Grid item xs={6}>
                    <Name
                      name="Description"
                      handleDataChange={handleDataChange}
                      textboxName="employee_name"
                    />
                    <Name
                      name="Comment"
                      handleDataChange={handleDataChange}
                      textboxName="employee_name"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Name
                      name="Amount"
                      handleDataChange={handleDataChange}
                      textboxName="employee_name"
                    />
                    <Name
                      name="Quantity"
                      handleDataChange={handleDataChange}
                      textboxName="employee_name"
                    />
                  </Grid>
                  <Grid
                    item
                    xs={10}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      paddingTop: "20px",
                    }}
                  >
                    <Button
                      variant="outlined"
                      style={{
                        backgroundColor: "#BABAEF",
                        color: "black",
                        textTransform: "none",
                      }}
                    >
                      Add To Table
                    </Button>
                  </Grid>
                </Grid>
                <CustomTable
                  tableData={MENU_TABLE_DATA}
                  apiData={apiTableData}
                />

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
            <Grid
              container
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              {/* <Grid item xs={12}>
                <Button
                  variant="outlined"
                  style={{
                    backgroundColor: "#BABAEF",
                    color: "black",
                    textTransform: "none",
                  }}
                  fullWidth
                >
                  + Add Row
                </Button>
              </Grid> */}
            </Grid>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default ConstructionAddExpenses;
