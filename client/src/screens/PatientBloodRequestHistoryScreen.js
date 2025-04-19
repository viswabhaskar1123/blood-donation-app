import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Badge } from 'react-bootstrap';
import { getPatientBloodRequestHistory } from '../actions/patientActions';
import Loader from '../components/layout/Loader';
import Message from '../components/layout/Message';

const PatientBloodRequestHistoryScreen = () => {
  const dispatch = useDispatch();

  const patientBloodRequestHistory = useSelector((state) => state.patientBloodRequestHistory);
  const { loading, error, requests } = patientBloodRequestHistory;

  useEffect(() => {
    dispatch(getPatientBloodRequestHistory());
  }, [dispatch]);

  const getStatusBadge = (status) => {
    if (status === 'pending') return <Badge bg="warning">Pending</Badge>;
    if (status === 'approved') return <Badge bg="success">Approved</Badge>;
    if (status === 'rejected') return <Badge bg="danger">Rejected</Badge>;
    return <Badge bg="secondary">{status}</Badge>;
  };

  return (
    <>
      <h1>My Blood Request History</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="table-responsive">
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>BLOOD GROUP</th>
                <th>UNITS</th>
                <th>REASON</th>
                <th>STATUS</th>
                <th>ADMIN NOTE</th>
              </tr>
            </thead>
            <tbody>
              {requests.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center">
                    No blood request history found
                  </td>
                </tr>
              ) : (
                requests.map((request) => (
                  <tr key={request._id}>
                    <td>{request._id}</td>
                    <td>{new Date(request.createdAt).toLocaleDateString()}</td>
                    <td>{request.bloodGroup}</td>
                    <td>{request.units}</td>
                    <td>{request.reason}</td>
                    <td>{getStatusBadge(request.status)}</td>
                    <td>{request.adminNote || '-'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>
      )}
    </>
  );
};

export default PatientBloodRequestHistoryScreen;
