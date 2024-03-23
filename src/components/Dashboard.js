import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { NavbarStyle } from "./style";
import {
  DashboardContent,
  TableContent,
  TableContent1,
  TableContent2,
  TableContent3,
  TableContent4,
} from "./Dashboard_content";
import Rental from "../icons/rental_products.svg";
import General from "../icons/general_entry.svg";
import Construction from "../icons/new_construction.svg";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import "./style.js";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const Dashboard = (props) => {
  const purchaseData = [
    { id: 1, slno: 1, firstName: "Mark", lastName: "Otto", username: "@mdo" },
    {
      id: 2,
      slno: 2,
      firstName: "Jacob",
      lastName: "Thornton",
      username: "@fat",
    },
    {
      id: 3,
      slno: 3,
      firstName: "Jacob",
      lastName: "Larry the Bird",
      username: "@twitter",
    },
  ];
  const purchaseData1 = [
    { BuildingName: "xxx", Location: "xxx" },
    { BuildingName: "xxx", Location: "xxx" },
    { BuildingName: "xxx", Location: "xxx" },
  ];
  const purchaseData2 = [
    { ProductName: "xxx", Days: "xxx" },
    { ProductName: "xxx", Days: "xxx" },
    { ProductName: "xxx", Days: "xxx" },
  ];
  return (
    <NavbarStyle>
      <div>
        <Container fluid>
          <Row>
            <Col xs={12} md={8} lg={4} className="mb-3">
              <NavLink to="/rental_products" className="ul">
                <DashboardContent title="Products" img={Rental} />
              </NavLink>
            </Col>

            <Col xs={12} md={8} lg={4} className="mb-3">
              <NavLink to="/general_entry" className="ul">
                <DashboardContent title="General Entry" img={General} />
              </NavLink>
            </Col>

            <Col xs={12} md={8} lg={4} className="mb-3">
              <NavLink to="/add_construction" className="ul">
                <DashboardContent title="Constructions" img={Construction} />
              </NavLink>
            </Col>
          </Row>

          <Row>
            <Col
              xs={12}
              md={12}
              lg={12}
              className="mb-3"
              style={{
                backgroundColor: "#3d3b52",
                paddingBottom: "30px",
                borderRadius: "25px",
              }}
            >
              <div
                className="p-3  mt-4 "
                style={{
                  backgroundColor: "#232135",
                  maxHeight: "500px",
                  borderRadius: "10px",
                  padding: "10px",
                }}
              >
                <p style={{ color: "white", fontSize: "20px" }}>
                  Purchase View
                  <span>
                    <NavLink to="/view_purchase">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "right",
                          marginTop: "-30px",
                        }}
                      >
                        <ArrowForwardIcon style={{ color: "White" }} />
                      </div>
                    </NavLink>
                  </span>
                </p>
                <TableContent data={purchaseData} />
              </div>
            </Col>
          </Row>

          <Row className="g-3" style={{ justifyContent: "space-evenly" }}>
            <Col
              xs={12}
              md={12}
              lg={5}
              className="mb-3 g-4"
              style={{
                backgroundColor: "#3d3b52",
                width: "500px",
                paddingBottom: "30px",
                borderRadius: "25px",
              }}
            >
              <div
                className="  mt-4"
                style={{
                  backgroundColor: "#ffffff",
                  maxHeight: "500px",
                  borderRadius: "8px",
                  padding: "10px",
                }}
              >
                <p
                  style={{
                    color: "black",
                    fontSize: "20px",
                    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                  }}
                >
                  Salary Details
                </p>
                <TableContent3 data={purchaseData2} />
                <NavLink to="/view_salary">
                  <div style={{ display: "flex", justifyContent: "right" }}>
                    <ArrowForwardIcon style={{ color: "black" }} />
                  </div>
                </NavLink>
              </div>
            </Col>

            <Col
              xs={12}
              md={12}
              lg={5}
              className="mb-3 g-4"
              style={{
                backgroundColor: "#3d3b52",
                paddingBottom: "30px",
                borderRadius: "25px",
                width: "500px",
              }}
            >
              <div
                className="p-3 mt-4"
                style={{
                  backgroundColor: "#ffffff",
                  maxHeight: "500px",
                  borderRadius: "8px",
                  padding: "10px",
                }}
              >
                <p
                  style={{
                    color: "black",
                    fontSize: "20px",
                    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                  }}
                >
                  Sales Payment
                </p>
                <TableContent4 data={purchaseData2} />
                <NavLink to="/view_sales">
                  <div style={{ display: "flex", justifyContent: "right" }}>
                    <ArrowForwardIcon style={{ color: "black" }} />
                  </div>
                </NavLink>
              </div>
            </Col>
          </Row>

          <Row className="g-3" style={{ justifyContent: "space-evenly" }}>
            <Col
              xs={12}
              md={12}
              lg={5}
              className="mb-3 g-4"
              style={{
                backgroundColor: "#3d3b52",
                width: "500px",
                paddingBottom: "30px",
                borderRadius: "25px",
              }}
            >
              <div
                className="  mt-4"
                style={{
                  backgroundColor: "#ffffff",
                  maxHeight: "500px",
                  borderRadius: "8px",
                  padding: "10px",
                }}
              >
                <p
                  style={{
                    color: "black",
                    fontSize: "20px",
                    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                  }}
                >
                  Construction View
                </p>
                <TableContent1 data={purchaseData1} />
                <NavLink to="/add_construction_view">
                  <div style={{ display: "flex", justifyContent: "right" }}>
                    <ArrowForwardIcon style={{ color: "black" }} />
                  </div>
                </NavLink>
              </div>
            </Col>

            <Col
              xs={12}
              md={12}
              lg={5}
              className="mb-3 g-4"
              style={{
                backgroundColor: "#3d3b52",
                paddingBottom: "30px",
                borderRadius: "25px",
                width: "500px",
              }}
            >
              <div
                className="p-3 mt-4"
                style={{
                  backgroundColor: "#ffffff",
                  maxHeight: "500px",
                  borderRadius: "8px",
                  padding: "10px",
                }}
              >
                <p
                  style={{
                    color: "black",
                    fontSize: "20px",
                    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                  }}
                >
                  Rental Products
                </p>
                <TableContent2 data={purchaseData2} />
                <NavLink to="/rental_products_view">
                  <div style={{ display: "flex", justifyContent: "right" }}>
                    <ArrowForwardIcon style={{ color: "black" }} />
                  </div>
                </NavLink>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </NavbarStyle>
  );
};

export default Dashboard;
