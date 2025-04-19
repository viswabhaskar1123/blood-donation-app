// screens/PatientDashboardScreen.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaHandHoldingMedical, FaHistory, FaTint } from 'react-icons/fa';
import { getPatientDashboardData } from '../actions/patientActions';
import { getBloodStock } from '../actions/bloodActions';
import Loader from '../components/layout/Loader';
import Message from '../components/layout/Message';

const PatientDashboardScreen = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const patientDashboard = useSelector((state) => state.patientDashboard);
  const { loading, error, data } = patientDashboard;

  const bloodStock = useSelector((state) => state.bloodStock);
  const { loading: loadingStock, error: errorStock, bloodStock: bloodGroups } = bloodStock;

  useEffect(() => {
    if (userInfo && userInfo.role === 'patient') {
      dispatch(getPatientDashboardData());
      dispatch(getBloodStock());
    }
  }, [dispatch, userInfo]);

  return (
    <div className="fade-in">
      <h1 className="mb-4">Patient Dashboard</h1>
      <p className="lead">Welcome, {userInfo?.name}! We're here to help you with your blood needs.</p>
      
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : data ? (
        <>
          <h2 className="my-4">Your Blood Request Statistics</h2>
          <Row>
            <Col md={3}>
              <Card className="dashboard-card">
                <Card.Body className="text-center">
                  <h3>Total Requests</h3>
                  <div className="count">{data.requests.total}</div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="dashboard-card">
                <Card.Body className="text-center">
                  <h3>Approved</h3>
                  <div className="count text-success">{data.requests.approved}</div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="dashboard-card">
                <Card.Body className="text-center">
                  <h3>Pending</h3>
                  <div className="count text-warning">{data.requests.pending}</div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="dashboard-card">
                <Card.Body className="text-center">
                  <h3>Rejected</h3>
                  <div className="count text-danger">{data.requests.rejected}</div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <h2 className="my-4">Available Blood Stock</h2>
          {loadingStock ? (
            <Loader />
          ) : errorStock ? (
            <Message variant="danger">{errorStock}</Message>
          ) : (
            <Row>
              {bloodGroups && bloodGroups.map((blood) => (
                <Col key={blood._id} md={3} sm={6} className="mb-4">
                  <div className="blood-group-card">
                    <div className="blood-drop" data-group={blood.bloodGroup}></div>
                    <div className="units-label">Available Units</div>
                    <div className="units-value">{blood.units}</div>
                  </div>
                </Col>
              ))}
            </Row>
          )}

          <h2 className="my-4">Quick Actions</h2>
          <Row>
            <Col md={6} className="mb-4">
              <Link to="/patient/request-blood" className="text-decoration-none">
                <Card className="action-card">
                  <Card.Body className="d-flex align-items-center">
                    <div className="action-icon me-4">
                      <FaHandHoldingMedical />
                    </div>
                    <div>
                      <h3>Request Blood</h3>
                      <p className="mb-0">Submit a new blood request based on your needs</p>
                    </div>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
            <Col md={6} className="mb-4">
              <Link to="/patient/blood-request-history" className="text-decoration-none">
                <Card className="action-card">
                  <Card.Body className="d-flex align-items-center">
                    <div className="action-icon me-4">
                      <FaHistory />
                    </div>
                    <div>
                      <h3>Request History</h3>
                      <p className="mb-0">View your blood request history and status</p>
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

export default PatientDashboardScreen;
