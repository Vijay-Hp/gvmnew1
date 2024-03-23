import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { Row, Col, Button, Form } from "react-bootstrap";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Topbutton, Topbutton1 } from "./Input";
import Card from "react-bootstrap/Card";
import "./style.js";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import DeleteIcon from "@mui/icons-material/Delete";

function Add_construction_view() {
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit">
      Constructions
    </Link>,
    <Link underline="hover" key="2" color="white">
      View Details
    </Link>,
  ];

  const [showPurchaseForm, setShowPurchaseForm] = useState(false);
  const [showQuitForm, setShowQuitForm] = useState(false);
  const [selectedVal,setSelectedVal] = useState({})
  const handlePurchaseButtonClick = (val) => {
    if (val === "purchase") {
      setShowPurchaseForm(false);
      setShowQuitForm(false);
    } else if (val === "payment") {
      setShowPurchaseForm(false);
      setShowQuitForm(true);
    }
  };

  // useEffect to set the initial state
  useEffect(() => {
    setShowPurchaseForm(true);
    setShowQuitForm(false);
  }, []); // Empty dependency array ensures that this effect runs only once after the initial render

  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    setIsModalOpen(false);
  };

// deletesection
const deleteData=async()=>{
  let payload={
    buildingName:selectedVal?.building_name
  }
  // console.log(payload);
  await axios.post(`http://localhost/GVM_Backend/controllers/api/delete/constructionDelete.php`,payload).then(res=>{
    if(res.data.message==="deleted"){
      // alert("deleted succussfully");
      toast.success("Deleted Successfully!");
      setShowPurchaseForm(true);
      setShowQuitForm(true);
      fetchData()
    }
  }).catch(err=>{
    console.log(err);
  })
}

  const handleCancelClick = () => {
    setShowPurchaseForm(true);
    setShowQuitForm(false);
  };

  // fetch axios
  const [purchaseData, setPurchaseData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost/GVM_Backend/controllers/api/get/viewConstruction.php"
      );
      setPurchaseData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
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
            <Col xs={12} md={8} lg={4} className="d-grid gap-2 mt-5">
              <NavLink to="/add_construction" className="ul">
                <Topbutton1 topname="Add Details" />
              </NavLink>
            </Col>
            <Col xs={12} md={8} lg={4} className="d-grid gap-2 mt-5">
              <NavLink to="/add_construction_empsalary" className="ul">
                <Topbutton1 topname="Employee Salary" />
              </NavLink>
            </Col>
            <Col xs={12} md={8} lg={4} className="d-grid gap-2 mt-5">
              <NavLink to="/add_construction_view" className="ul">
                <Topbutton topname="View Details" />
              </NavLink>
            </Col>
          </Row>
        </Container>
      </div>

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
            <Col xs={12} md={8} lg={12} className="d-grid gap-2 mt-5">
            <div style={{ overflowX: "auto", maxWidth: "100%" }}>
      <Table bordered className="table-center">
        <thead>
          <tr>
          <th>Building Name</th>
          <th>Manager Name</th>
          <th>Total Workers</th>
          <th>Total Amount</th>
          <th>Location</th>
          <th>Category</th>
          <th>Type</th>
          <th>Salary Amount</th>
          <th>Payment Method</th>
          <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {purchaseData.map((purchase) => (
            <tr key={purchase.building_name}>

              <td>{purchase.building_name}</td>
              <td>{purchase.manager_name}</td>
              <td>{purchase.total_workers}</td>
              <td>{purchase.total_amount}</td>
              <td>{purchase.location}</td>
              <td>{purchase.category}</td>
              <td>{purchase.type}</td>
              <td>{purchase.salary_amount}</td>
              <td>{purchase.payment_method}</td>
              <td>
                <button
                  style={{ border: "none", backgroundColor: "inherit" }}
                  onClick={() =>{ handlePurchaseButtonClick("purchase");setSelectedVal(purchase)}}
                >
                  <DeleteIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
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
        </Container>
      </div>
    </>
  );
}
export default Add_construction_view;
