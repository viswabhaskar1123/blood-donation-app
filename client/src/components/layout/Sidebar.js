// components/layout/Sidebar.js
import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Sidebar = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <div className="sidebar">
      {userInfo && userInfo.role === 'admin' && (
        <Nav className="flex-column">
          <Nav.Link as={Link} to="/admin/dashboard">Dashboard</Nav.Link>
          <Nav.Link as={Link} to="/admin/donors">Donors</Nav.Link>
          <Nav.Link as={Link} to="/admin/patients">Patients</Nav.Link>
          <Nav.Link as={Link} to="/admin/donation-requests">Donation Requests</Nav.Link>
          <Nav.Link as={Link} to="/admin/blood-requests">Blood Requests</Nav.Link>
          <Nav.Link as={Link} to="/admin/blood-stock">Blood Stock</Nav.Link>
        </Nav>
      )}

      {userInfo && userInfo.role === 'donor' && (
        <Nav className="flex-column">
          <Nav.Link as={Link} to="/donor/dashboard">Dashboard</Nav.Link>
          <Nav.Link as={Link} to="/donor/donate">Donate Blood</Nav.Link>
          <Nav.Link as={Link} to="/donor/donation-history">Donation History</Nav.Link>
          <Nav.Link as={Link} to="/donor/request-blood">Request Blood</Nav.Link>
          <Nav.Link as={Link} to="/donor/blood-request-history">Blood Request History</Nav.Link>
        </Nav>
      )}

      {userInfo && userInfo.role === 'patient' && (
        <Nav className="flex-column">
          <Nav.Link as={Link} to="/patient/dashboard">Dashboard</Nav.Link>
          <Nav.Link as={Link} to="/patient/request-blood">Request Blood</Nav.Link>
          <Nav.Link as={Link} to="/patient/blood-request-history">Blood Request History</Nav.Link>
        </Nav>
      )}
    </div>
  );
};

export default Sidebar;
