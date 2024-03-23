import React, { useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Container from "react-bootstrap/Container";
import { Row, Col, Button, Form } from "react-bootstrap";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "../icons/add-icon.svg";
import UpdateIcon from "../icons/update-icon.svg";
import InputBase from "@mui/material/InputBase";
import Table from "react-bootstrap/Table";
import View_sales from "./View_sales";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import {
  Topbutton1,
  Topbutton,
} from "./Input.js";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Card from "react-bootstrap/Card";
import DeleteIcon from "@mui/icons-material/Delete";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.common.white,
  "&:hover": {
    backgroundColor: theme.palette.common.white,
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "black",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "black",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

function General_entry() {
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit">
      General Entry
    </Link>,
    <Link underline="hover" key="2" color="white">
      Purchase
    </Link>,
  ];
  const [showPurchaseForm, setShowPurchaseForm] = useState(false);
  const [showQuitForm, setShowQuitForm] = useState(false);
  const [selectedVal,setSelectedVal] = useState({})
  const handlePurchaseButtonClick = (val) => {
    if (val === "purchase") {
      setShowPurchaseForm(false);
      setShowQuitForm(false);
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
      purchaseId:selectedVal?.purchase_id
    }
    // console.log(payload);
    await axios.post(`http://localhost/GVM_Backend/controllers/api/delete/purchaseDelete.php`,payload).then(res=>{
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
        "http://localhost/GVM_Backend/controllers/api/get/viewPurchase.php"
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
            <Col xs={12} md={8} lg={6} className="d-grid gap-2 mt-5">
              <NavLink to="/general_entry" className="ul">
                <Topbutton topname="Purchase" />
              </NavLink>
            </Col>
            <Col xs={12} md={8} lg={6} className="d-grid gap-2 mt-5">
              <NavLink to="/general_entry_sales" className="ul">
                <Topbutton1 topname="Sales" />
              </NavLink>
            </Col>
          </Row>

          <Row>
            <Col xs={12} md={8} lg={6} className="d-grid gap-2 mt-5">
              <Search className="search" style={{ position: "absolute" }}>
                <SearchIconWrapper>
                  <SearchIcon className="search-icon" />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                  style={{ width: "450px" }}
                />
              </Search>
            </Col>
            <Col
              xs={12}
              md={8}
              lg={3}
              className="d-grid gap-2 mt-5 text-center"
            >
              <NavLink to="/update_purchase" className="ul">
                <Button
                  size="lg"
                  style={{
                    backgroundColor: "#babaef",
                    color: "black",
                    width: "100%",
                  }}
                >
                  <img
                    src={UpdateIcon}
                    alt="update icon"
                    className="updatebtn"
                  />
                  Update
                </Button>
              </NavLink>
            </Col>
            <Col
              xs={12}
              md={8}
              lg={3}
              className="d-grid gap-2 mt-5 text-center"
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
            <Col xs={12} md={8} lg={12} className="d-grid gap-2 mt-5">
            <div style={{ overflowX: "auto", maxWidth: "100%" }}>
      <Table bordered className="table-center">
        <thead>
          <tr>
            <th>purchase_id</th>
            <th>vendor_type</th>
            <th>vendor_name</th>
            <th>product_name</th>
            <th>product_quantity</th>
            <th>total_amount</th>
            <th>total_amount1</th>
            <th>paid_amount</th>
            <th>balance_amount</th>
            <th>payment_method</th>
            <th>payment_mode</th>
            <th>payment_type</th>
            <th>vehicle_no</th>
            <th>driver_name</th>
            <th>fuel_liter</th>
            <th>fuel_amount</th>
            <th>location</th>
            <th>date</th>
            <th>wages</th>
            <th>wages_type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {purchaseData.map((purchase) => (
            <tr key={purchase.purchase_id}>
              <td>{purchase.purchase_id}</td>
              <td>{purchase.vendor_type}</td>
              <td>{purchase.vendor_name}</td>
              <td>{purchase.product_name}</td>
              <td>{purchase.product_quantity}</td>
              <td>{purchase.total_amount}</td>
              <td>{purchase.total_amount1}</td>
              <td>{purchase.paid_amount}</td>
              <td>{purchase.balance_amount}</td>
              <td>{purchase.payment_method}</td>
              <td>{purchase.payment_mode}</td>
              <td>{purchase.payment_type}</td>
              <td>{purchase.vehicle_no}</td>
              <td>{purchase.driver_name}</td>
              <td>{purchase.fuel_liter}</td>
              <td>{purchase.fuel_amount}</td>
              <td>{purchase.location}</td>
              <td>{purchase.date}</td>
              <td>{purchase.wages}</td>
              <td>{purchase.wages_type}</td>
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
export default General_entry;
