import React, { useState, useEffect, useContext } from "react";
import Container from "react-bootstrap/Container";
import { Row, Col, Button, Form } from "react-bootstrap";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import "./style.js";
import { NavLink, useNavigate } from "react-router-dom";
import { Id, Name, Radio, No, Btn, Date } from "./Input.js";
import { dataContext } from "./context/DataContext.jsx";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Update_vehicle() {
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit">
      Vechicle
    </Link>,
    <Link underline="hover" key="2" color="white">
      Update Vechicle
    </Link>,
  ];

  const [validated, setValidated] = useState(false);
  const [record, setRecord] = useState({});
  const navigate = useNavigate();
  const { purchaseData, setPurchaseData } = useContext(dataContext);
  console.log("purchaseData", purchaseData);

  const handleDataChange = (e) => {
    const { name, value } = e.target;
    setPurchaseData({
      ...purchaseData,
      [e.target.name]: e.target.value,
    });

    //textbox value change in after fetch
    setRecord((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    //radio button after change fetch
    if (name === "fuel_type") {
      setRecord((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      setPurchaseData({
        ...purchaseData,
        [name]: value,
      });
    }
  };
  // new fetch form data
  const handleFetchData = async () => {
    try {
      const payload = {
        vehicleNo: purchaseData?.vehicle_no,
      };
      const url =
        "https://vebbox.in/gvmbackend/controllers/api/get/fetch_VehicleDetails.php";
      const response = await axios.post(url, payload);
      const data = response.data;
      const info = data?.length ? data[0] : "";
      const { vehicle_no = "" } = info;
      console.log(info);
      if (vehicle_no) {
        setRecord(info);
        setPurchaseData((prevData) => ({ ...prevData, ...info }));
      }
    } catch (err) {
      console.log(err);
    }
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
        rcbook_no: purchaseData.rcbook_no,
        fc_no: purchaseData.fc_no,
        fc_amount: purchaseData.fc_amount,
        fc_date: purchaseData.fc_date,
        insurance_renewal: purchaseData.insurance_renewal,
        insurance_date: purchaseData.insurance_date,
        fuel_type: purchaseData.fuel_type,
      };
      toast.success("Data Update Successfully!");
      console.log(newData);

      axios
        .post(
          "https://vebbox.in/gvmbackend/controllers/api/put/updateVehicle.php",
          newData
        )
        .then((response) => {
          console.log("Data sent successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error sending data:", error);
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
            style={{ marginTop: "100px", paddingBottom: "100px" }}
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
                <Btn btn="Fetch" btnEvent={handleFetchData} />
                <Id
                  name="Chassis No"
                  handleDataChange={handleDataChange}
                  textboxName="chassis_no"
                  value={record?.chassis_no}
                />
                <Id
                  name="Vehicle Model"
                  handleDataChange={handleDataChange}
                  textboxName="vehicle_model"
                  value={record?.vehicle_model}
                />
                <Id
                  name="RC Book No"
                  handleDataChange={handleDataChange}
                  textboxName="rcbook_no"
                  value={record?.rcbook_no}
                />
                <Id
                  name="FC No"
                  handleDataChange={handleDataChange}
                  textboxName="fc_no"
                  value={record?.fc_no}
                />
                <Id
                  name="FC Amount"
                  handleDataChange={handleDataChange}
                  textboxName="fc_amount"
                  value={record?.fc_amount}
                />
                <Date
                  name="FC Date"
                  handleDataChange={handleDataChange}
                  textboxName="fc_date"
                  value={record?.fc_date}
                />
                <Id
                  name="Insurance Renewal"
                  handleDataChange={handleDataChange}
                  textboxName="insurance_renewal"
                  value={record?.insurance_renewal}
                />
                <Date
                  name="Insurance Renewal Date"
                  handleDataChange={handleDataChange}
                  textboxName="insurance_date"
                  value={record?.insurance_date}
                />
                <Radio
                  name="Fuel Type"
                  name1="fuel_type"
                  label1="Petrol"
                  label2="Diesel"
                  value1="Petrol"
                  value2="Diesel"
                  handleDataChange={handleDataChange}
                  textboxName="fuel_type"
                  choose={record.fuel_type}
                />
                <Btn btn="Update" />
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default Update_vehicle;
