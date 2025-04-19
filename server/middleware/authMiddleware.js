const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Donor = require('../models/Donor');
const Patient = require('../models/Patient');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Check in all user models
      let user = await Admin.findById(decoded.id).select('-password');
      if (!user) {
        user = await Donor.findById(decoded.id).select('-password');
      }
      if (!user) {
        user = await Patient.findById(decoded.id).select('-password');
      }

      if (!user) {
        res.status(401);
        throw new Error('Not authorized, user not found');
      }

      req.user = user;
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
};

const donor = (req, res, next) => {
  if (req.user && req.user.role === 'donor') {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as a donor');
  }
};

const patient = (req, res, next) => {
  if (req.user && req.user.role === 'patient') {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as a patient');
  }
};

module.exports = { protect, admin, donor, patient };
