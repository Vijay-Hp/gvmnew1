import React, { useState, useContext } from "react";
import Container from "react-bootstrap/Container";
import { Row, Col, Button, Form } from "react-bootstrap";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {
  Id,
  Name,
  Radio,
  No,
  Btn,
  Nopoint,
  Place,
  Date,
  Topbutton,
  Topbutton1,
  Radio1,
} from "./Input.js";
import { useNavigate } from "react-router-dom";
import { dataContext } from "./context/DataContext.jsx";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Add_vehicle() {
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit">
      Vehicle
    </Link>,
    <Link underline="hover" key="2" color="white">
      Add Vehicle
    </Link>,
  ];

  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  const { purchaseData, setPurchaseData } = useContext(dataContext);

  console.log("purchaseData", purchaseData);

  const handleDataChange = (e) => {
    const newData = {
      ...purchaseData,
      [e.target.name]: e.target.value,
    };
    setPurchaseData(newData);
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const newData = {
        vehicle_no: purchaseData.vehicle_no,
        chassis_no: purchaseData.chassis_no,
        vehicle_model: purchaseData.vehicle_model,
        fc_amount: purchaseData.fc_amount,
        fc_date: purchaseData.fc_date,
        tax: purchaseData.tax,
        insurance_date: purchaseData.insurance_date,
        permit: purchaseData.permit,
        pollution: purchaseData.pollution,
        fuel_type: purchaseData.fuel_type,
      };

      console.log(newData);

      axios
        .post(
          "http://localhost/GVM_Backend/controllers/api/post/addVehicleDetails.php",
          newData
        )
        .then((response) => {
          console.log("Data sent successfully:", response.data);
          toast.success("Data Insert Successfully!");
        })
        .catch((error) => {
          console.error("Error sending data:", error);
        });
    }

    setValidated(true);
  };

  return (
    <>
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
              style={{ marginTop: "20px", paddingBottom: "100px" }}
            >
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="validationCustom01"
                >
                  <Id
                    name="Vehicle No"
                    handleDataChange={handleDataChange}
                    textboxName="vehicle_no"
                  />
                  <Id
                    name="Chassis No"
                    handleDataChange={handleDataChange}
                    textboxName="chassis_no"
                  />
                  <Id
                    name="Vehicle Model"
                    handleDataChange={handleDataChange}
                    textboxName="vehicle_model"
                  />
                  <Id
                    name="FC Amount"
                    handleDataChange={handleDataChange}
                    textboxName="fc_amount"
                  />
                  <Date
                    name="FC Date"
                    handleDataChange={handleDataChange}
                    textboxName="fc_date"
                  />
                  <Id
                    name="Tax"
                    handleDataChange={handleDataChange}
                    textboxName="tax"
                  />
                  <Date
                    name="Insurance Renewal Date"
                    handleDataChange={handleDataChange}
                    textboxName="insurance_date"
                  />
                  <Id
                    name="Permit"
                    handleDataChange={handleDataChange}
                    textboxName="permit"
                  />
                  <Id
                    name="Pollution"
                    handleDataChange={handleDataChange}
                    textboxName="pollution"
                  />
                  <Radio1
                    name="Fuel Type"
                    name1="fuel_type"
                    label1="Petrol"
                    label2="Diesel"
                    value1="Petrol"
                    value2="Diesel"
                    handleDataChange={handleDataChange}
                    textboxName="fuel_type"
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
    </>
  );
}
export default Add_vehicle;
