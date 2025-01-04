import React, { useEffect, useState } from 'react';
import { $authHost} from "../../http/index";
import { Col, Row,Button } from 'react-bootstrap';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable'; 
import Badge from 'react-bootstrap/Badge';
import { useNavigate } from 'react-router-dom';

const UsersReport = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    
    const fetchUsers = async () => {
      try {
        const response = await $authHost.get('/api/user/users/report');
        setUsers(response.data);
      } catch (error) {
        console.error('Ошибка при получении данных о пользователях:', error);
      }
    };

    fetchUsers();
  }, []);

  const generatePDFReportU = () => {
    const doc = new jsPDF();

    doc.text('Users Report', 10, 10); 

    
    const userData = users.map(user => [
      user.id,       
      user.email,    
      user.role,     
     user.createdAt ? new Date(user.createdAt).toLocaleString() : 'N/A'
    ]);

    
    doc.autoTable({
      head: [['ID', 'Email', 'Role', 'Created At']],
      body: userData,
      startY: 20,
    });

    doc.save('users_report.pdf'); 
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
}}>Admin Report</h1>
      <Col className='mt-2' md={9}><Row><Badge bg="secondary">
        <h2 className='mt-2'>Click to download</h2>
        <Button className='ms-3 mb-2' variant='outline-light' onClick={generatePDFReportU}>
          Download Report
        </Button>
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

export default UsersReport;
