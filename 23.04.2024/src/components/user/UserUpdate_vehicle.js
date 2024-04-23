import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { Row, Col, Button, Form } from 'react-bootstrap';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import './style.js';

const buttonStyle = {
  backgroundColor: '#232135',
  color: '#ffffff',
  border: 'none'
};
const formStyle = {
  backgroundColor: '#232135',
  color: 'white',
  border: 'none',
};

function UserUpdate_vehicle() {
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit">
      Vechicle
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="white"
    >
      Update Vechicle
    </Link>
  ];
  return (
    <div style={{ backgroundColor: '#3d3b52', borderRadius: '20px', paddingBottom: '50px', marginTop: '2px' }}>
      <Container fluid>
        <Row>
          <Stack spacing={3} style={{ marginTop: '30px' }}>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
              {breadcrumbs}
            </Breadcrumbs>
          </Stack>
          <Col xs={12} md={8} lg={{ span: 6, offset: 3 }} className="d-grid gap-2" style={{ marginTop: '100px', paddingBottom: '80px' }}>
            <Form>
              <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                <Form.Label column sm={4} style={{ color: 'white', marginTop: '5px' }}>
                  Vechical No
                </Form.Label>
                <Col sm={8}>
                  <Form.Control type="text" style={formStyle} />
                </Col>
                <Form.Label column sm={4} style={{ color: 'white', marginTop: '5px' }}>
                  Chassis No
                </Form.Label>
                <Col sm={8}>
                  <Form.Control type="text" style={formStyle} />
                </Col>
                <Form.Label column sm={4} style={{ color: 'white', marginTop: '5px' }}>
                  Vehicle Model
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
                  Insurance Renewal
                </Form.Label>
                <Col sm={8}>
                  <Form.Control type="text" style={formStyle} />
                </Col>
                <Form.Label column sm={4} style={{ color: 'white', marginTop: '5px' }}>
                  Fuel Type
                </Form.Label>
                <Col sm={8} style={{ marginTop: '10px', color: 'white' }}>
                  <Form.Check
                    inline
                    label="Petrol"
                    name="group1"
                    type="radio"
                    id="inline-radio-1"
                  />
                  <Form.Check
                    inline
                    label="Diesel"
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
  )
}
export default UserUpdate_vehicle;