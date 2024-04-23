import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { Row, Col, Button, Form } from 'react-bootstrap';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';

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

function UserUpdate_sales_vehicle() {
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit">
      Sales
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="white"

    >
      Update Sales Vehicle
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
              <NavLink to="/user_updatesales" className="ul">
                <Button size="lg" style={buttonStyle} >
                  Purchase
                </Button>
              </NavLink>
            </Col>
            <Col xs={12} md={8} lg={4} className="d-grid gap-2 mt-5">
              <NavLink to="/userupdate_sales_payment" className="ul">
                <Button size="lg" style={buttonStyle} >
                  Payment
                </Button>
              </NavLink>
            </Col>
            <Col xs={12} md={8} lg={4} className="d-grid gap-2 mt-5">
              <NavLink to="/userupdate_sales_vehicle" className="ul">
                <Button size="lg" style={buttonStyle1} >
                  Vehicle
                </Button>
              </NavLink>
            </Col>
          </Row>
        </Container>
      </div>

      <div style={{ backgroundColor: '#3d3b52', borderRadius: '20px', paddingBottom: '50px', marginTop: '2px' }}>
        <Container fluid>
          <Row>
            {/* <p>Welcome to the Vehicle details section!</p> */}
            <Col xs={12} md={8} lg={{ span: 6, offset: 3 }} className="d-grid gap-2 mt-3">
              <Form>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                  <Form.Label column sm={4} style={{ color: 'white', marginTop: '5px' }}>
                    Vehicle No
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control type="text" style={formStyle} />
                  </Col>
                  <Form.Label column sm={4} style={{ color: 'white', marginTop: '5px' }}>
                    Driver Name
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control type="text" style={formStyle} />
                  </Col>
                  <Form.Label column sm={4} style={{ color: 'white', marginTop: '5px' }}>
                    Chassic No
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control type="text" style={formStyle} />
                  </Col>
                  <Form.Label column sm={4} style={{ color: 'white', marginTop: '5px' }}>
                    RC Book No
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control type="text" style={formStyle} />
                  </Col>
                  <Form.Label column sm={4} style={{ color: 'white', marginTop: '5px' }}>
                    Fuel Liter
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control type="text" style={formStyle} />
                  </Col>
                  <Form.Label column sm={4} style={{ color: 'white', marginTop: '5px' }}>
                    Fuel Amount
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control type="text" style={formStyle} />
                  </Col>
                  <Form.Label column sm={4} style={{ color: 'white', marginTop: '5px' }}>
                    Place From
                  </Form.Label>
                  <Col sm={3}>
                    <Form.Control type="text" style={formStyle} required />
                  </Col>
                  <Form.Label column sm={2} style={{ color: 'white', marginTop: '5px' }}>
                    Place To
                  </Form.Label>
                  <Col sm={3}>
                    <Form.Control type="text" style={formStyle} />
                  </Col>
                  <Form.Label column sm={4} style={{ color: 'white', marginTop: '5px' }}>
                    Date
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control type="text" style={formStyle} />
                  </Col>
                  <Form.Label column sm={4} style={{ color: 'white', marginTop: '5px' }}>
                    Wages
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control type="text" style={formStyle} />
                  </Col>
                  <Form.Label column sm={4} style={{ color: 'white', marginTop: '5px' }}>
                  </Form.Label>
                  <Col sm={8} className="text-center">
                    <NavLink to="/userupdate_sales_vehicle" className="ul">
                      <Button size="lg" variant="primary" className="w-100" >Update</Button>
                    </NavLink>
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
export default UserUpdate_sales_vehicle;