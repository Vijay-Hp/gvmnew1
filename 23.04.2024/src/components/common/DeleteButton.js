import React, { useState, useEffect } from "react";
import { Button, Col, Row, Card } from "react-bootstrap";
import DeleteIcon from "@mui/icons-material/Delete"; // Import DeleteIcon from Material-UI
import axios from "axios";
import { toast } from "react-toastify";

function DeleteButton({ purchase }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [purchaseData, setPurchaseData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: '' });
    const [showDownloadModal, setShowDownloadModal] = useState(false);
    const [selectedFields, setSelectedFields] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(true);
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
  
    useEffect(() => {
      setShowPurchaseForm(true);
      setShowQuitForm(false);
    }, []); 
  
  
  
    const deleteData=async()=>{
      let payload={
        purchaseId:selectedVal?.purchase_id
      }
      // console.log(payload);
      await axios.post(`http://localhost/GVM_Backend/controllers/api/delete/purchaseDelete.php`,payload).then(res=>{
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
    useEffect(() => {
        fetchData();
      }, []);
    
      const fetchData = async () => {
        try {
          const response = await axios.get(
            "http://localhost/GVM_Backend/controllers/api/get/viewPurchase.php"
          );
          setPurchaseData(response.data);
          setFilteredData(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  return (
    <>
    <div>
      <Button
        style={{ border: "none", backgroundColor: "inherit", color: "black", display: "inline-block" }}
        onClick={() => {
          handlePurchaseButtonClick("purchase");
          setSelectedVal(purchase);
        }}
      >
        <DeleteIcon />
      </Button>
</div>
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
    </>
  );
}

export default DeleteButton;
