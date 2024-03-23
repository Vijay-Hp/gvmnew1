import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Table from "react-bootstrap/Table";
import axios from "axios";

export const DashboardContent = (props) => {
  return (
    <>
      <Card sx={{ minWidth: 275, backgroundColor: "#232135" }}>
        <CardContent>
          <Typography
            sx={{ fontSize: "20px", color: "white" }}
            color="text.secondary"
            gutterBottom
          >
            {props.title}
          </Typography>
          <hr className="line" />
          <div className="dashboard">
            <img
              src={props.img}
              className="box"
              style={{ marginTop: "-50px", marginRight: "-20px" }}
              alt="Dashboard Image"
            />
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export const TableContent = ({ data }) => {
  const [purchaseData, setPurchaseData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost/GVM_Backend/controllers/api/get/viewPurchase.php"
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
    <Table bordered>
      <thead>
        <tr>
          <th>purchase_id</th>
          <th>vendor_type</th>
          <th>vendor_name</th>
          <th>product_name</th>
        </tr>
      </thead>
      <tbody>
        {purchaseData.map((purchase) => (
          <tr key={purchase.purchase_id}>
            <td>{purchase.purchase_id}</td>
            <td>{purchase.vendor_type}</td>
            <td>{purchase.vendor_name}</td>
            <td>{purchase.product_name}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export const TableContent1 = ({ data }) => {
  const tableHeadStyle = {
    backgroundColor: "#3d3b52",
    color: "white",
    padding: "10px",
  };
  const [purchaseData, setPurchaseData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost/GVM_Backend/controllers/api/get/viewConstruction.php"
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
    <Table bordered>
      <thead>
        <tr>
          <th style={tableHeadStyle}>Building Name</th>
          <th style={tableHeadStyle}>Location</th>
        </tr>
      </thead>
      <tbody>
        {purchaseData.map((purchase) => (
          <tr key={purchase.building_name}>
            <td>{purchase.building_name}</td>
            <td>{purchase.location}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export const TableContent2 = ({ data }) => {
  const tableHeadStyle = {
    backgroundColor: "#3d3b52",
    color: "white",
    padding: "10px",
  };
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
    <Table bordered>
      <thead>
        <tr>
          <th style={tableHeadStyle}>Product Name</th>
          <th style={tableHeadStyle}>days</th>
        </tr>
      </thead>
      <tbody>
        {purchaseData.map((purchase) => (
          <tr key={purchase.product_name}>
            <td>{purchase.product_name}</td>
            <td>{purchase.days}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
// export const TableContent2 = ({ data }) => {
//   const tableHeadStyle = {
//     backgroundColor: "#3d3b52",
//     color: "white",
//     padding: "10px",
//   };
//   const [purchaseData, setPurchaseData] = useState([]);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost/GVM_Backend/controllers/api/get/viewRental.php"
//       );
//       setPurchaseData(response.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);
//   return (
//     <Table bordered>
//       <thead>
//         <tr>
//           <th style={tableHeadStyle}>Product Name</th>
//           <th style={tableHeadStyle}>Days</th>
//         </tr>
//       </thead>
//       <tbody>

//       {purchaseData.lenght>0 && purchaseData.map((purchase) => (
//             <tr key={purchase.product_name}>
//               <td>{purchase.product_name}</td>
//               <td>{purchase.days}</td>
//               </tr>
//           ))}
//       </tbody>
//     </Table>
//   );
// };

export const TableContent3 = ({ data }) => {
  const tableHeadStyle = {
    backgroundColor: "#3d3b52",
    color: "white",
    padding: "10px",
  };
  const [purchaseData, setPurchaseData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost/GVM_Backend/controllers/api/get/viewSalary.php"
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
    <Table bordered>
      <thead>
        <tr>
          <th style={tableHeadStyle}>Employee Name</th>
          <th style={tableHeadStyle}>Balance Amount</th>
        </tr>
      </thead>
      <tbody>
        {purchaseData.map((purchase) => (
          <tr key={purchase.employee_name}>
            <td>{purchase.employee_name}</td>
            <td>{purchase.balance_amount}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export const TableContent4 = ({ data }) => {
  const tableHeadStyle = {
    backgroundColor: "#3d3b52",
    color: "white",
    padding: "10px",
  };
  const [purchaseData, setPurchaseData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost/GVM_Backend/controllers/api/get/viewSales.php"
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
    <Table bordered>
      <thead>
        <tr>
          <th style={tableHeadStyle}>Product Name</th>
          <th style={tableHeadStyle}>Balance Amount</th>
        </tr>
      </thead>
      <tbody>
        {purchaseData.map((purchase) => (
          <tr key={purchase.product_name}>
            <td>{purchase.product_name}</td>
            <td>{purchase.balance_amount}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
