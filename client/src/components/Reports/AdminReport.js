import React, { useEffect, useState } from 'react';
import { $authHost, $host } from "../../http/index";
import { Button } from 'react-bootstrap';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable'; 
import Badge from 'react-bootstrap/Badge';
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

  const generatePDFReport = () => {
    const doc = new jsPDF();

    doc.text('Users Report', 10, 10); 

    
    const userData = users.map(user => [
      user.id,       
      user.email,    
      user.role,     
      new Date(user.createdAt).toLocaleString()   
    ]);

    
    doc.autoTable({
      head: [['ID', 'Email', 'Role', 'Created At']],
      body: userData,
      startY: 20,
    });

    doc.save('users_report.pdf'); 
  };

  return (
  
    <div className='mt-5 ms-5'>  <Badge bg="secondary">
      <Button className='ms' variant='outline-light' onClick={generatePDFReport}>
        Users Report
      </Button></Badge>
    </div>
  );
};

export default UsersReport;
