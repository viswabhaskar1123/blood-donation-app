import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Card } from 'react-bootstrap';
import { getPatientDashboardData } from '../../actions/patientActions';
import Loader from '../layout/Loader';
import Message from '../layout/Message';

const PatientDashboard = () => {
  const dispatch = useDispatch();

  const patientDashboard = useSelector((state) => state.patientDashboard);
  const { loading, error, data } = patientDashboard;

  useEffect(() => {
    dispatch(getPatientDashboardData());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : data ? (
        <>
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

export default PatientDashboard;
