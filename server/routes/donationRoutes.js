const express = require('express');
const {
  getAllDonationRequests,
  getDonationRequestById,
  createDonationRequest,
  updateDonationRequestStatus,
  getDonorDonationHistory,
} = require('../controllers/donationController');
const { protect, admin, donor } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .get(protect, admin, getAllDonationRequests)
  .post(protect, donor, createDonationRequest);

router.route('/donor')
  .get(protect, donor, getDonorDonationHistory);

router.route('/:id')
  .get(protect, admin, getDonationRequestById)
  .put(protect, admin, updateDonationRequestStatus);

module.exports = router;
