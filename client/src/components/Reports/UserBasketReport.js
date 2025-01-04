import React from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import Badge from 'react-bootstrap/Badge';
import { useNavigate } from 'react-router-dom';
import { Col, Row,Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
const UserBasketReport = () => {
    const location = useLocation();
  const { basketItems, goodsData, user, totalPrice } = location.state;
  const generatePDFReport = () => {
    const doc = new jsPDF();
    if (!user || !user.email) {
        alert("User data is missing or not loaded properly.");
        return;
      }
      
    
    doc.text('Basket Order Report', 10, 10); 
    doc.text(`Owner: ${user.email}`, 10, 20);  

    const basketData = basketItems.map(item => {
      const good = goodsData[item];
      return [
        good ? good.name : 'Loading...',  
        good ? `$${good.price}` : 'Loading...', 
      ];
    });

    doc.autoTable({
        head: [['Name of Product', 'Price']],
      body: basketData, 
      startY: 30, 
    });

    
    doc.text(`Total Price: $${totalPrice}`, 10, doc.lastAutoTable.finalY + 10);  
    doc.save('basket_report.pdf');
  };
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1); 
  };
  
  return (
    <div className='d-flex mt-5 ms-5'>
        
        <Row className='d-flex m-2'><h1 style={{
  fontSize: '36px',
  fontWeight: 'bold',
  color: '#333',
  textAlign: 'center',  
  textTransform: 'uppercase'
}}>Basket Report</h1>
        <Col className='mt-2' md={9}><Row><Badge bg="secondary">
      <h2 className='mt-2'>Basket Report</h2>
      <Button className='ms-3 mb-2' onClick={generatePDFReport}>Download Report</Button>
      </Badge></Row></Col>
      <Row className='mt-2' md={2}>
      <Badge bg="secondary"><h4 className='mt-2'>You are done</h4>
      <Button variant="danger" onClick={handleBack} className="ms-auto mb-2">
       Return
      </Button>
      </Badge></Row>
    </Row>
    </div>
  );
};

export default UserBasketReport;
