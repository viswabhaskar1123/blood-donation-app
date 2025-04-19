// components/layout/Header.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';
import { FaSignOutAlt, FaUser } from 'react-icons/fa';
import { logout } from '../../actions/authActions';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand as={Link} to="/">Blood Bank Management</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {userInfo ? (
                <>
                  {userInfo.role === 'admin' && (
                    <NavDropdown title={`Admin: ${userInfo.name}`} id="admin-menu">
                      <NavDropdown.Item as={Link} to="/admin/dashboard">Dashboard</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/admin/donors">Donors</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/admin/patients">Patients</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/admin/donation-requests">Donation Requests</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/admin/blood-requests">Blood Requests</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/admin/blood-stock">Blood Stock</NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item onClick={logoutHandler}>
                        <FaSignOutAlt className="me-2" /> Logout
                      </NavDropdown.Item>
                    </NavDropdown>
                  )}

                  {userInfo.role === 'donor' && (
                    <NavDropdown title={`Donor: ${userInfo.name}`} id="donor-menu">
                      <NavDropdown.Item as={Link} to="/donor/dashboard">Dashboard</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/donor/donate">Donate Blood</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/donor/donation-history">Donation History</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/donor/request-blood">Request Blood</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/donor/blood-request-history">Blood Request History</NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item onClick={logoutHandler}>
                        <FaSignOutAlt className="me-2" /> Logout
                      </NavDropdown.Item>
                    </NavDropdown>
                  )}

                  {userInfo.role === 'patient' && (
                    <NavDropdown title={`Patient: ${userInfo.name}`} id="patient-menu">
                      <NavDropdown.Item as={Link} to="/patient/dashboard">Dashboard</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/patient/request-blood">Request Blood</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/patient/blood-request-history">Blood Request History</NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item onClick={logoutHandler}>
                        <FaSignOutAlt className="me-2" /> Logout
                      </NavDropdown.Item>
                    </NavDropdown>
                  )}
                  
                  {/* Standalone logout button for better visibility */}
                  <Button 
                    variant="outline-light" 
                    className="ms-2 d-flex align-items-center" 
                    onClick={logoutHandler}
                  >
                    <FaSignOutAlt className="me-2" /> Logout
                  </Button>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/login">
                    <FaUser className="me-1" /> Login
                  </Nav.Link>
                  <NavDropdown title="Register" id="register-menu">
                    <NavDropdown.Item as={Link} to="/admin/register">Admin</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/donor/register">Donor</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/patient/register">Patient</NavDropdown.Item>
                  </NavDropdown>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
