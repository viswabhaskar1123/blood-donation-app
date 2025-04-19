const express = require('express');
const {
  getPatientDashboard,
  createBloodRequest,
  getBloodRequestHistory,
} = require('../controllers/patientController');
const { protect, patient } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/dashboard', protect, patient, getPatientDashboard);
router.post('/request-blood', protect, patient, createBloodRequest);
router.get('/blood-requests', protect, patient, getBloodRequestHistory);

module.exports = router;
