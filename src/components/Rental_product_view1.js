import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { Row, Col, Button, Form } from 'react-bootstrap';
import Pro1 from '../assets/rental.jpg';
import Start from './Start';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Image from 'react-bootstrap/Image';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const buttonStyle = {
  backgroundColor: '#232135', 
  color: '#ffffff',
  border:'none',
  width:'100%'
};
const buttonStyle1 = {
  backgroundColor: '#232135', 
  color: '#ffffff',
  // border:'none',
  width:'100%'
};
const formStyle = {
  backgroundColor: '#232135',
  color: 'white',
  border: 'none',
};

function Rental_products_view1() {
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit">
      Rental Products  
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="white"
      
    >
     View Products
    </Link>
  ];
  return (
    <>
      <div style={{ backgroundColor: '#3d3b52', borderRadius: '20px', paddingBottom: '50px' }}>
        <Container fluid>
          <Row>
          <Stack spacing={3} style={{marginTop:'30px'}}>
              <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">          
                {breadcrumbs}
              </Breadcrumbs>
         </Stack>
         <Col xs={12} md={8} lg={4} className="d-grid gap-2 mt-5">
            <NavLink to="/rental_products_view" activeClassName="activeButtonStyle">
            <ArrowBackIcon style={{color:'white',size:'30px'}}/>
            </NavLink>
            </Col>
          </Row>
        </Container>
      </div>
      
         <div style={{ backgroundColor: '#3d3b52', borderRadius: '20px', paddingBottom: '50px', marginTop: '2px' }}>
          <Container style={{padding:"25px"}} >
            <Row>
              <Col xs={12} md={8} lg={{ span: 8, offset: 4 }} className="d-flex justify-content-between mt-3" style={{color:'white'}}>
                <p className="flex-grow-1">Total Quantity: 1000</p>
                <p className="flex-grow-1">In Stock: 100</p>
                </Col>
            </Row>
            
            <Row  style={{ backgroundColor: '#232135', maxHeight: '400px', borderRadius: '15px', padding: '5px' }}>
             <Col xs={5} md={8} lg={{ span: 4, offset:1 }}  >
             <div className="p-3  mt-1 "  >
                <img src={Pro1} style={{height:'200px',width:'200px'}}/>
             </div>
            </Col>
            <Col xs={3} md={8} lg={{ span: 3}} >
                <p style={{color:'#f43984'}}>Product Quantity</p>        
                <p style={{color:'white'}}>200</p>
                <p style={{color:'#f43984'}}>Days</p>        
                <p style={{color:'white'}}>5</p>
                <p style={{color:'#f43984'}}>From</p>        
                <p style={{color:'white'}}>01/01/2024</p>
                <p style={{color:'#f43984'}}>To</p>        
                <p style={{color:'white'}}>04/01/2024</p>
            </Col>
            <Col xs={3} md={8} lg={{ span: 3}} style={{marginTop:'220px'}}>
                <p style={{color:"white",fontSize:'20px'}}>Product Id:200345643</p>        
                <Button size="lg" variant="primary" className="w-100" style={{color:'black',backgroundColor:'White',fontSize:'15px'}}>Total Amount:2000</Button>
            </Col>
            </Row>

            <Row  style={{ backgroundColor: '#232135', maxHeight: '400px', borderRadius: '15px', padding: '10px',marginTop:'20px' }}>
             <Col xs={5} md={8} lg={{ span: 4, offset:1 }}  >
             <div className="p-3  mt-1 "  >
                <img src={Pro1} style={{height:'200px',width:'200px'}}/>
             </div>
            </Col>
            <Col xs={3} md={8} lg={{ span: 3}}>
                <p style={{color:'#f43984'}}>Product Quantity</p>        
                <p style={{color:'white'}}>200</p>
                <p style={{color:'#f43984'}}>Days</p>        
                <p style={{color:'white'}}>5</p>
                <p style={{color:'#f43984'}}>From</p>        
                <p style={{color:'white'}}>01/01/2024</p>
                <p style={{color:'#f43984'}}>To</p>        
                <p style={{color:'white'}}>04/01/2024</p>
            </Col>
            <Col xs={3} md={8} lg={{ span: 3}} style={{marginTop:'220px'}}>
                <p style={{color:"white",fontSize:'20px'}}>Product Id:200345643</p>        
                <Button size="lg" variant="primary" className="w-100" style={{color:'black',backgroundColor:'White',fontSize:'15px'}}>Total Amount:2000</Button>
            </Col>
            </Row>
          </Container>
        </div> 
    </>
  );
}
export default Rental_products_view1;