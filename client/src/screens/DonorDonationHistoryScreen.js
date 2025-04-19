import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Badge } from 'react-bootstrap';
import { getDonationHistory } from '../actions/donorActions';
import Loader from '../components/layout/Loader';
import Message from '../components/layout/Message';

const DonorDonationHistoryScreen = () => {
  const dispatch = useDispatch();

  const donationHistory = useSelector((state) => state.donationHistory);
  const { loading, error, donations } = donationHistory;

  useEffect(() => {
    dispatch(getDonationHistory());
  }, [dispatch]);

  const getStatusBadge = (status) => {
    if (status === 'pending') return <Badge bg="warning">Pending</Badge>;
    if (status === 'approved') return <Badge bg="success">Approved</Badge>;
    if (status === 'rejected') return <Badge bg="danger">Rejected</Badge>;
    return <Badge bg="secondary">{status}</Badge>;
  };

  return (
    <>
      <h1>My Donation History</h1>
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
                <th>DISEASE</th>
                <th>STATUS</th>
                <th>ADMIN NOTE</th>
              </tr>
            </thead>
            <tbody>
              {donations.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center">
                    No donation history found
                  </td>
                </tr>
              ) : (
                donations.map((donation) => (
                  <tr key={donation._id}>
                    <td>{donation._id}</td>
                    <td>{new Date(donation.createdAt).toLocaleDateString()}</td>
                    <td>{donation.bloodGroup}</td>
                    <td>{donation.units}</td>
                    <td>{donation.disease || 'None'}</td>
                    <td>{getStatusBadge(donation.status)}</td>
                    <td>{donation.adminNote || '-'}</td>
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

export default DonorDonationHistoryScreen;
