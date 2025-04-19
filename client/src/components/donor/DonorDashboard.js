import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Card } from 'react-bootstrap';
import { getDonorDashboardData } from '../../actions/donorActions';
import Loader from '../layout/Loader';
import Message from '../layout/Message';

const DonorDashboard = () => {
  const dispatch = useDispatch();

  const donorDashboard = useSelector((state) => state.donorDashboard);
  const { loading, error, data } = donorDashboard;

  useEffect(() => {
    dispatch(getDonorDashboardData());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : data ? (
        <>
          <h2 className="my-4">Donation Statistics</h2>
          <Row>
            <Col md={3}>
              <Card className="dashboard-card">
                <Card.Body>
                  <h3>Total Donations</h3>
                  <div className="count">{data.donations.total}</div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="dashboard-card">
                <Card.Body>
                  <h3>Approved</h3>
                  <div className="count">{data.donations.approved}</div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="dashboard-card">
                <Card.Body>
                  <h3>Pending</h3>
                  <div className="count">{data.donations.pending}</div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="dashboard-card">
                <Card.Body>
                  <h3>Rejected</h3>
                  <div className="count">{data.donations.rejected}</div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <h2 className="my-4">Blood Request Statistics</h2>
          <Row>
            <Col md={3}>
              <Card className="dashboard-card">
                <Card.Body>
                  <h3>Total Requests</h3>
                  <div className="count">{data.requests.total}</div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="dashboard-card">
                <Card.Body>
                  <h3>Approved</h3>
                  <div className="count">{data.requests.approved}</div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="dashboard-card">
                <Card.Body>
                  <h3>Pending</h3>
                  <div className="count">{data.requests.pending}</div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="dashboard-card">
                <Card.Body>
                  <h3>Rejected</h3>
                  <div className="count">{data.requests.rejected}</div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      ) : null}
    </>
  );
};

export default DonorDashboard;
