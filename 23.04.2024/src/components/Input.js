import React from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import "./style.js";

const formStyle = {
  backgroundColor: "#232135",
  color: "white",
  border: "none",
};

const formStyle1 = {
  border: "1px solid black",
  height: "28px",
};

const buttonStyle = {
  backgroundColor: "#232135",
  color: "#ffffff",
  width: "100%",
  border: "2px solid #babaef",
};

const buttonStyle1 = {
  backgroundColor: "#232135",
  color: "#ffffff",
  width: "100%",
  border: "none",
};

export function Topbutton(props) {
  return (
    <>
      <Button size="lg" style={buttonStyle}>
        {props.topname}
      </Button>
    </>
  );
}
export function Topbutton1(props) {
  return (
    <>
      <Button size="lg" style={buttonStyle1}>
        {props.topname}
      </Button>
    </>
  );
}

//required
export function Id({ name, handleDataChange, textboxName, value }) {
  return (
    <>
      <Form.Label column sm={4} style={{ color: "white", marginTop: "5px" }}>
        {name}
      </Form.Label>
      <Col sm={8}>
        <Form.Control
          required
          type="text"
          style={formStyle}
          name={textboxName}
          onChange={handleDataChange}
          value={value}
          maxLength={8}
        />
      </Col>
    </>
  );
}

export function Name({ name, handleDataChange, textboxName, value }) {
  return (
    <>
      <Form.Label column sm={4} style={{ color: "white", marginTop: "5px" }}>
        {name}
      </Form.Label>
      <Col sm={8}>
        <Form.Control
          required
          type="text"
          style={formStyle}
          pattern="^(?!\s)[a-zA-Z\s]*$"
          name={textboxName}
          onChange={handleDataChange}
          value={value}
          maxLength={25}
        />
      </Col>
    </>
  );
}

export function Mail({ name, handleDataChange, textboxName, value }) {
  return (
    <>
      <Form.Label column sm={4} style={{ color: "white", marginTop: "5px" }}>
        {name}
      </Form.Label>
      <Col sm={8}>
        <Form.Control
          required
          type="email"
          style={formStyle}
          pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
          name={textboxName}
          onChange={handleDataChange}
          value={value}
        />
      </Col>
    </>
  );
}

export function Radio({
  name,
  handleDataChange,
  label1,
  label2,
  name1,
  value1,
  value2,
  choose,
}) {
  return (
    <>
      <Form.Label column sm={4} style={{ color: "white", marginTop: "5px" }}>
        {name}
      </Form.Label>
      <Col sm={8} style={{ marginTop: "10px", color: "white" }}>
        <Form.Check
          inline
          label={label1}
          name={name1}
          type="radio"
          value={value1}
          onChange={handleDataChange}
          checked={choose === value1}
        />
        <Form.Check
          inline
          label={label2}
          name={name1}
          type="radio"
          value={value2}
          onChange={handleDataChange}
          checked={choose === value2}
        />
      </Col>
    </>
  );
}

export function Radio1({
  name,
  handleDataChange,
  label1,
  label2,
  name1,
  value1,
  value2,
}) {
  return (
    <>
      <Form.Label column sm={4} style={{ color: "white", marginTop: "5px" }}>
        {name}
      </Form.Label>
      <Col sm={8} style={{ marginTop: "10px", color: "white" }}>
        <Form.Check
          inline
          label={label1}
          name={name1}
          type="radio"
          value={value1}
          onChange={handleDataChange}
        />
        <Form.Check
          inline
          label={label2}
          name={name1}
          type="radio"
          value={value2}
          onChange={handleDataChange}
        />
      </Col>
    </>
  );
}

export function Radiothree({
  name,
  handleDataChange,
  label1,
  label2,
  label3,
  name1,
  value1,
  value2,
  value3,
  choose1,
}) {
  return (
    <>
      <Form.Label column sm={4} style={{ color: "white", marginTop: "5px" }}>
        {name}
      </Form.Label>
      <Col sm={8} style={{ marginTop: "10px", color: "white" }}>
        <Form.Check
          inline
          label={label1}
          name={name1}
          type="radio"
          value={value1}
          onChange={handleDataChange}
          checked={choose1 === value1}
        />
        <Form.Check
          inline
          label={label2}
          name={name1}
          type="radio"
          value={value2}
          onChange={handleDataChange}
          checked={choose1 === value2}
        />
        <Form.Check
          inline
          label={label3}
          name={name1}
          type="radio"
          value={value3}
          onChange={handleDataChange}
          checked={choose1 === value3}
        />
      </Col>
    </>
  );
}

export function Radiothree1({
  name,
  handleDataChange,
  label1,
  label2,
  label3,
  name1,
  value1,
  value2,
  value3,
}) {
  return (
    <>
      <Form.Label column sm={4} style={{ color: "white", marginTop: "5px" }}>
        {name}
      </Form.Label>
      <Col sm={8} style={{ marginTop: "10px", color: "white" }}>
        <Form.Check
          inline
          label={label1}
          name={name1}
          type="radio"
          value={value1}
          onChange={handleDataChange}
        />
        <Form.Check
          inline
          label={label2}
          name={name1}
          type="radio"
          value={value2}
          onChange={handleDataChange}
        />
        <Form.Check
          inline
          label={label3}
          name={name1}
          type="radio"
          value={value3}
          onChange={handleDataChange}
        />
      </Col>
    </>
  );
}

export function No({ name, handleDataChange, textboxName, value }) {
  const handleInput = (e) => {
    e.target.value = Math.abs(e.target.value);
    if (e.target.value.length > 6) {
      e.target.value = e.target.value.slice(0, 8);
    }
  };
  return (
    <>
      <Form.Label column sm={4} style={{ color: "white", marginTop: "5px" }}>
        {name}
      </Form.Label>
      <Col sm={8}>
        <Form.Control
          required
          type="number"
          style={{ ...formStyle }}
          pattern="[0-9]*"
          defaultValue={parseInt(0)}
          name={textboxName}
          onChange={handleDataChange}
          onInput={handleInput}
          value={value}
          maxLength={6}
        />
      </Col>
    </>
  );
}

export function Nocal({ name, handleDataChange, textboxName, value }) {
  return (
    <>
      <Form.Label column sm={4} style={{ color: "white", marginTop: "5px" }}>
        {name}
      </Form.Label>
      <Col sm={8}>
        <Form.Control
          required
          type="text"
          style={{ ...formStyle }}
          pattern="[0-9]*"
          defaultValue={parseInt(0)}
          name={textboxName}
          onChange={handleDataChange}
          value={value}
          maxLength={6}
        />
      </Col>
    </>
  );
}
export function Mbl({ name, handleDataChange, textboxName, value }) {
  return (
    <>
      <Form.Label column sm={4} style={{ color: "white", marginTop: "5px" }}>
        {name}
      </Form.Label>
      <Col sm={8}>
        <Form.Control
          required
          type="text"
          style={{ ...formStyle }}
          pattern="[0-9]*"
          // defaultValue={parseInt(0)}
          name={textboxName}
          onChange={handleDataChange}
          value={value}
          minLength={10}
          maxLength={10}
        />
      </Col>
    </>
  );
}
export function Nopoint({ name, handleDataChange, textboxName, value }) {
  return (
    <>
      <Form.Label column sm={4} style={{ color: "white", marginTop: "5px" }}>
        {name}
      </Form.Label>
      <Col sm={8}>
        <Form.Control
          required
          type="text"
          style={{ ...formStyle }}
          pattern="[0-9]*"
          // defaultValue="0.00"
          name={textboxName}
          onChange={handleDataChange}
          value={value}
        />
      </Col>
    </>
  );
}

export function Btn(props) {
  const buttonStyle = {
    backgroundColor: "#babaef",
    color: "black",
    width: "100%",
    border: "none",
  };

  return (
    <>
      <Form.Label
        column
        sm={4}
        style={{ color: "white", marginTop: "5px" }}
      ></Form.Label>
      <Col sm={8} className="text-center">
        <Button
          type="submit"
          size="lg"
          variant="primary"
          className="w-100"
          style={buttonStyle}
          onClick={props.btnEvent}
        >
          {props.btn}
        </Button>
      </Col>
    </>
  );
}

export function Btn1(props) {
  const buttonStyle = {
    backgroundColor: "#008000",
    color: "white",
    width: "100%",
    border: "none",
  };

  return (
    <>
      <Col
        sm={4}
        className="text-center"
        style={{ marginLeft: "20px", marginTop: "15px" }}
      >
        <Button
          type="submit"
          size="lg"
          variant="primary"
          className="w-100"
          style={buttonStyle}
          onClick={props.btnEvent}
        >
          {props.btn}
        </Button>
      </Col>
    </>
  );
}
export function Btncancel(props) {
  const buttonStyle = {
    backgroundColor: "#dc3545",
    color: "white",
    width: "100%",
    border: "none",
  };

  return (
    <>
      <Col
        sm={4}
        className="text-center"
        style={{ marginLeft: "100px", marginTop: "15px" }}
      >
        <Button
          type="submit"
          size="lg"
          variant="primary"
          className="w-100"
          style={buttonStyle}
          onClick={props.setSelectedPurchase}
        >
          {props.btn}
        </Button>
      </Col>
    </>
  );
}
export function Place(props) {
  return (
    <>
      <Form.Label column sm={4} style={{ color: "white", marginTop: "5px" }}>
        Place From
      </Form.Label>
      <Col sm={3}>
        <Form.Control
          required
          type="text"
          style={formStyle}
          pattern="[a-z,A-Z]*"
        />
      </Col>

      <Form.Label column sm={2} style={{ color: "white", marginTop: "5px" }}>
        To
      </Form.Label>
      <Col sm={3}>
        <Form.Control
          required
          type="text"
          style={formStyle}
          pattern="[a-z,A-Z]*"
        />
      </Col>
    </>
  );
}

export function Date({ name, handleDataChange, textboxName, value }) {
  return (
    <>
      <Form.Label column sm={4} style={{ color: "white", marginTop: "5px" }}>
        {name}
      </Form.Label>
      <Col sm={8}>
        <style>
          {`
          .date-input::-webkit-calendar-picker-indicator {
            filter: invert(1);
          } 
        `}
        </style>
        <Form.Control
          required
          type="date"
          style={formStyle}
          className="date-input"
          name={textboxName}
          onChange={handleDataChange}
          value={value}
        />
      </Col>
    </>
  );
}

export function Idreadonly({ name, handleDataChange, textboxName, val }) {
  return (
    <>
      <Form.Label column sm={4} style={{ color: "white", marginTop: "5px" }}>
        {name}
      </Form.Label>
      <Col sm={8}>
        <Form.Control
          readOnly
          type="text"
          style={formStyle}
          name={textboxName}
          onChange={handleDataChange}
          value={val}
        />
      </Col>
    </>
  );
}

export function Idreadonlycal({ name, handleDataChange, textboxName, val }) {
  return (
    <>
      <Form.Label column sm={4} style={{ color: "white", marginTop: "5px" }}>
        {name}
      </Form.Label>
      <Col sm={8}>
        <Form.Control
          readOnly
          type="text"
          style={formStyle}
          name={textboxName}
          onChange={handleDataChange}
          // defaultValue={parseInt(0)}
          value={val}
        />
      </Col>
    </>
  );
}
//not required field
export function Idnotreq({ name, handleDataChange, textboxName, value }) {
  return (
    <>
      <Form.Label column sm={4} style={{ color: "white", marginTop: "5px" }}>
        {name}
      </Form.Label>
      <Col sm={8}>
        <Form.Control
          type="text"
          style={formStyle}
          name={textboxName}
          onChange={handleDataChange}
          value={value}
          maxLength={8}
        />
      </Col>
    </>
  );
}

export function Namenotreq({ name, handleDataChange, textboxName, value }) {
  return (
    <>
      <Form.Label column sm={4} style={{ color: "white", marginTop: "5px" }}>
        {name}
      </Form.Label>
      <Col sm={8}>
        <Form.Control
          type="text"
          style={formStyle}
          pattern="^(?!\s)[a-zA-Z\s]*$"
          name={textboxName}
          onChange={handleDataChange}
          value={value}
          maxLength={25}
        />
      </Col>
    </>
  );
}
//read only on payment page
export function Idpayment({ name, handleDataChange, textboxName, value }) {
  return (
    <>
      <Form.Label column sm={4} style={{ color: "white", marginTop: "5px" }}>
        {name}
      </Form.Label>
      <Col sm={8}>
        <Form.Control
          readOnly
          type="text"
          style={formStyle}
          name={textboxName}
          onChange={handleDataChange}
          value={value}
        />
      </Col>
    </>
  );
}

export function Mblpayment({ name, handleDataChange, textboxName, value }) {
  return (
    <>
      <Form.Label column sm={4} style={{ color: "white", marginTop: "5px" }}>
        {name}
      </Form.Label>
      <Col sm={8}>
        <Form.Control
          readOnly
          type="text"
          style={{ ...formStyle }}
          pattern="[0-9]*"
          name={textboxName}
          onChange={handleDataChange}
          value={value}
          minLength={10}
          maxLength={10}
        />
      </Col>
    </>
  );
}

export function Namepayment({ name, handleDataChange, textboxName, value }) {
  return (
    <>
      <Form.Label column sm={4} style={{ color: "white", marginTop: "5px" }}>
        {name}
      </Form.Label>
      <Col sm={8}>
        <Form.Control
          readOnly
          type="text"
          style={formStyle}
          pattern="^(?!\s)[a-zA-Z\s]*$"
          name={textboxName}
          onChange={handleDataChange}
          value={value}
          maxLength={25}
        />
      </Col>
    </>
  );
}
export function Nopayment({ name, handleDataChange, textboxName, value }) {
  return (
    <>
      <Form.Label column sm={4} style={{ color: "white", marginTop: "5px" }}>
        {name}
      </Form.Label>
      <Col sm={8}>
        <Form.Control
          readOnly
          type="text"
          style={{ ...formStyle }}
          pattern="[0-9]*"
          defaultValue={parseInt(0)}
          name={textboxName}
          onChange={handleDataChange}
          value={value}
          maxLength={6}
        />
      </Col>
    </>
  );
}

//add invoice format
export function Nameinvoice({
  name,
  handleDataChange,
  textboxName,
  value,
  index,
}) {
  const dynamicName = `${name}-${index}`; // Creating a unique name using index
  return (
    <Col sm={8}>
      <Form.Control
        required
        type="text"
        style={formStyle1}
        pattern="[A-Za-z]+"
        name={textboxName} // Use the dynamic name here
        onChange={(e) => handleDataChange(e, index, textboxName)} // Pass index and textboxName to handleDataChange
        value={value} // Use the provided value here
        maxLength={20}
        fullWidth
      />
    </Col>
  );
}

export function Noinvoice({
  name,
  handleDataChange,
  textboxName,
  value,
  index,
}) {
  const dynamicName = `${name}-${index}`;
  return (
    <>
      <Col sm={8}>
        <Form.Control
          required
          type="number"
          style={formStyle1}
          pattern="[0-9]*"
          defaultValue={parseInt(0)}
          name={textboxName}
          onChange={(e) => handleDataChange(e, index, textboxName)}
          value={value}
          maxLength={6}
        />
      </Col>
    </>
  );
}

export function Noreadonly({
  name,
  handleDataChange,
  textboxName,
  value,
  index,
}) {
  const dynamicName = `${name}-${index}`;
  return (
    <>
      <Col sm={8}>
        <Form.Control
          required
          type="text"
          style={formStyle1}
          pattern="[0-9]*\.?[0-9]*"
          defaultValue={parseFloat(0)}
          name={textboxName}
          onChange={(e) => handleDataChange(e, index, textboxName)}
          value={value}
          maxLength={6}
        />
      </Col>
    </>
  );
}

export function Date1({ handleDataChange, textboxName, value }) {
  return (
    <>
      <Col sm={8}>
        <style>
          {`
          .date-input::-webkit-calendar-picker-indicator {
            filter: invert(0);
          } 
        `}
        </style>
        <Form.Control
          required
          type="date"
          style={formStyle1}
          className="date-input"
          name={textboxName}
          onChange={handleDataChange}
          value={value}
        />
      </Col>
    </>
  );
}
