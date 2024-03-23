import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { Row, Col, Button, Form } from 'react-bootstrap';
import Pro1 from './assets/pro1.webp';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
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

function UserRental_products_update1() {
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit">
      Rental Products
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="white"

    >
      Update Products
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
                <Button size="lg" style={buttonStyle} >
                  View Products
                </Button>
              </NavLink>
            </Col>

            <Col xs={12} md={8} lg={4} className="d-grid gap-2 mt-5">
              <NavLink to="/user_rentalupdateproducts" className="ul">
                <Button size="lg" style={buttonStyle1} >
                  Update Products
                </Button>
              </NavLink>
            </Col>
          </Row>
        </Container>
      </div>

      <div style={{ backgroundColor: '#3d3b52', borderRadius: '20px', paddingBottom: '50px', marginTop: '2px' }}>
        <Container fluid>
          <Row>
            <Col xs={12} md={8} lg={{ span: 6, offset: 3 }} className="d-grid gap-2 mt-3">
              <Form>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                  <Form.Label column sm={4} style={{ color: 'white', marginTop: '5px' }}>
                    Product Id
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control type="text" style={formStyle} />
                  </Col>
                  <Form.Label column sm={4} style={{ color: 'white', marginTop: '5px' }}>
                    Product Name
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control type="text" style={formStyle} />
                  </Col>
                  <Form.Label column sm={4} style={{ color: 'white', marginTop: '5px' }}>
                    Product Quantity
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control type="text" style={formStyle} />
                  </Col>
                  <Form.Label column sm={4} style={{ color: 'white', marginTop: '5px' }}>
                    Days
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control type="text" style={formStyle} />
                  </Col>
                  <Form.Label column sm={4} style={{ color: 'white', marginTop: '5px' }}>
                    From Date
                  </Form.Label>
                  <Col sm={3}>
                    <Form.Control type="text" style={formStyle} required />
                  </Col>
                  <Form.Label column sm={2} style={{ color: 'white', marginTop: '5px' }}>
                    To
                  </Form.Label>
                  <Col sm={3}>
                    <Form.Control type="text" style={formStyle} />
                  </Col>
                  <Form.Label column sm={4} style={{ color: 'white', marginTop: '5px' }}>
                    Total Amount
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control type="text" style={formStyle} />
                  </Col>
                  <Form.Label column sm={4} style={{ color: 'white', marginTop: '5px' }}>
                    Balance Amount
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control type="text" style={formStyle} />
                  </Col>
                  <Form.Label column sm={4} style={{ color: 'white', marginTop: '5px' }}>
                    Payment Method
                  </Form.Label>
                  <Col sm={8} style={{ marginTop: '10px', color: 'white' }}>
                    <Form.Check
                      inline
                      label="Cash"
                      name="group1"
                      type="radio"
                      id="inline-radio-1"
                    />
                    <Form.Check
                      inline
                      label="Online Transcation"
                      name="group1"
                      type="radio"
                      id="inline-radio-2"
                    />
                  </Col>
                  <Form.Label column sm={4} style={{ color: 'white', marginTop: '5px' }}>
                  </Form.Label>
                  <Col sm={8} className="text-center">
                    <Button size="lg" variant="primary" className="w-100" >Update</Button>
                  </Col>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
export default UserRental_products_update1;