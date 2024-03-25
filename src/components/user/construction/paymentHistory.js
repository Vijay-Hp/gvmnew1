import React, { useState, useContext } from "react";
import Container from "react-bootstrap/Container";
import { Row, Col } from "react-bootstrap";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import "../style.js";
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
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";
import CustomTable from "./CustomTable/index.js";
import CustomizedSearchBox from "./searchBox.js";
import FilterListIcon from "@mui/icons-material/FilterList";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

function PaymentHistory() {
  const breadcrumbs = [
    <Link underline="hover" key="1" color="white">
      Constructions
    </Link>,
    <Link underline="hover" key="2" color="white">
      Payment History
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
            <Grid
              container
              style={{ display: "flex", alignItems: "center" }}
              spacing={2}
              pb={2}
            >
              <Grid item xs={6}>
                <CustomizedSearchBox />
              </Grid>
              <Grid item xs={2}>
                <FilterListIcon
                  style={{
                    backgroundColor: "#BABAEF",
                    color: "white",
                    height: "36px",
                    width: "36px",
                    borderRadius: "4px",
                  }}
                />
              </Grid>
              <Grid
                item
                xs={4}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "16px",
                }}
              >
                <Button
                  variant="outlined"
                  startIcon={<ArrowDownwardIcon />}
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    textTransform: "none",
                  }}
                >
                  Download
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<AddCircleOutlineIcon />}
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    textTransform: "none",
                  }}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
            <Grid container spacing={4}>
              <Grid item xs={4} xsOffset={6}>
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
            </Grid>
            <CustomTable tableData={MENU_TABLE_DATA} apiData={apiTableData} />
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
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default PaymentHistory;
