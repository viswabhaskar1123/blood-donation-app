const mongoose = require('mongoose');

const bloodStockSchema = mongoose.Schema(
  {
    bloodGroup: {
      type: String,
      required: true,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      unique: true,
    },
    units: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const BloodStock = mongoose.model('BloodStock', bloodStockSchema);

module.exports = BloodStock;
