const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Donor = require('../models/Donor');
const Patient = require('../models/Patient');
const BloodStock = require('../models/BloodStock');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// @desc    Register admin
// @route   POST /api/auth/admin/register
// @access  Public
const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const adminExists = await Admin.findOne({ email });

    if (adminExists) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    const admin = await Admin.create({
      name,
      email,
      password,
    });

    // Initialize blood stock if this is the first admin
    const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
    for (const group of bloodGroups) {
      const stockExists = await BloodStock.findOne({ bloodGroup: group });
      if (!stockExists) {
        await BloodStock.create({ bloodGroup: group, units: 0 });
      }
    }

    if (admin) {
      res.status(201).json({
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        token: generateToken(admin._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid admin data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Register donor
// @route   POST /api/auth/donor/register
// @access  Public
const registerDonor = async (req, res) => {
  try {
    const { name, email, password, phone, bloodGroup, age, gender, address, disease } = req.body;

    const donorExists = await Donor.findOne({ email });

    if (donorExists) {
      return res.status(400).json({ message: 'Donor already exists' });
    }

    const donor = await Donor.create({
      name,
      email,
      password,
      phone,
      bloodGroup,
      age,
      gender,
      address,
      disease: disease || 'None',
    });

    if (donor) {
      res.status(201).json({
        _id: donor._id,
        name: donor.name,
        email: donor.email,
        bloodGroup: donor.bloodGroup,
        role: donor.role,
        token: generateToken(donor._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid donor data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Register patient
// @route   POST /api/auth/patient/register
// @access  Public
const registerPatient = async (req, res) => {
  try {
    const { name, email, password, phone, bloodGroup, age, gender, address, disease } = req.body;

    const patientExists = await Patient.findOne({ email });

    if (patientExists) {
      return res.status(400).json({ message: 'Patient already exists' });
    }

    const patient = await Patient.create({
      name,
      email,
      password,
      phone,
      bloodGroup,
      age,
      gender,
      address,
      disease: disease || 'None',
    });

    if (patient) {
      res.status(201).json({
        _id: patient._id,
        name: patient.name,
        email: patient.email,
        bloodGroup: patient.bloodGroup,
        role: patient.role,
        token: generateToken(patient._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid patient data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    let user;

    if (role === 'admin') {
      user = await Admin.findOne({ email });
    } else if (role === 'donor') {
      user = await Donor.findOne({ email });
    } else if (role === 'patient') {
      user = await Patient.findOne({ email });
    } else {
      return res.status(400).json({ message: 'Invalid role' });
    }

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getUserProfile = async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerAdmin,
  registerDonor,
  registerPatient,
  login,
  getUserProfile,
};
