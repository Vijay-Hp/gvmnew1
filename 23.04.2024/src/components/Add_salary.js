import React, { useState, useEffect, useContext } from "react";
import Container from "react-bootstrap/Container";
import { Row, Col, Button, Form } from "react-bootstrap";
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
  Dropdown,
  Radiothree,
  Radiothree1,
  Radio1,
  Mbl,
} from "./Input.js";
import { NavLink, useNavigate } from "react-router-dom";
import { dataContext } from "./context/DataContext.jsx";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function Add_salary() {
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit">
      Vechicle
    </Link>,
    <Link underline="hover" key="2" color="white">
      Add Salary
    </Link>,
  ];

  // navigate submit button
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate(); // Use useNavigate to get the navigate function
  const { purchaseData, setPurchaseData } = useContext(dataContext);

  console.log("purchaseData", purchaseData);

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
            lg={{ span: 6, offset: 3 }}
            className="d-grid gap-2"
            style={{ marginTop: "50px", paddingBottom: "80px" }}
          >
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="validationCustom01"
              >
                <Id
                  name="Employee Id"
                  handleDataChange={handleDataChange}
                  textboxName="employee_id"
                />
                <Mbl
                  name="Mobile Number"
                  handleDataChange={handleDataChange}
                  textboxName="mobile_no"
                />
                <Name
                  name="Employee Name"
                  handleDataChange={handleDataChange}
                  textboxName="employee_name"
                />
                <Radio1
                  name="Wages Type"
                  name1="wages_type"
                  label1="Daily"
                  label2="Weekly"
                  value1="Daily"
                  value2="Weekly"
                  handleDataChange={handleDataChange}
                  textboxName="wages_type"
                />
                <No
                  name="Salary Amount"
                  handleDataChange={handleDataChange}
                  textboxName="salary_amount"
                />
                <Id
                  name="Paid Amount"
                  handleDataChange={handleDataChange}
                  textboxName="paid_amount"
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
                <Btn btn="Submit" />
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
      </Container>
    </div>
  );
}
export default Add_salary;
