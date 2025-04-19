import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Row, Col, Form, Modal } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { listDonors, updateDonor, deleteDonor } from '../../actions/adminActions';
import { DONOR_UPDATE_RESET } from '../../constants/adminConstants';
import Loader from '../layout/Loader';
import Message from '../layout/Message';

const DonorsList = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentDonor, setCurrentDonor] = useState({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [disease, setDisease] = useState('');

  const dispatch = useDispatch();

  const donorList = useSelector((state) => state.donorList);
  const { loading, error, donors } = donorList;

  const donorUpdate = useSelector((state) => state.donorUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = donorUpdate;

  const donorDelete = useSelector((state) => state.donorDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = donorDelete;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: DONOR_UPDATE_RESET });
      setShowEditModal(false);
    }
    dispatch(listDonors());
  }, [dispatch, successUpdate, successDelete]);

  const handleEdit = (donor) => {
    setCurrentDonor(donor);
    setName(donor.name);
    setEmail(donor.email);
    setPhone(donor.phone);
    setBloodGroup(donor.bloodGroup);
    setAge(donor.age);
    setGender(donor.gender);
    setAddress(donor.address);
    setDisease(donor.disease || '');
    setShowEditModal(true);
  };

  const handleDelete = (donor) => {
    setCurrentDonor(donor);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    dispatch(deleteDonor(currentDonor._id));
    setShowDeleteModal(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateDonor({
        _id: currentDonor._id,
        name,
        email,
        phone,
        bloodGroup,
        age,
        gender,
        address,
        disease,
      })
    );
  };

  return (
    <>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
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
              <th>NAME</th>
              <th>EMAIL</th>
              <th>PHONE</th>
              <th>BLOOD GROUP</th>
              <th>AGE</th>
              <th>GENDER</th>
              <th>DISEASE</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {donors.map((donor) => (
              <tr key={donor._id}>
                <td>{donor._id}</td>
                <td>{donor.name}</td>
                <td>
                  <a href={`mailto:${donor.email}`}>{donor.email}</a>
                </td>
                <td>{donor.phone}</td>
                <td>{donor.bloodGroup}</td>
                <td>{donor.age}</td>
                <td>{donor.gender}</td>
                <td>{donor.disease || 'None'}</td>
                <td>
                  <Button
                    variant="light"
                    className="btn-sm mx-1"
                    onClick={() => handleEdit(donor)}
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    variant="danger"
                    className="btn-sm mx-1"
                    onClick={() => handleDelete(donor)}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Donor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="phone" className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Row>
              <Col md={4}>
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
              </Col>
              <Col md={4}>
                <Form.Group controlId="age" className="mb-3">
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="gender" className="mb-3">
                  <Form.Label>Gender</Form.Label>
                  <Form.Select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId="address" className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="disease" className="mb-3">
              <Form.Label>Disease (if any)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter disease if any"
                value={disease}
                onChange={(e) => setDisease(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete donor {currentDonor.name}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DonorsList;
