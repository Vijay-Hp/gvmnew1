import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import { Row, Col, Form } from 'react-bootstrap';
import IconButton from '@mui/material/IconButton';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import './style.js';

const buttonStyle = {
  color: '#ffffff',

};

function Settings() {
  const [toggleState, setToggleState] = useState(false);
  const handleToggle = () => {
    setToggleState(!toggleState);
  };

  return (
    <>
      <div style={{ backgroundColor: '#3d3b52', borderRadius: '20px', paddingBottom: '280px' }}>
        <Container fluid>
          <Row>
          <Col xs={12} md={8} lg={{ span: 6}} className="d-grid gap-2" style={{marginTop:'100px',paddingBottom:'80px'}}>
                    <Form>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label column sm={2} style={{ color: 'white',marginTop:'5px'}}>
                        Theme
                        </Form.Label>
                        <Col sm={8}>
                            <IconButton onClick={handleToggle} className='toogle'>
                                {toggleState ? <ToggleOnIcon/> : <ToggleOffIcon/>}
                            </IconButton>
                            <p>{toggleState ? 'On' : 'Off'}</p>
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

export default Settings;
