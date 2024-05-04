import React, { useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Container from "react-bootstrap/Container";
import { Row, Col, Button, Form } from "react-bootstrap";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Table from "react-bootstrap/Table";
import AddIcon from "../icons/add-icon.svg";
import UpdateIcon from "../icons/update-icon.svg";
import DeleteIcon from "@mui/icons-material/Delete";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import "./style.js";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Topbutton, Topbutton1 } from "./Input.js";

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

function RegisterExist() {
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit">
      Purchase
    </Link>,
    <Link underline="hover" key="2" color="white">
      View Purchase
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
      email:selectedVal?.email
    }
    // console.log(payload);
    await axios.post(`https://vebbox.in/gvmbackend/controllers/api/delete/userDelete.php`,payload).then(res=>{
      if(res.data.message==="deleted"){
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
        "https://vebbox.in/gvmbackend/controllers/api/get/viewUser.php"
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
      {/* <div
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
          </Row>
        </Container>
      </div> */}
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
              <NavLink to="/register" className="ul">
              <Topbutton1 topname="Add User" />
              </NavLink>
            </Col>
            <Col xs={12} md={8} lg={6} className="d-grid gap-2 mt-5">
              <NavLink to="/register_exist" className="ul">
              <Topbutton topname="Already Exist" />
              </NavLink>
            </Col>
          </Row>
        </Container>
      </div>
      <Row>
  <Col xs={12} md={8} lg={{span:6,offset:3}} className="d-grid gap-2 mt-5">
    <div style={{ overflowX: "auto", maxWidth: "100%" }}>
      <Table bordered className="table-center">
        <thead>
          <tr>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {purchaseData.map((purchase) => (
            <tr key={purchase.email}>
              <td>{purchase.email}</td>
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
    </>
  );
}
export default RegisterExist;
