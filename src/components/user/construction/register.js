import React, { useState, useContext } from "react";
import Container from "react-bootstrap/Container";
import { Row, Col, Form } from "react-bootstrap";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import "../style.js";
import { Id, Name, Btn } from "../../Input.js";
import { useNavigate } from "react-router-dom";
import { dataContext } from "../../context/DataContext.jsx";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Grid } from "@mui/material";

function ConstructionRegister() {
  const breadcrumbs = [
    <Link underline="hover" key="1" color="white">
      Constructions
    </Link>,
    <Link underline="hover" key="2" color="white">
      Registration
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
                  name="Construction Id"
                  handleDataChange={handleDataChange}
                  textboxName="employee_id"
                />
                <Name
                  name="Building Name"
                  handleDataChange={handleDataChange}
                  textboxName="employee_name"
                />
                <Name
                  name="Manager Name "
                  handleDataChange={handleDataChange}
                  textboxName="employee_name"
                />
                <Name
                  name="Total Workers"
                  handleDataChange={handleDataChange}
                  textboxName="employee_name"
                />
                <Name
                  name="Total Amount"
                  handleDataChange={handleDataChange}
                  textboxName="employee_name"
                />
                <Name
                  name="Date "
                  handleDataChange={handleDataChange}
                  textboxName="employee_name"
                />
                <Name
                  name="Mobile Number"
                  handleDataChange={handleDataChange}
                  textboxName="employee_name"
                />
                <Name
                  name="Location"
                  handleDataChange={handleDataChange}
                  textboxName="employee_name"
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
              <Grid item xs={8}>
                <Button
                  variant="outlined"
                  style={{
                    backgroundColor: "#BABAEF",
                    color: "black",
                    textTransform: "none",
                  }}
                  fullWidth
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default ConstructionRegister;
