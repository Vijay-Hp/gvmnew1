import React, { useState, useEffect } from "react";
import { Button, Col, Row, Table, Modal, Form } from "react-bootstrap";
import { saveAs } from 'file-saver';
import { Document, pdf, Page, Text, View } from '@react-pdf/renderer';

const DownloadButton = ({ showDownloadModal, setShowDownloadModal, sortedData, purchaseData }) => {
  const [selectedFields, setSelectedFields] = useState([]);
  const generatePDF = () => {
    const selectedFieldsData = purchaseData.map(purchase => {
      const selectedPurchaseData = {};
      selectedFields.forEach(field => {
        selectedPurchaseData[field] = purchase[field];
      });
      return selectedPurchaseData;
    });

    const MyDocument = (
      <Document>
        <Page size="A4">
          <View>
            <Table>
              <thead>
                <tr>
                  {selectedFields.map(field => (
                    <Text key={field}>{field}</Text>
                  ))}
                </tr>
              </thead>
              <tbody>
                {selectedFieldsData.map((purchase, index) => (
                  <tr key={index}>
                    {selectedFields.map(field => (
                      <Text key={field}>{purchase[field]}</Text>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          </View>
        </Page>
      </Document>
    );

    const pdfBlob = pdf(MyDocument).toBlob();
    pdfBlob.then(function (blob) {
      saveAs(blob, 'purchase_data.pdf');
    });

    setShowDownloadModal(false); // Close the modal after downloading
  };

  return (
    <Modal show={showDownloadModal} onHide={() => setShowDownloadModal(false)} style={{ marginTop: "80px" }}>
  <Modal.Dialog>
    <Modal.Header closeButton>
      <Modal.Title>Select Download Fields</Modal.Title>
      <Form.Check
          type="checkbox"
          label="Select All"
          style={{marginLeft:"50px"}}
          checked={selectedFields.length === Object.keys(sortedData().length > 0 ? sortedData()[0] : {}).length}
          onChange={(e) => {
            if (e.target.checked) {
              const allFields = Object.keys(sortedData().length > 0 ? sortedData()[0] : {});
              setSelectedFields(allFields);
            } else {
              setSelectedFields([]);
            }
          }}
        />
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Row>
          {Object.keys(sortedData().length > 0 ? sortedData()[0] : {}).map(field => (
            <Col key={field} xs={4} >
              <Form.Check
                type="checkbox"
                label={field}
                checked={selectedFields.includes(field)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedFields([...selectedFields, field]);
                  } else {
                    setSelectedFields(selectedFields.filter(f => f !== field));
                  }
                }}
              />
            </Col>
          ))}
        </Row>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button style={{backgroundColor:"grey"}} onClick={() => setShowDownloadModal(false)}>
        Close
      </Button>
      <Button style={{backgroundColor:"green"}} onClick={generatePDF}>
        Confirm Download
      </Button>
    </Modal.Footer>
  </Modal.Dialog>
</Modal>
  );
};

export default DownloadButton;
