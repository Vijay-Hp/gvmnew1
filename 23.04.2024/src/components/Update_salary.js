import React, { useState, useEffect, useContext } from "react";
import Container from "react-bootstrap/Container";
import { Row, Col, Button, Form } from "react-bootstrap";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import "./style.js";
import { Id, Name, Radio, No, Btn, Radiothree, Dropdown, Radiothree1, Radio1, Radio2 } from "./Input.js";
import { NavLink, useNavigate } from "react-router-dom";
import { dataContext } from "./context/DataContext.jsx";
import axios from "axios";

function Update_salary() {
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit">
      Vechicle
    </Link>,
    <Link underline="hover" key="2" color="white">
      Update Salary
    </Link>,
  ];
  // navigate submit button
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
    setRecord(prevState => ({
      ...prevState,
      [name]: value
    }));
//radio button after change fetch 
   if (name === "wages_type" || name === "payment_method") {
    setRecord(prevState => ({
      ...prevState,
      [name]: value
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
            employeeId: purchaseData?.employee_id
        };
        const url = "https://vebbox.in/gvmbackend/controllers/api/get/fetch_SalaryDetails.php";
        const response = await axios.post(url, payload);
        const data = response.data;
        const info = data?.length ? data[0] : '';
        const { employee_id = ''} = info;
        console.log(info);
        if (employee_id) {
            setRecord(info);
            setPurchaseData(prevData => ({...prevData, ...info}));
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
        employee_id: purchaseData.employee_id,
        employee_name: purchaseData.employee_name,
        wages_type: purchaseData.wages_type,
        salary_amount: purchaseData.salary_amount,
        balance_amount: purchaseData.balance_amount,
        payment_method: purchaseData.payment_method,
      };

      console.log(newData);

      axios
        .post(
          "https://vebbox.in/gvmbackend/controllers/api/put/updateSalary.php",
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
                <Btn btn="Fetch" btnEvent={handleFetchData}/>
                <Name
                  name="Employee Name"
                  handleDataChange={handleDataChange}
                  textboxName="employee_name"
                  value={record?.employee_name}
                />
              <Radiothree
                  name="Wages Type"
                  name1="wages_type"
                  label1="Daily"
                  label2="Weekly" 
                  label3="Monthly"
                  value1="Daily"
                  value2="Weekly"
                  value3="Monthly"
                  handleDataChange={handleDataChange}
                  textboxName="wages_type"
                  choose1={record?.wages_type}
                />
                <No
                  name="Salary Amount"
                  handleDataChange={handleDataChange}
                  textboxName="salary_amount"
                  value={record?.salary_amount}
                />
                <Id
                  name="Balance Amount"
                  handleDataChange={handleDataChange}
                  textboxName="balance_amount"
                  value={record?.balance_amount}
                />
                <Radio
                    name="Payment Method"
                    name1="payment_method"
                    label1="Cash"
                    label2="Online Transaction"
                    value1="Cash"
                    value2="Online Transaction"
                    handleDataChange={handleDataChange}
                    textboxName="payment_method"
                    choose={record?.payment_method}
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
export default Update_salary;

