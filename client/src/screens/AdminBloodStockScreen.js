import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Form, Modal, Row, Col, Card } from 'react-bootstrap';
import { getBloodStock, updateBloodStock } from '../actions/bloodActions';
import { BLOOD_STOCK_UPDATE_RESET } from '../constants/adminConstants';
import Loader from '../components/layout/Loader';
import Message from '../components/layout/Message';

const AdminBloodStockScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentBloodGroup, setCurrentBloodGroup] = useState('');
  const [units, setUnits] = useState(0);

  const dispatch = useDispatch();

  const bloodStock = useSelector((state) => state.bloodStock);
  const { loading, error, bloodStock: bloodGroups } = bloodStock;

  const bloodStockUpdate = useSelector((state) => state.bloodStockUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = bloodStockUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: BLOOD_STOCK_UPDATE_RESET });
      setShowModal(false);
    }
    dispatch(getBloodStock());
  }, [dispatch, successUpdate]);

  const handleUpdateStock = (bloodGroup) => {
    setCurrentBloodGroup(bloodGroup.bloodGroup);
    setUnits(bloodGroup.units);
    setShowModal(true);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateBloodStock(currentBloodGroup, units));
  };

  return (
    <>
      <h1>Blood Stock Management</h1>
      {loadingUpdate && <Loader />}
      {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row className="my-4">
            {bloodGroups.map((blood) => (
              <Col key={blood._id} md={3} className="mb-4">
                <Card className="text-center blood-group-card">
                  <Card.Header as="h5">{blood.bloodGroup}</Card.Header>
                  <Card.Body>
                    <Card.Title>{blood.units} Units</Card.Title>
                    <Button
                      variant="primary"
                      className="mt-2"
                      onClick={() => handleUpdateStock(blood)}
                    >
                      Update
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <Table striped bordered hover responsive className="table-sm mt-4">
            <thead>
              <tr>
                <th>BLOOD GROUP</th>
                <th>UNITS AVAILABLE</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {bloodGroups.map((blood) => (
                <tr key={blood._id}>
                  <td>{blood.bloodGroup}</td>
                  <td>{blood.units}</td>
                  <td>
                    <Button
                      variant="primary"
                      className="btn-sm"
                      onClick={() => handleUpdateStock(blood)}
                    >
                      Update
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}

      {/* Update Stock Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Blood Stock: {currentBloodGroup}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="units" className="mb-3">
              <Form.Label>Units</Form.Label>
              <Form.Control
                type="number"
                min="0"
                placeholder="Enter units"
                value={units}
                onChange={(e) => setUnits(e.target.value)}
                required
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

export default AdminBloodStockScreen;
