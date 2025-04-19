import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Badge, Modal, Form } from 'react-bootstrap';
import { listDonationRequests, updateDonationRequest } from '../../actions/adminActions';
import { DONATION_REQUEST_UPDATE_RESET } from '../../constants/adminConstants';
import Loader from '../layout/Loader';
import Message from '../layout/Message';

const DonationRequestsList = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentRequest, setCurrentRequest] = useState({});
  const [status, setStatus] = useState('');
  const [adminNote, setAdminNote] = useState('');

  const dispatch = useDispatch();

  const donationRequestList = useSelector((state) => state.donationRequestList);
  const { loading, error, donationRequests } = donationRequestList;

  const donationRequestUpdate = useSelector((state) => state.donationRequestUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = donationRequestUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: DONATION_REQUEST_UPDATE_RESET });
      setShowModal(false);
    }
    dispatch(listDonationRequests());
  }, [dispatch, successUpdate]);

  const handleUpdateStatus = (request) => {
    setCurrentRequest(request);
    setStatus(request.status);
    setAdminNote(request.adminNote || '');
    setShowModal(true);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateDonationRequest(currentRequest._id, status, adminNote));
  };

  const getStatusBadge = (status) => {
    if (status === 'pending') return <Badge bg="warning">Pending</Badge>;
    if (status === 'approved') return <Badge bg="success">Approved</Badge>;
    if (status === 'rejected') return <Badge bg="danger">Rejected</Badge>;
    return <Badge bg="secondary">{status}</Badge>;
  };

  return (
    <>
      {loadingUpdate && <Loader />}
      {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>DONOR</th>
              <th>BLOOD GROUP</th>
              <th>UNITS</th>
              <th>DISEASE</th>
              <th>DATE</th>
              <th>STATUS</th>
              <th>ADMIN NOTE</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {donationRequests.map((request) => (
              <tr key={request._id}>
                <td>{request._id}</td>
                <td>
                  {request.donor.name} <br />
                  <a href={`mailto:${request.donor.email}`}>{request.donor.email}</a>
                </td>
                <td>{request.bloodGroup}</td>
                <td>{request.units}</td>
                <td>{request.disease || 'None'}</td>
                <td>{new Date(request.createdAt).toLocaleDateString()}</td>
                <td>{getStatusBadge(request.status)}</td>
                <td>{request.adminNote || '-'}</td>
                <td>
                  <Button
                    variant="primary"
                    className="btn-sm"
                    onClick={() => handleUpdateStatus(request)}
                  >
                    Update Status
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Update Status Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Donation Request Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="status" className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              >
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="adminNote" className="mb-3">
              <Form.Label>Admin Note</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter note (optional)"
                value={adminNote}
                onChange={(e) => setAdminNote(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DonationRequestsList;
