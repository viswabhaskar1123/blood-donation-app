const BloodRequest = require('../models/BloodRequest');

// @desc    Get patient dashboard data
// @route   GET /api/patients/dashboard
// @access  Private/Patient
const getPatientDashboard = async (req, res) => {
  try {
    const patientId = req.user._id;

    // Get blood requests count
    const totalRequests = await BloodRequest.countDocuments({ requestBy: patientId, requestorModel: 'Patient' });
    const approvedRequests = await BloodRequest.countDocuments({ requestBy: patientId, requestorModel: 'Patient', status: 'approved' });
    const pendingRequests = await BloodRequest.countDocuments({ requestBy: patientId, requestorModel: 'Patient', status: 'pending' });
    const rejectedRequests = await BloodRequest.countDocuments({ requestBy: patientId, requestorModel: 'Patient', status: 'rejected' });

    res.json({
      requests: {
        total: totalRequests,
        approved: approvedRequests,
        pending: pendingRequests,
        rejected: rejectedRequests,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create blood request
// @route   POST /api/patients/request-blood
// @access  Private/Patient
const createBloodRequest = async (req, res) => {
  try {
    const { bloodGroup, units, reason } = req.body;
    const patient = req.user;

    const bloodRequest = await BloodRequest.create({
      requestBy: patient._id,
      requestorModel: 'Patient',
      bloodGroup,
      units: units || 1,
      reason,
      status: 'pending',
    });

    res.status(201).json(bloodRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get patient blood request history
// @route   GET /api/patients/blood-requests
// @access  Private/Patient
const getBloodRequestHistory = async (req, res) => {
  try {
    const bloodRequests = await BloodRequest.find({ 
      requestBy: req.user._id,
      requestorModel: 'Patient'
    }).sort({ createdAt: -1 });
    res.json(bloodRequests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPatientDashboard,
  createBloodRequest,
  getBloodRequestHistory,
};
