import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../layout/Message';
import Loader from '../layout/Loader';
import { createDonorBloodRequest } from '../../actions/donorActions';
import { getBloodStock } from '../../actions/bloodActions';
import { DONOR_BLOOD_REQUEST_CREATE_RESET } from '../../constants/donorConstants';

const BloodRequestForm = () => {
  const [bloodGroup, setBloodGroup] = useState('A+');
  const [units, setUnits] = useState(1);
  const [reason, setReason] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const bloodStock = useSelector((state) => state.bloodStock);
  const { loading: loadingStock, bloodStock: bloodGroups } = bloodStock;

  const donorBloodRequestCreate = useSelector((state) => state.donorBloodRequestCreate);
  const { loading, error, success } = donorBloodRequestCreate;

  useEffect(() => {
    dispatch(getBloodStock());

    if (success) {
      dispatch({ type: DONOR_BLOOD_REQUEST_CREATE_RESET });
      navigate('/donor/blood-request-history');
    }
  }, [dispatch, navigate, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createDonorBloodRequest({ bloodGroup, units, reason }));
  };

  return (
    <>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      
      {loadingStock ? (
        <Loader />
      ) : (
        <div className="mb-4">
          <h4>Available Blood Stock</h4>
          <div className="d-flex flex-wrap">
            {bloodGroups && bloodGroups.map((blood) => (
              <div key={blood._id} className="me-3 mb-3 p-3 border rounded">
                <strong>{blood.bloodGroup}:</strong> {blood.units} units
              </div>
            ))}
          </div>
        </div>
      )}
      
      <Form onSubmit={submitHandler} className="form-container">
        <Form.Group controlId="bloodGroup" className="mb-3">
          <Form.Label>Blood Group</Form.Label>
          <Form.Select
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            required
          >
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="units" className="mb-3">
          <Form.Label>Units Required</Form.Label>
          <Form.Control
            type="number"
            min="1"
            placeholder="Enter units"
            value={units}
            onChange={(e) => setUnits(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="reason" className="mb-3">
          <Form.Label>Reason for Request</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter reason for blood request"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-3">
          Submit Request
        </Button>
      </Form>
    </>
  );
};

export default BloodRequestForm;
