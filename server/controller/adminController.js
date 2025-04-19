const Donor = require('../models/Donor');
const Patient = require('../models/Patient');
const BloodStock = require('../models/BloodStock');
const DonationRequest = require('../models/DonationRequest');
const BloodRequest = require('../models/BloodRequest');

// @desc    Get dashboard data
// @route   GET /api/admin/dashboard
// @access  Private/Admin
const getDashboardData = async (req, res) => {
  try {
    // Get blood stock
    const bloodStock = await BloodStock.find({});
    
    // Count donors
    const donorCount = await Donor.countDocuments();
    
    // Count patients
    const patientCount = await Patient.countDocuments();
    
    // Count blood requests
    const bloodRequestCount = await BloodRequest.countDocuments();
    
    // Count approved blood requests
    const approvedRequestCount = await BloodRequest.countDocuments({ status: 'approved' });
    
    // Calculate total blood units
    const totalBloodUnits = bloodStock.reduce((acc, stock) => acc + stock.units, 0);
    
    res.json({
      bloodStock,
      donorCount,
      patientCount,
      bloodRequestCount,
      approvedRequestCount,
      totalBloodUnits,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all donors
// @route   GET /api/admin/donors
// @access  Private/Admin
const getAllDonors = async (req, res) => {
  try {
    const donors = await Donor.find({}).select('-password');
    res.json(donors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update donor
// @route   PUT /api/admin/donors/:id
// @access  Private/Admin
const updateDonor = async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id);

    if (!donor) {
      return res.status(404).json({ message: 'Donor not found' });
    }

    const { name, email, phone, bloodGroup, age, gender, address, disease } = req.body;

    donor.name = name || donor.name;
    donor.email = email || donor.email;
    donor.phone = phone || donor.phone;
    donor.bloodGroup = bloodGroup || donor.bloodGroup;
    donor.age = age || donor.age;
    donor.gender = gender || donor.gender;
    donor.address = address || donor.address;
    donor.disease = disease || donor.disease;

    const updatedDonor = await donor.save();

    res.json({
      _id: updatedDonor._id,
      name: updatedDonor.name,
      email: updatedDonor.email,
      phone: updatedDonor.phone,
      bloodGroup: updatedDonor.bloodGroup,
      age: updatedDonor.age,
      gender: updatedDonor.gender,
      address: updatedDonor.address,
      disease: updatedDonor.disease,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete donor
// @route   DELETE /api/admin/donors/:id
// @access  Private/Admin
const deleteDonor = async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id);

    if (!donor) {
      return res.status(404).json({ message: 'Donor not found' });
    }

    await donor.remove();
    res.json({ message: 'Donor removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all patients
// @route   GET /api/admin/patients
// @access  Private/Admin
const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find({}).select('-password');
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update patient
// @route   PUT /api/admin/patients/:id
// @access  Private/Admin
const updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    const { name, email, phone, bloodGroup, age, gender, address, disease } = req.body;

    patient.name = name || patient.name;
    patient.email = email || patient.email;
    patient.phone = phone || patient.phone;
    patient.bloodGroup = bloodGroup || patient.bloodGroup;
    patient.age = age || patient.age;
    patient.gender = gender || patient.gender;
    patient.address = address || patient.address;
    patient.disease = disease || patient.disease;

    const updatedPatient = await patient.save();

    res.json({
      _id: updatedPatient._id,
      name: updatedPatient.name,
      email: updatedPatient.email,
      phone: updatedPatient.phone,
      bloodGroup: updatedPatient.bloodGroup,
      age: updatedPatient.age,
      gender: updatedPatient.gender,
      address: updatedPatient.address,
      disease: updatedPatient.disease,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete patient
// @route   DELETE /api/admin/patients/:id
// @access  Private/Admin
const deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    await patient.remove();
    res.json({ message: 'Patient removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all donation requests
// @route   GET /api/admin/donation-requests
// @access  Private/Admin
const getDonationRequests = async (req, res) => {
  try {
    const donationRequests = await DonationRequest.find({})
      .populate('donor', 'name email bloodGroup')
      .sort({ createdAt: -1 });
    res.json(donationRequests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update donation request status
// @route   PUT /api/admin/donation-requests/:id
// @access  Private/Admin
const updateDonationRequest = async (req, res) => {
  try {
    const donationRequest = await DonationRequest.findById(req.params.id);

    if (!donationRequest) {
      return res.status(404).json({ message: 'Donation request not found' });
    }

    const { status, adminNote } = req.body;

    donationRequest.status = status || donationRequest.status;
    donationRequest.adminNote = adminNote || donationRequest.adminNote;

    const updatedDonationRequest = await donationRequest.save();

    // If approved, add blood to stock
    if (status === 'approved') {
      const bloodStock = await BloodStock.findOne({ bloodGroup: donationRequest.bloodGroup });
      if (bloodStock) {
        bloodStock.units += donationRequest.units;
        await bloodStock.save();
      }
    }

    res.json(updatedDonationRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all blood requests
// @route   GET /api/admin/blood-requests
// @access  Private/Admin
const getBloodRequests = async (req, res) => {
  try {
    const bloodRequests = await BloodRequest.find({})
      .populate({
        path: 'requestBy',
        select: 'name email bloodGroup',
      })
      .sort({ createdAt: -1 });
    res.json(bloodRequests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update blood request status
// @route   PUT /api/admin/blood-requests/:id
// @access  Private/Admin
const updateBloodRequest = async (req, res) => {
  try {
    const bloodRequest = await BloodRequest.findById(req.params.id);

    if (!bloodRequest) {
      return res.status(404).json({ message: 'Blood request not found' });
    }

    const { status, adminNote } = req.body;

    bloodRequest.status = status || bloodRequest.status;
    bloodRequest.adminNote = adminNote || bloodRequest.adminNote;

    const updatedBloodRequest = await bloodRequest.save();

    // If approved, reduce blood from stock
    if (status === 'approved') {
      const bloodStock = await BloodStock.findOne({ bloodGroup: bloodRequest.bloodGroup });
      if (bloodStock) {
        if (bloodStock.units >= bloodRequest.units) {
          bloodStock.units -= bloodRequest.units;
          await bloodStock.save();
        } else {
          return res.status(400).json({ message: 'Not enough blood in stock' });
        }
      }
    }

    res.json(updatedBloodRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update blood stock
// @route   PUT /api/admin/blood-stock/:bloodGroup
// @access  Private/Admin
const updateBloodStock = async (req, res) => {
  try {
    const { units } = req.body;
    const bloodGroup = req.params.bloodGroup;

    const bloodStock = await BloodStock.findOne({ bloodGroup });

    if (!bloodStock) {
      return res.status(404).json({ message: 'Blood group not found' });
    }

    bloodStock.units = units;
    const updatedBloodStock = await bloodStock.save();

    res.json(updatedBloodStock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDashboardData,
  getAllDonors,
  updateDonor,
  deleteDonor,
  getAllPatients,
  updatePatient,
  deletePatient,
  getDonationRequests,
  updateDonationRequest,
  getBloodRequests,
  updateBloodRequest,
  updateBloodStock,
};
