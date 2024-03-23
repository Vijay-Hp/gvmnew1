import React, { useState, useEffect,useContext } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Container from 'react-bootstrap/Container';
import { Row, Col, Button, Form } from 'react-bootstrap';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Table from 'react-bootstrap/Table';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import '../style.js';
import { Id, Name, Radio, No, Btn, Topbutton, Topbutton1 } from "../Input.js";
import { dataContext } from "../context/DataContext.jsx";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.common.white,
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'black',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'black',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));


function UserAdd_construction() {
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit">
      Constructions
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="white"
    >
      Add Details
    </Link>
  ];
 // navigate submit button
 const [validated, setValidated] = useState(false);
 const navigate = useNavigate();
 const { purchaseData, setPurchaseData } = useContext(dataContext);
 const [age, setAge] = useState("");
 const [type, setType] = useState("");
 console.log("purchaseData", purchaseData);

 const handleDataChange = (e) => {
   const { name, value } = e.target;
   if (name === "category") 
   {
     setPurchaseData({
       ...purchaseData,
       [name]: value,
     });
     setAge(value);
   }
   if (name === "type") 
   {
     setPurchaseData({
       ...purchaseData,
       [name]: value,
     });
     setType(value);
   } 
   else 
   {
     setPurchaseData({
       ...purchaseData,
       [name]: value,
     });
   }
 };

 const handleSubmit = (event) => {
  event.preventDefault();

  const form = event.currentTarget;
  if (form.checkValidity() === false) {
    event.stopPropagation();
  } else {
    navigate("/user_addconstructionsempsal");
  }

  setValidated(true);
};
  return (
    <>
      <div style={{ backgroundColor: '#3d3b52', borderRadius: '20px', paddingBottom: '50px' }}>
        <Container fluid>
          <Row>
            <Stack spacing={3} style={{ marginTop: '30px' }}>
              <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                {breadcrumbs}
              </Breadcrumbs>
            </Stack>

            <Col xs={12} md={8} lg={4} className="d-grid gap-2 mt-5">
              <NavLink to="/user_addconstructions" className="ul">
                <Topbutton topname="Add Details" />
              </NavLink>
            </Col>

            <Col xs={12} md={8} lg={4} className="d-grid gap-2 mt-5">
              <NavLink to="/user_addconstructionsempsal" className="ul">
                <Topbutton1 topname="Employee Salary" />
              </NavLink>
            </Col>

            <Col xs={12} md={8} lg={4} className="d-grid gap-2 mt-5">
              <NavLink to="/user_viewconstructions" className="ul">
                <Topbutton1 topname="View Details" />
              </NavLink>
            </Col>

          </Row>
        </Container>
      </div>


      <div style={{ backgroundColor: '#3d3b52', borderRadius: '20px', paddingBottom: '80px', marginTop: '2px' }}>
        <Container fluid>
          <Row >
            <Col xs={12} md={8} lg={{ span: 6, offset: 3 }} className="d-grid gap-2 mt-3">
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="validationCustom01"
                >
                  <Name
                    name="Building Name"
                    handleDataChange={handleDataChange}
                    textboxName="building_name"
                  />
                  <Name
                    name="Manager Name"
                    handleDataChange={handleDataChange}
                    textboxName="manager_name"
                  />
                  <No
                    name="Total Workers"
                    handleDataChange={handleDataChange}
                    textboxName="total_workers"
                  />
                  <No
                    name="Total Amount"
                    handleDataChange={handleDataChange}
                    textboxName="total_amount"
                  />
                  <Name
                    name="Location"
                    handleDataChange={handleDataChange}
                    textboxName="location"
                  />
                  <Btn btn="Submit" />
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>

    </>
  );
}
export default UserAdd_construction;