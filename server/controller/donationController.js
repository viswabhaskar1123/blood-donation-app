const DonationRequest = require('../models/DonationRequest');
const BloodStock = require('../models/BloodStock');
const Donor = require('../models/Donor');

// @desc    Get all donation requests
// @route   GET /api/donations
// @access  Private/Admin
const getAllDonationRequests = async (req, res) => {
  try {
    const donationRequests = await DonationRequest.find({})
      .populate('donor', 'name email bloodGroup')
      .sort({ createdAt: -1 });
    res.json(donationRequests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get donation request by ID
// @route   GET /api/donations/:id
// @access  Private/Admin
const getDonationRequestById = async (req, res) => {
  try {
    const donationRequest = await DonationRequest.findById(req.params.id)
      .populate('donor', 'name email bloodGroup disease');
    
    if (donationRequest) {
      res.json(donationRequest);
    } else {
      res.status(404).json({ message: 'Donation request not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a donation request
// @route   POST /api/donations
// @access  Private/Donor
const createDonationRequest = async (req, res) => {
  try {
    const { units, disease } = req.body;
    const donor = await Donor.findById(req.user._id);

    if (!donor) {
      return res.status(404).json({ message: 'Donor not found' });
    }

    const donationRequest = new DonationRequest({
      donor: donor._id,
      bloodGroup: donor.bloodGroup,
      units: units || 1,
      disease: disease || donor.disease || 'None',
      status: 'pending',
    });

    const createdDonationRequest = await donationRequest.save();
    res.status(201).json(createdDonationRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update donation request status
// @route   PUT /api/donations/:id
// @access  Private/Admin
const updateDonationRequestStatus = async (req, res) => {
  try {
    const { status, adminNote } = req.body;
    
    const donationRequest = await DonationRequest.findById(req.params.id);
    
    if (!donationRequest) {
      return res.status(404).json({ message: 'Donation request not found' });
    }
    
    donationRequest.status = status || donationRequest.status;
    donationRequest.adminNote = adminNote || donationRequest.adminNote;
    
    const updatedDonationRequest = await donationRequest.save();
    
    // If approved, add blood to stock
    if (status === 'approved') {
      const bloodStock = await BloodStock.findOne({ bloodGroup: donationRequest.bloodGroup });
      
      if (bloodStock) {
        bloodStock.units += donationRequest.units;
        await bloodStock.save();
      } else {
        // Create new blood stock if it doesn't exist
        await BloodStock.create({
          bloodGroup: donationRequest.bloodGroup,
          units: donationRequest.units,
        });
      }
    }
    
    res.json(updatedDonationRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get donor's donation history
// @route   GET /api/donations/donor
// @access  Private/Donor
const getDonorDonationHistory = async (req, res) => {
  try {
    const donationHistory = await DonationRequest.find({ donor: req.user._id })
      .sort({ createdAt: -1 });
    res.json(donationHistory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllDonationRequests,
  getDonationRequestById,
  createDonationRequest,
  updateDonationRequestStatus,
  getDonorDonationHistory,
};
