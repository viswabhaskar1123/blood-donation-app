const Admin = require('../models/Admin');
const Donor = require('../models/Donor');
const Patient = require('../models/Patient');

// Check if user is an admin
const isAdmin = async (req, res, next) => {
  try {
    const user = await Admin.findById(req.user.id);
    if (!user) {
      return res.status(403).json({ message: 'Access denied. Not an admin.' });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Check if user is a donor
const isDonor = async (req, res, next) => {
  try {
    const user = await Donor.findById(req.user.id);
    if (!user) {
      return res.status(403).json({ message: 'Access denied. Not a donor.' });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Check if user is a patient
const isPatient = async (req, res, next) => {
  try {
    const user = await Patient.findById(req.user.id);
    if (!user) {
      return res.status(403).json({ message: 'Access denied. Not a patient.' });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { isAdmin, isDonor, isPatient };
