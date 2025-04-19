const express = require('express');
const { 
  registerAdmin, 
  registerDonor, 
  registerPatient, 
  login, 
  getUserProfile 
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/admin/register', registerAdmin);
router.post('/donor/register', registerDonor);
router.post('/patient/register', registerPatient);
router.post('/login', login);
router.get('/profile', protect, getUserProfile);

module.exports = router;
