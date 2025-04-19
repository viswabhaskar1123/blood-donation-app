import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Card } from 'react-bootstrap';
import { getAdminDashboardData } from '../../actions/adminActions';
import Loader from '../layout/Loader';
import Message from '../layout/Message';

const AdminDashboard = () => {
  const dispatch = useDispatch();

  const adminDashboard = useSelector((state) => state.adminDashboard);
  const { loading, error, data } = adminDashboard;

  useEffect(() => {
    dispatch(getAdminDashboardData());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : data ? (
        <>
          <Row className="my-4">
            <Col md={3}>
              <Card className="dashboard-card">
                <Card.Body>
                  <h3>Total Donors</h3>
                  <div className="count">{data.donorCount}</div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="dashboard-card">
                <Card.Body>
                  <h3>Total Patients</h3>
                  <div className="count">{data.patientCount}</div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="dashboard-card">
                <Card.Body>
                  <h3>Blood Requests</h3>
                  <div className="count">{data.bloodRequestCount}</div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="dashboard-card">
                <Card.Body>
                  <h3>Approved Requests</h3>
                  <div className="count">{data.approvedRequestCount}</div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <h2 className="my-4">Blood Stock</h2>
          <Row>
            {data.bloodStock.map((blood) => (
              <Col key={blood._id} md={3} className="mb-4">
                <Card className="text-center blood-group-card">
                  <Card.Header as="h5">{blood.bloodGroup}</Card.Header>
                  <Card.Body>
                    <Card.Title>{blood.units} Units</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <Card className="dashboard-card mt-4">
            <Card.Body>
              <h3>Total Blood Units Available</h3>
              <div className="count">{data.totalBloodUnits}</div>
            </Card.Body>
          </Card>
        </>
      ) : null}
    </>
  );
};

export default AdminDashboard;
