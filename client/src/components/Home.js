// components/Home.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaHandHoldingMedical, FaUserInjured, FaUserShield } from 'react-icons/fa';
import { getBloodStock } from '../actions/bloodActions';
import Loader from './layout/Loader';
import Message from './layout/Message';

const Home = () => {
  const dispatch = useDispatch();

  const bloodStock = useSelector((state) => state.bloodStock);
  const { loading, error, bloodStock: bloodGroups } = bloodStock;

  useEffect(() => {
    dispatch(getBloodStock());
  }, [dispatch]);

  return (
    <div className="fade-in">
      <div className="home-banner">
        <h1>Welcome to Blood Bank Management System</h1>
        <p>
          Donate blood, save lives. A centralized platform for blood donation and blood request management.
        </p>
        <Button as={Link} to="/donor/register" variant="primary" size="lg" className="mt-3 me-3">
          Become a Donor
        </Button>
        <Button as={Link} to="/login" variant="outline-light" size="lg" className="mt-3">
          Sign In
        </Button>
      </div>

      <h2 className="text-center mb-4">Our Services</h2>
      <Row className="mb-5">
        <Col md={4}>
          <div className="feature-card">
            <div className="feature-icon">
              <FaHandHoldingMedical />
            </div>
            <h3>Blood Donation</h3>
            <p>
              Donate blood and help save lives. Your small contribution can make a big difference in someone's life.
            </p>
            <Link to="/donor/register">
              <Button variant="primary" className="mt-3">Register as Donor</Button>
            </Link>
          </div>
        </Col>
        <Col md={4}>
          <div className="feature-card">
            <div className="feature-icon">
              <FaUserInjured />
            </div>
            <h3>Blood Request</h3>
            <p>
              Need blood? Register as a patient and request blood when needed. We're here to help you.
            </p>
            <Link to="/patient/register">
              <Button variant="primary" className="mt-3">Register as Patient</Button>
            </Link>
          </div>
        </Col>
        <Col md={4}>
          <div className="feature-card">
            <div className="feature-icon">
              <FaUserShield />
            </div>
            <h3>Admin Portal</h3>
            <p>
              Manage blood bank operations efficiently. Monitor donations, requests, and inventory.
            </p>
            <Link to="/admin/register">
              <Button variant="primary" className="mt-3">Register as Admin</Button>
            </Link>
          </div>
        </Col>
      </Row>

      <h2 className="text-center mb-4">Available Blood Stock</h2>
      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {bloodGroups && bloodGroups.map((blood) => (
            <Col key={blood._id} md={3} sm={6} className="mb-4">
              <div className="blood-group-card">
                <div className="blood-type">{blood.bloodGroup}</div>
                <div className="units">{blood.units} Units</div>
              </div>
            </Col>
          ))}
        </Row>
      )}

      <div className="text-center mt-5">
        <h2 className="mb-4">Why Donate Blood?</h2>
        <p className="lead mb-4">
          Blood donation is a simple process that takes only about 10 minutes but can save multiple lives.
        </p>
        <Row className="mt-4">
          <Col md={4}>
            <Card className="mb-4">
              <Card.Img variant="top" src="/images/blood-donation-1.jpeg" />
              <Card.Body>
                <Card.Title>Save Lives</Card.Title>
                <Card.Text>
                  One donation can save up to three lives. Your contribution matters!
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-4">
              <Card.Img variant="top" src="/images/blood-donation-2.webp" />
              <Card.Body>
                <Card.Title>Health Benefits</Card.Title>
                <Card.Text>
                  Donating blood can help reduce the risk of heart and liver ailments.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-4">
              <Card.Img variant="top" src="/images/blood-donation-3.webp" />
              <Card.Body>
                <Card.Title>Community Support</Card.Title>
                <Card.Text>
                  Be part of a community that helps others in their time of need.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Home;
