// components/layout/Footer.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer>
      <Container>
        <div className="footer-content">
          <div className="footer-section">
            <h3>Blood Bank Management</h3>
            <p>
              A centralized platform for blood donation and blood request management. Our mission is to connect blood donors with those in need.
            </p>
            <div className="social-links">
              <a href="#"><FaFacebookF /></a>
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaLinkedinIn /></a>
            </div>
          </div>
          
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/donor/register">Become a Donor</Link></li>
              <li><Link to="/patient/register">Register as Patient</Link></li>
              <li><Link to="/login">Login</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Contact Us</h3>
            <ul className="footer-links">
              <li>
                <FaMapMarkerAlt style={{ marginRight: '10px' }} />
                National Institute of Technology, Andhra Pradesh, India
              </li>
              <li>
                <FaPhone style={{ marginRight: '10px' }} />
                +1 234 567 8901
              </li>
              <li>
                <FaEnvelope style={{ marginRight: '10px' }} />
                support@bloodbank.com
              </li>
            </ul>
          </div>
        </div>
        
        <div className="copyright">
          &copy; {new Date().getFullYear()} Blood Bank Management System. All rights reserved.
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
