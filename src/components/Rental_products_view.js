// import React, { useState, useEffect } from "react";
// import Container from "react-bootstrap/Container";
// import { Row, Col, Button, Form } from "react-bootstrap";
// import Pro1 from "../assets/rental.jpg";
// import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
// import Breadcrumbs from "@mui/material/Breadcrumbs";
// import Link from "@mui/material/Link";
// import Stack from "@mui/material/Stack";
// import NavigateNextIcon from "@mui/icons-material/NavigateNext";
// import {
//   Id,
//   Name,
//   Radio,
//   No,
//   Btn,
//   Dropdown,
//   Radiothree,
//   Topbutton,
//   Topbutton1,
// } from "./Input.js";

// function Rental_products_view() {
//   const breadcrumbs = [
//     <Link underline="hover" key="1" color="inherit">
//       Rental Products
//     </Link>,
//     <Link underline="hover" key="2" color="white">
//       View Products
//     </Link>,
//   ];
//   // navigate submit button
//   const [validated, setValidated] = useState(false);
//   const navigate = useNavigate(); // Use useNavigate to get the navigate function

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     const form = event.currentTarget;
//     if (form.checkValidity() === false) {
//       event.stopPropagation();
//     } else {
//       navigate("/start");
//     }
//     setValidated(true);
//   };
//   return (
//     <>
//       <div
//         style={{
//           backgroundColor: "#3d3b52",
//           borderRadius: "20px",
//           paddingBottom: "50px",
//         }}
//       >
//         <Container fluid>
//           <Row>
//             <Stack spacing={3} style={{ marginTop: "30px" }}>
//               <Breadcrumbs
//                 separator={<NavigateNextIcon fontSize="small" />}
//                 aria-label="breadcrumb"
//               >
//                 {breadcrumbs}
//               </Breadcrumbs>
//             </Stack>
//             <Col xs={12} md={8} lg={4} className="d-grid gap-2 mt-5">
//               <NavLink to="/rental_products" className="ul">
//                 <Topbutton1 topname="Add Products" />
//               </NavLink>
//             </Col>

//             <Col xs={12} md={8} lg={4} className="d-grid gap-2 mt-5">
//               <NavLink to="/rental_products_view" className="ul">
//                 <Topbutton topname="View Products" />
//               </NavLink>
//             </Col>

//             <Col xs={12} md={8} lg={4} className="d-grid gap-2 mt-5">
//               <NavLink to="/rental_products_update" className="ul">
//                 <Topbutton1 topname="Update Products" />
//               </NavLink>
//             </Col>
//           </Row>
//         </Container>
//       </div>

//       <div>
//         <Container>
//           <Row style={{ justifyContent: "space-evenly" }}>
//             <Col
//               xs={12}
//               md={12}
//               lg={3}
//               className="d-flex justify-content-between mt-3"
//               style={{
//                 backgroundColor: "#3d3b52",
//                 borderRadius: "20px",
//                 marginTop: "2px",
//               }}
//             >
//               <div className="mt-1 pt-2">
//                 <NavLink to="/rental_products_view1" className="ul">
//                   <img
//                     src={Pro1}
//                     className="rounded mx-auto d-block img-fluid"
//                     alt="img1"
//                     width="70%"
//                     height="50%"
//                   />
//                   <p
//                     style={{ textAlign: "center", color: "white" }}
//                     className="mt-4"
//                   >
//                     Product1
//                   </p>
//                 </NavLink>
//               </div>
//             </Col>

//             <Col
//               xs={12}
//               md={12}
//               lg={3}
//               className="d-flex justify-content-between mt-3"
//               style={{
//                 backgroundColor: "#3d3b52",
//                 borderRadius: "20px",
//                 marginTop: "2px",
//               }}
//             >
//               <div className="mt-1 pt-2">
//                 <img
//                   src={Pro1}
//                   className="rounded mx-auto d-block img-fluid"
//                   alt="img1"
//                   width="70%"
//                   height="50%"
//                 />
//                 <p
//                   style={{ textAlign: "center", color: "white" }}
//                   className="mt-4"
//                 >
//                   Product1
//                 </p>
//               </div>
//             </Col>

//             <Col
//               xs={12}
//               md={12}
//               lg={3}
//               className="d-flex justify-content-between mt-3"
//               style={{
//                 backgroundColor: "#3d3b52",
//                 borderRadius: "20px",
//                 marginTop: "2px",
//               }}
//             >
//               <div className="mt-1 pt-2">
//                 <img
//                   src={Pro1}
//                   className="rounded mx-auto d-block img-fluid"
//                   alt="img1"
//                   width="70%"
//                   height="50%"
//                 />
//                 <p
//                   style={{ textAlign: "center", color: "white" }}
//                   className="mt-4"
//                 >
//                   Product1
//                 </p>
//               </div>
//             </Col>
//           </Row>

//           <Row style={{ justifyContent: "space-evenly" }}>
//             <Col
//               xs={12}
//               md={12}
//               lg={3}
//               className="d-flex justify-content-between mt-3"
//               style={{
//                 backgroundColor: "#3d3b52",
//                 borderRadius: "20px",
//                 marginTop: "2px",
//               }}
//             >
//               <div className="mt-1 pt-2">
//                 <img
//                   src={Pro1}
//                   className="rounded mx-auto d-block img-fluid"
//                   alt="img1"
//                   width="70%"
//                   height="50%"
//                 />
//                 <p
//                   style={{ textAlign: "center", color: "white" }}
//                   className="mt-4"
//                 >
//                   Product1
//                 </p>
//               </div>
//             </Col>

//             <Col
//               xs={12}
//               md={12}
//               lg={3}
//               className="d-flex justify-content-between mt-3"
//               style={{
//                 backgroundColor: "#3d3b52",
//                 borderRadius: "20px",
//                 marginTop: "2px",
//               }}
//             >
//               <div className="mt-1 pt-2">
//                 <img
//                   src={Pro1}
//                   className="rounded mx-auto d-block img-fluid"
//                   alt="img1"
//                   width="70%"
//                   height="50%"
//                 />
//                 <p
//                   style={{ textAlign: "center", color: "white" }}
//                   className="mt-4"
//                 >
//                   Product1
//                 </p>
//               </div>
//             </Col>

//             <Col
//               xs={12}
//               md={12}
//               lg={3}
//               className="d-flex justify-content-between mt-3"
//               style={{
//                 backgroundColor: "#3d3b52",
//                 borderRadius: "20px",
//                 marginTop: "2px",
//               }}
//             >
//               <div className="mt-1 pt-2">
//                 <img
//                   src={Pro1}
//                   className="rounded mx-auto d-block img-fluid"
//                   alt="img1"
//                   width="70%"
//                   height="50%"
//                 />
//                 <p
//                   style={{ textAlign: "center", color: "white" }}
//                   className="mt-4"
//                 >
//                   Product1
//                 </p>
//               </div>
//             </Col>
//           </Row>
//           <Row style={{ justifyContent: "space-evenly" }}>
//             <Col
//               xs={12}
//               md={12}
//               lg={3}
//               className="d-flex justify-content-between mt-3"
//               style={{
//                 backgroundColor: "#3d3b52",
//                 borderRadius: "20px",
//                 marginTop: "2px",
//               }}
//             >
//               <div className="mt-1 pt-2">
//                 <img
//                   src={Pro1}
//                   className="rounded mx-auto d-block img-fluid"
//                   alt="img1"
//                   width="70%"
//                   height="50%"
//                 />
//                 <p
//                   style={{ textAlign: "center", color: "white" }}
//                   className="mt-4"
//                 >
//                   Product1
//                 </p>
//               </div>
//             </Col>

//             <Col
//               xs={12}
//               md={12}
//               lg={3}
//               className="d-flex justify-content-between mt-3"
//               style={{
//                 backgroundColor: "#3d3b52",
//                 borderRadius: "20px",
//                 marginTop: "2px",
//               }}
//             >
//               <div className="mt-1 pt-2">
//                 <img
//                   src={Pro1}
//                   className="rounded mx-auto d-block img-fluid"
//                   alt="img1"
//                   width="70%"
//                   height="50%"
//                 />
//                 <p
//                   style={{ textAlign: "center", color: "white" }}
//                   className="mt-4"
//                 >
//                   Product1
//                 </p>
//               </div>
//             </Col>

//             <Col
//               xs={12}
//               md={12}
//               lg={3}
//               className="d-flex justify-content-between mt-3"
//               style={{
//                 backgroundColor: "#3d3b52",
//                 borderRadius: "20px",
//                 marginTop: "2px",
//               }}
//             >
//               <div className="mt-1 pt-2">
//                 <img
//                   src={Pro1}
//                   className="rounded mx-auto d-block img-fluid"
//                   alt="img1"
//                   width="70%"
//                   height="50%"
//                 />
//                 <p
//                   style={{ textAlign: "center", color: "white" }}
//                   className="mt-4"
//                 >
//                   Product1
//                 </p>
//               </div>
//             </Col>
//           </Row>
//         </Container>
//       </div>

//           </>
//   );
// }
// export default Rental_products_view;


import React, { useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Container from "react-bootstrap/Container";
import { Row, Col, Button, Form } from "react-bootstrap";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Table from "react-bootstrap/Table";
import AddIcon from "../icons/add-icon.svg";
import UpdateIcon from "../icons/update-icon.svg";
import DeleteIcon from "@mui/icons-material/Delete";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import "./style.js";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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
  
function Rental_products_view() {
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit">
      Vechicle  
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="white"
    >
     View Salary
    </Link>
  ];
  const [showPurchaseForm, setShowPurchaseForm] = useState(false);
  const [showQuitForm, setShowQuitForm] = useState(false);
  const [selectedVal,setSelectedVal] = useState({})
  const handlePurchaseButtonClick = (val) => {
    if (val === "purchase") {
      setShowPurchaseForm(false);
      setShowQuitForm(false);
    } else if (val === "payment") {
      setShowPurchaseForm(false);
      setShowQuitForm(true);
    }
  };

  // useEffect to set the initial state
  useEffect(() => {
    setShowPurchaseForm(true);
    setShowQuitForm(false);
  }, []); // Empty dependency array ensures that this effect runs only once after the initial render

  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    setIsModalOpen(false);
  };

   // deletesection
   const deleteData=async()=>{
    let payload={
      productId:selectedVal?.product_id
    }
    // console.log(payload);
    await axios.post(`http://localhost/GVM_Backend/controllers/api/delete/rentalDelete.php`,payload).then(res=>{
      if(res.data.message==="deleted"){
        // alert("deleted succussfully");
        toast.success("Deleted Successfully!");
        setShowPurchaseForm(true);
        setShowQuitForm(true);
        fetchData()
      }
    }).catch(err=>{
      console.log(err);
    })
  }

  const handleCancelClick = () => {
    setShowPurchaseForm(true);
    setShowQuitForm(false);
  };

  // fetch axios
  const [purchaseData, setPurchaseData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost/GVM_Backend/controllers/api/get/viewRental.php"
      );
      setPurchaseData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


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
          <Col xs={12} md={8} lg={6} className="d-grid gap-2 mt-5">
          <Search className="search">
              <SearchIconWrapper>
                <SearchIcon className='searchicon'/>
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
            </Col>    
            <Col xs={12} md={8} lg={3} className="d-grid gap-2 mt-5 text-center">  
            <NavLink to="/rental_products_update" className="ul">
            <Button size="lg" style={{ backgroundColor: '#babaef', color: 'black',width:'100%' }}>           
                <img src={UpdateIcon} alt="update icon" className="updatebtn"/>
                Update</Button>
            </NavLink>
            </Col>
            <Col xs={12} md={8} lg={3} className="d-grid gap-2 mt-5 text-center">
            <NavLink to="/rental_products" className="ul">
            <Button size="lg" style={{backgroundColor:'white',color:'black',width:'100%'}}>
            <img src={AddIcon} alt="update icon" className="updatebtn"/>
              Add</Button>
            </NavLink>
            </Col>
          </Row>
        </Container>
      </div>

      <Row>
  <Col xs={12} md={8} lg={12} className="d-grid gap-2 mt-5">
    <div style={{ overflowX: "auto", maxWidth: "100%" }}>
      <Table bordered className="table-center">
        <thead>
          <tr>
          <th>product_quantity</th>
          <th>total_amount</th>
          <th>product_id</th>
          <th>product_name</th>
          <th>product_quantity1</th>
          <th>days</th>
          <th>date</th>
          <th>balance_amount</th>
          <th>payment_method</th>
          <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {purchaseData.map((purchase) => (
            <tr key={purchase.product_quantity}>
              <td>{purchase.product_quantity}</td>
            <td>{purchase.total_amount}</td>
            <td>{purchase.product_id}</td>
            <td>{purchase.product_name}</td>
            <td>{purchase.product_quantity1}</td>
            <td>{purchase.days}</td>
            <td>{purchase.date}</td>
            <td>{purchase.balance_amount}</td>
            <td>{purchase.payment_method}</td>
            <td>
                <button
                  style={{ border: "none", backgroundColor: "inherit" }}
                  onClick={() =>{ handlePurchaseButtonClick("purchase");setSelectedVal(purchase)}}
                >
                  <DeleteIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  </Col>
</Row>

      {showPurchaseForm ? (
        <div></div>
      ) : (
        isModalOpen && (
          <div>
            <Row>
              <Col
                xs={12}
                md={8}
                lg={{ span: 8, offset: 2 }}
                className="d-grid gap-2"
              >
                <Card
                  style={{
                    backgroundColor: "#232135",
                    marginTop: "-450px",
                    height: "300px",
                  }}
                >
                  <Card.Body
                    className="mt-5"
                    style={{ textAlign: "center", color: "white" }}
                  >
                    <Card.Title>Are you sure want to </Card.Title>
                    <Card.Title>Delete? </Card.Title>
                    <Row
                      style={{
                        textAlign: "center",
                        color: "white",
                        marginTop: "50px",
                      }}
                    >
                      <Col lg={{ span: 3, offset: 3 }} className="text-center">
                        <Button
                          size="lg"
                          variant="light"
                          className="w-100"
                          onClick={handleCancelClick}
                        >
                          Cancel
                        </Button>
                      </Col>
                      <Col lg={3} className="text-center">
                        <Button
                          size="lg"
                          variant="danger"
                          style={{ border: "none" }}
                          className="w-100"
                          onClick={deleteData}
                        >
                          Delete
                        </Button>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        )
      )}
 <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
      
  );
}
export default Rental_products_view;