import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { Row, Col, Button, Form } from 'react-bootstrap';
import Pro1 from './assets/pro1.webp';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Image from 'react-bootstrap/Image';

const buttonStyle = {
  backgroundColor: '#232135',
  color: '#ffffff',
  border: 'none',
  width: '100%'
};
const buttonStyle1 = {
  backgroundColor: '#232135',
  color: '#ffffff',
  // border:'none',
  width: '100%'
};
const formStyle = {
  backgroundColor: '#232135',
  color: 'white',
  border: 'none',
};

function UserRental_products_view() {
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
            <Stack spacing={3} style={{ marginTop: '30px' }}>
              <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                {breadcrumbs}
              </Breadcrumbs>
            </Stack>
            <Col xs={12} md={8} lg={4} className="d-grid gap-2 mt-5">
              <NavLink to="/user_rentalproducts" className="ul">
                <Button size="lg" style={buttonStyle} >
                  Add Products
                </Button>
              </NavLink>
            </Col>

            <Col xs={12} md={8} lg={4} className="d-grid gap-2 mt-5">
              <NavLink to="/user_rentalviewproducts" className="ul">
                <Button size="lg" style={buttonStyle1} >
                  View Products
                </Button>
              </NavLink>
            </Col>

            <Col xs={12} md={8} lg={4} className="d-grid gap-2 mt-5">
              <NavLink to="/user_rentalupdateproducts" className="ul">
                <Button size="lg" style={buttonStyle} >
                  Update Products
                </Button>
              </NavLink>
            </Col>
          </Row>
        </Container>
      </div>

      <div >
        <Container >
          <Row style={{ justifyContent: "space-evenly" }}>
            <Col xs={12} md={12} lg={3} className="d-flex justify-content-between mt-3" style={{ backgroundColor: '#3d3b52', borderRadius: '20px', marginTop: '2px' }} >
              <div className="mt-1 pt-2">
                <NavLink to="/user_rentalviewproducts1" className="ul">
                  <img src={Pro1} className="rounded mx-auto d-block img-fluid" alt="img1" width="70%" height="50%" />
                  <p style={{ textAlign: 'center', color: 'white' }} className="mt-4">Product1</p>
                </NavLink>
              </div>
            </Col>

            <Col xs={12} md={12} lg={3} className="d-flex justify-content-between mt-3" style={{ backgroundColor: '#3d3b52', borderRadius: '20px', marginTop: '2px' }} >
              <div className="mt-1 pt-2">
                <img src={Pro1} className="rounded mx-auto d-block img-fluid" alt="img1" width="70%" height="50%" />
                <p style={{ textAlign: 'center', color: 'white' }} className="mt-4">Product1</p>
              </div>
            </Col>

            <Col xs={12} md={12} lg={3} className="d-flex justify-content-between mt-3" style={{ backgroundColor: '#3d3b52', borderRadius: '20px', marginTop: '2px' }} >
              <div className="mt-1 pt-2">
                <img src={Pro1} className="rounded mx-auto d-block img-fluid" alt="img1" width="70%" height="50%" />
                <p style={{ textAlign: 'center', color: 'white' }} className="mt-4">Product1</p>
              </div>
            </Col>
          </Row>

          <Row style={{ justifyContent: "space-evenly" }}>
            <Col xs={12} md={12} lg={3} className="d-flex justify-content-between mt-3" style={{ backgroundColor: '#3d3b52', borderRadius: '20px', marginTop: '2px' }} >
              <div className="mt-1 pt-2">
                <img src={Pro1} className="rounded mx-auto d-block img-fluid" alt="img1" width="70%" height="50%" />
                <p style={{ textAlign: 'center', color: 'white' }} className="mt-4">Product1</p>
              </div>
            </Col>

            <Col xs={12} md={12} lg={3} className="d-flex justify-content-between mt-3" style={{ backgroundColor: '#3d3b52', borderRadius: '20px', marginTop: '2px' }} >
              <div className="mt-1 pt-2">
                <img src={Pro1} className="rounded mx-auto d-block img-fluid" alt="img1" width="70%" height="50%" />
                <p style={{ textAlign: 'center', color: 'white' }} className="mt-4">Product1</p>
              </div>
            </Col>

            <Col xs={12} md={12} lg={3} className="d-flex justify-content-between mt-3" style={{ backgroundColor: '#3d3b52', borderRadius: '20px', marginTop: '2px' }} >
              <div className="mt-1 pt-2">
                <img src={Pro1} className="rounded mx-auto d-block img-fluid" alt="img1" width="70%" height="50%" />
                <p style={{ textAlign: 'center', color: 'white' }} className="mt-4">Product1</p>
              </div>
            </Col>
          </Row>
          <Row style={{ justifyContent: "space-evenly" }}>
            <Col xs={12} md={12} lg={3} className="d-flex justify-content-between mt-3" style={{ backgroundColor: '#3d3b52', borderRadius: '20px', marginTop: '2px' }} >
              <div className="mt-1 pt-2">
                <img src={Pro1} className="rounded mx-auto d-block img-fluid" alt="img1" width="70%" height="50%" />
                <p style={{ textAlign: 'center', color: 'white' }} className="mt-4">Product1</p>
              </div>
            </Col>

            <Col xs={12} md={12} lg={3} className="d-flex justify-content-between mt-3" style={{ backgroundColor: '#3d3b52', borderRadius: '20px', marginTop: '2px' }} >
              <div className="mt-1 pt-2">
                <img src={Pro1} className="rounded mx-auto d-block img-fluid" alt="img1" width="70%" height="50%" />
                <p style={{ textAlign: 'center', color: 'white' }} className="mt-4">Product1</p>
              </div>
            </Col>

            <Col xs={12} md={12} lg={3} className="d-flex justify-content-between mt-3" style={{ backgroundColor: '#3d3b52', borderRadius: '20px', marginTop: '2px' }} >
              <div className="mt-1 pt-2">
                <img src={Pro1} className="rounded mx-auto d-block img-fluid" alt="img1" width="70%" height="50%" />
                <p style={{ textAlign: 'center', color: 'white' }} className="mt-4">Product1</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
export default UserRental_products_view;