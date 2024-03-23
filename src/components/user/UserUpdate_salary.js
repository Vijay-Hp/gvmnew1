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

function UserUpdate_salary() {
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit">
      Vechicle
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="white"
    >
      Update Salary
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
          <Col xs={12} md={8} lg={{ span: 6, offset: 3 }} className="d-grid gap-2" style={{ marginTop: '50px', paddingBottom: '80px' }}>
            <Form>
              <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                <Form.Label column sm={4} style={{ color: 'white', marginTop: '5px' }}>
                  Employee Name
                </Form.Label>
                <Col sm={8}>
                  <Form.Control type="text" style={formStyle} />
                </Col>
                <Form.Label column sm={4} style={{ color: 'white', marginTop: '5px' }}>
                  Employee Id
                </Form.Label>
                <Col sm={8}>
                  <Form.Control type="text" style={formStyle} />
                </Col>
                <Form.Label column sm={4} style={{ color: 'white', marginTop: '5px' }}>
                  Category
                </Form.Label>
                <Col sm={8}>
                  <Form.Select aria-label="Category" style={formStyle}>
                    <option>Select Option</option>
                    <option value="1">Category1</option>
                    <option value="2">Category2</option>
                    <option value="3">Category3</option>
                  </Form.Select>
                </Col>

                <Form.Label column sm={4} style={{ color: 'white', marginTop: '5px' }}>
                  Wages Type
                </Form.Label>
                <Col sm={8} style={{ marginTop: '10px', color: 'white' }}>
                  <Form.Check
                    inline
                    label="Daily"
                    name="group1"
                    type="radio"
                    id="inline-radio-1"
                  />
                  <Form.Check
                    inline
                    label="Weekly"
                    name="group1"
                    type="radio"
                    id="inline-radio-2"
                  />
                  <Form.Check
                    inline
                    label="Monthly"
                    name="group1"
                    type="radio"
                    id="inline-radio-2"
                  />
                </Col>
                <Form.Label column sm={4} style={{ color: 'white', marginTop: '5px' }}>
                  Mobile No
                </Form.Label>
                <Col sm={8}>
                  <Form.Control type="text" style={formStyle} />
                </Col>
                <Form.Label column sm={4} style={{ color: 'white', marginTop: '5px' }}>
                  Salary Amount
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
                    name="group2"
                    type="radio"
                    id="inline-radio-1"
                  />
                  <Form.Check
                    inline
                    label="Online Transaction"
                    name="group2"
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
export default UserUpdate_salary;