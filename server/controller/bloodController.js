const BloodStock = require('../models/BloodStock');

// @desc    Get all blood stock
// @route   GET /api/blood/stock
// @access  Public
const getBloodStock = async (req, res) => {
  try {
    const bloodStock = await BloodStock.find({});
    res.json(bloodStock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getBloodStock,
};
