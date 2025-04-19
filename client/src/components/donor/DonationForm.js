import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../layout/Message';
import Loader from '../layout/Loader';
import { createDonationRequest } from '../../actions/donorActions';
import { DONATION_CREATE_RESET } from '../../constants/donorConstants';

const DonationForm = () => {
  const [units, setUnits] = useState(1);
  const [disease, setDisease] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const donationCreate = useSelector((state) => state.donationCreate);
  const { loading, error, success } = donationCreate;

  useEffect(() => {
    if (success) {
      dispatch({ type: DONATION_CREATE_RESET });
      navigate('/donor/donation-history');
    }
  }, [dispatch, navigate, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createDonationRequest({ units, disease }));
  };

  return (
    <>
      <h2>Donate Blood</h2>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler} className="form-container">
        <Form.Group controlId="units" className="mb-3">
          <Form.Label>Units to Donate</Form.Label>
          <Form.Control
            type="number"
            min="1"
            placeholder="Enter units"
            value={units}
            onChange={(e) => setUnits(e.target.value)}
            required
          ></Form.Control>
          <Form.Text className="text-muted">
            1 unit is approximately 450-500 ml of blood
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="disease" className="mb-3">
          <Form.Label>Do you have any disease? (Optional)</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter disease if any"
            value={disease}
            onChange={(e) => setDisease(e.target.value)}
          ></Form.Control>
          <Form.Text className="text-muted">
            Please mention if you have any disease or are taking any medication
          </Form.Text>
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-3">
          Submit Donation Request
        </Button>
      </Form>
    </>
  );
};

export default DonationForm;
