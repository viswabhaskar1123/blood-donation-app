// screens/DonorDashboardScreen.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaTint, FaHistory, FaClipboardList, FaHandHoldingMedical } from 'react-icons/fa';
import { getDonorDashboardData } from '../actions/donorActions';
import Loader from '../components/layout/Loader';
import Message from '../components/layout/Message';

const DonorDashboardScreen = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const donorDashboard = useSelector((state) => state.donorDashboard);
  const { loading, error, data } = donorDashboard;

  useEffect(() => {
    if (userInfo && userInfo.role === 'donor') {
      dispatch(getDonorDashboardData());
    }
  }, [dispatch, userInfo]);

  return (
    <div className="fade-in">
      <h1 className="mb-4">Donor Dashboard</h1>
      <p className="lead">Welcome back, {userInfo?.name}! Thank you for your contribution to saving lives.</p>
      
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : data ? (
        <>
          <h2 className="my-4">Your Statistics</h2>
          <Row>
            <Col md={6}>
              <Card className="mb-4">
                <Card.Header as="h5">Donation Statistics</Card.Header>
                <Card.Body>
                  <Row>
                    <Col xs={6} md={3}>
                      <div className="text-center mb-3">
                        <h6>Total</h6>
                        <div className="stat-circle">{data.donations.total}</div>
                      </div>
                    </Col>
                    <Col xs={6} md={3}>
                      <div className="text-center mb-3">
                        <h6>Approved</h6>
                        <div className="stat-circle bg-success">{data.donations.approved}</div>
                      </div>
                    </Col>
                    <Col xs={6} md={3}>
                      <div className="text-center mb-3">
                        <h6>Pending</h6>
                        <div className="stat-circle bg-warning">{data.donations.pending}</div>
                      </div>
                    </Col>
                    <Col xs={6} md={3}>
                      <div className="text-center mb-3">
                        <h6>Rejected</h6>
                        <div className="stat-circle bg-danger">{data.donations.rejected}</div>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="mb-4">
                <Card.Header as="h5">Blood Request Statistics</Card.Header>
                <Card.Body>
                  <Row>
                    <Col xs={6} md={3}>
                      <div className="text-center mb-3">
                        <h6>Total</h6>
                        <div className="stat-circle">{data.requests.total}</div>
                      </div>
                    </Col>
                    <Col xs={6} md={3}>
                      <div className="text-center mb-3">
                        <h6>Approved</h6>
                        <div className="stat-circle bg-success">{data.requests.approved}</div>
                      </div>
                    </Col>
                    <Col xs={6} md={3}>
                      <div className="text-center mb-3">
                        <h6>Pending</h6>
                        <div className="stat-circle bg-warning">{data.requests.pending}</div>
                      </div>
                    </Col>
                    <Col xs={6} md={3}>
                      <div className="text-center mb-3">
                        <h6>Rejected</h6>
                        <div className="stat-circle bg-danger">{data.requests.rejected}</div>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <h2 className="my-4">Quick Actions</h2>
          <Row>
            <Col md={6} lg={3} className="mb-4">
              <Link to="/donor/donate" className="text-decoration-none">
                <Card className="action-card">
                  <Card.Body className="text-center">
                    <div className="action-icon">
                      <FaTint />
                    </div>
                    <h3>Donate Blood</h3>
                    <p>Submit a new blood donation request</p>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
            <Col md={6} lg={3} className="mb-4">
              <Link to="/donor/donation-history" className="text-decoration-none">
                <Card className="action-card">
                  <Card.Body className="text-center">
                    <div className="action-icon">
                      <FaHistory />
                    </div>
                    <h3>Donation History</h3>
                    <p>View your blood donation history</p>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
            <Col md={6} lg={3} className="mb-4">
              <Link to="/donor/request-blood" className="text-decoration-none">
                <Card className="action-card">
                  <Card.Body className="text-center">
                    <div className="action-icon">
                      <FaHandHoldingMedical />
                    </div>
                    <h3>Request Blood</h3>
                    <p>Submit a new blood request</p>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
            <Col md={6} lg={3} className="mb-4">
              <Link to="/donor/blood-request-history" className="text-decoration-none">
                <Card className="action-card">
                  <Card.Body className="text-center">
                    <div className="action-icon">
                      <FaClipboardList />
                    </div>
                    <h3>Request History</h3>
                    <p>View your blood request history</p>
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

export default DonorDashboardScreen;
