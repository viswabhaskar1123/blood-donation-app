const express = require('express');
const {
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
} = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/dashboard', protect, admin, getDashboardData);
router.get('/donors', protect, admin, getAllDonors);
router.put('/donors/:id', protect, admin, updateDonor);
router.delete('/donors/:id', protect, admin, deleteDonor);
router.get('/patients', protect, admin, getAllPatients);
router.put('/patients/:id', protect, admin, updatePatient);
router.delete('/patients/:id', protect, admin, deletePatient);
router.get('/donation-requests', protect, admin, getDonationRequests);
router.put('/donation-requests/:id', protect, admin, updateDonationRequest);
router.get('/blood-requests', protect, admin, getBloodRequests);
router.put('/blood-requests/:id', protect, admin, updateBloodRequest);
router.put('/blood-stock/:bloodGroup', protect, admin, updateBloodStock);

module.exports = router;
