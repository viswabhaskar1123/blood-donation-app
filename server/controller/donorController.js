const DonationRequest = require('../models/DonationRequest');
const BloodRequest = require('../models/BloodRequest');

// @desc    Get donor dashboard data
// @route   GET /api/donors/dashboard
// @access  Private/Donor
const getDonorDashboard = async (req, res) => {
  try {
    const donorId = req.user._id;

    // Get donation requests count
    const totalDonations = await DonationRequest.countDocuments({ donor: donorId });
    const approvedDonations = await DonationRequest.countDocuments({ donor: donorId, status: 'approved' });
    const pendingDonations = await DonationRequest.countDocuments({ donor: donorId, status: 'pending' });
    const rejectedDonations = await DonationRequest.countDocuments({ donor: donorId, status: 'rejected' });

    // Get blood requests count
    const totalRequests = await BloodRequest.countDocuments({ requestBy: donorId, requestorModel: 'Donor' });
    const approvedRequests = await BloodRequest.countDocuments({ requestBy: donorId, requestorModel: 'Donor', status: 'approved' });
    const pendingRequests = await BloodRequest.countDocuments({ requestBy: donorId, requestorModel: 'Donor', status: 'pending' });
    const rejectedRequests = await BloodRequest.countDocuments({ requestBy: donorId, requestorModel: 'Donor', status: 'rejected' });

    res.json({
      donations: {
        total: totalDonations,
        approved: approvedDonations,
        pending: pendingDonations,
        rejected: rejectedDonations,
      },
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

// @desc    Create donation request
// @route   POST /api/donors/donate
// @access  Private/Donor
const createDonationRequest = async (req, res) => {
  try {
    const { units, disease } = req.body;
    const donor = req.user;

    const donationRequest = await DonationRequest.create({
      donor: donor._id,
      bloodGroup: donor.bloodGroup,
      units: units || 1,
      disease: disease || donor.disease || 'None',
      status: 'pending',
    });

    res.status(201).json(donationRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get donor donation history
// @route   GET /api/donors/donations
// @access  Private/Donor
const getDonationHistory = async (req, res) => {
  try {
    const donations = await DonationRequest.find({ donor: req.user._id })
      .sort({ createdAt: -1 });
    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create blood request
// @route   POST /api/donors/request-blood
// @access  Private/Donor
const createBloodRequest = async (req, res) => {
  try {
    const { bloodGroup, units, reason } = req.body;
    const donor = req.user;

    const bloodRequest = await BloodRequest.create({
      requestBy: donor._id,
      requestorModel: 'Donor',
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

// @desc    Get donor blood request history
// @route   GET /api/donors/blood-requests
// @access  Private/Donor
const getBloodRequestHistory = async (req, res) => {
  try {
    const bloodRequests = await BloodRequest.find({ 
      requestBy: req.user._id,
      requestorModel: 'Donor'
    }).sort({ createdAt: -1 });
    res.json(bloodRequests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDonorDashboard,
  createDonationRequest,
  getDonationHistory,
  createBloodRequest,
  getBloodRequestHistory,
};
