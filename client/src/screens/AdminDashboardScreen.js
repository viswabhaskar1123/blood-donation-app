// screens/AdminDashboardScreen.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaUserFriends, FaUserInjured, FaClipboardList, FaCheckCircle, FaTint, FaList, FaUsers, FaHospital } from 'react-icons/fa';
import { getAdminDashboardData } from '../actions/adminActions';
import Loader from '../components/layout/Loader';
import Message from '../components/layout/Message';

const AdminDashboardScreen = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const adminDashboard = useSelector((state) => state.adminDashboard);
  const { loading, error, data } = adminDashboard;

  useEffect(() => {
    if (userInfo && userInfo.role === 'admin') {
      dispatch(getAdminDashboardData());
    }
  }, [dispatch, userInfo]);

  return (
    <div className="fade-in">
      <h1 className="mb-4">Admin Dashboard</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : data ? (
        <>
          <Row className="my-4">
            <Col md={3}>
              <div className="stat-card donors">
                <div className="icon"><FaUserFriends /></div>
                <h3>Total Donors</h3>
                <div className="count">{data.donorCount}</div>
              </div>
            </Col>
            <Col md={3}>
              <div className="stat-card patients">
                <div className="icon"><FaUserInjured /></div>
                <h3>Total Patients</h3>
                <div className="count">{data.patientCount}</div>
              </div>
            </Col>
            <Col md={3}>
              <div className="stat-card requests">
                <div className="icon"><FaClipboardList /></div>
                <h3>Blood Requests</h3>
                <div className="count">{data.bloodRequestCount}</div>
              </div>
            </Col>
            <Col md={3}>
              <div className="stat-card approved">
                <div className="icon"><FaCheckCircle /></div>
                <h3>Approved Requests</h3>
                <div className="count">{data.approvedRequestCount}</div>
              </div>
            </Col>
          </Row>

          <h2 className="my-4">Blood Stock</h2>
          <Row>
            {data.bloodStock.map((blood) => (
              <Col key={blood._id} md={3} sm={6} className="mb-4">
                <div className="blood-group-card">
                  <div className="blood-drop" data-group={blood.bloodGroup}></div>
                  <div className="units-label">Available Units</div>
                  <div className="units-value">{blood.units}</div>
                  <Link to="/admin/blood-stock" className="update-btn">Update</Link>
                </div>
              </Col>
            ))}
          </Row>

          <h2 className="my-4">Quick Navigation</h2>
          <Row>
            <Col md={4} className="mb-4">
              <Link to="/admin/donors" className="text-decoration-none">
                <Card className="nav-card">
                  <Card.Body className="d-flex align-items-center">
                    <div className="nav-icon">
                      <FaUsers />
                    </div>
                    <div className="ms-3">
                      <h3>Manage Donors</h3>
                      <p className="mb-0">View, update, and delete donor records</p>
                    </div>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
            <Col md={4} className="mb-4">
              <Link to="/admin/patients" className="text-decoration-none">
                <Card className="nav-card">
                  <Card.Body className="d-flex align-items-center">
                    <div className="nav-icon">
                      <FaHospital />
                    </div>
                    <div className="ms-3">
                      <h3>Manage Patients</h3>
                      <p className="mb-0">View, update, and delete patient records</p>
                    </div>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
            <Col md={4} className="mb-4">
              <Link to="/admin/donation-requests" className="text-decoration-none">
                <Card className="nav-card">
                  <Card.Body className="d-flex align-items-center">
                    <div className="nav-icon">
                      <FaTint />
                    </div>
                    <div className="ms-3">
                      <h3>Donation Requests</h3>
                      <p className="mb-0">Manage blood donation requests</p>
                    </div>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
            <Col md={4} className="mb-4">
              <Link to="/admin/blood-requests" className="text-decoration-none">
                <Card className="nav-card">
                  <Card.Body className="d-flex align-items-center">
                    <div className="nav-icon">
                      <FaClipboardList />
                    </div>
                    <div className="ms-3">
                      <h3>Blood Requests</h3>
                      <p className="mb-0">Manage blood requests from donors and patients</p>
                    </div>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
            <Col md={4} className="mb-4">
              <Link to="/admin/blood-stock" className="text-decoration-none">
                <Card className="nav-card">
                  <Card.Body className="d-flex align-items-center">
                    <div className="nav-icon">
                      <FaList />
                    </div>
                    <div className="ms-3">
                      <h3>Blood Stock</h3>
                      <p className="mb-0">Manage blood inventory</p>
                    </div>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          </Row>
        </>
      ) : null}
    </div>
  );
};

export default AdminDashboardScreen;
