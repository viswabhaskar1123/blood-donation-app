const express = require('express');
const {
  getDonorDashboard,
  createDonationRequest,
  getDonationHistory,
  createBloodRequest,
  getBloodRequestHistory,
} = require('../controllers/donorController');
const { protect, donor } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/dashboard', protect, donor, getDonorDashboard);
router.post('/donate', protect, donor, createDonationRequest);
router.get('/donations', protect, donor, getDonationHistory);
router.post('/request-blood', protect, donor, createBloodRequest);
router.get('/blood-requests', protect, donor, getBloodRequestHistory);

module.exports = router;
