const mongoose = require('mongoose');

const bloodRequestSchema = mongoose.Schema(
  {
    requestBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: 'requestorModel',
    },
    requestorModel: {
      type: String,
      required: true,
      enum: ['Donor', 'Patient'],
    },
    bloodGroup: {
      type: String,
      required: true,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    units: {
      type: Number,
      required: true,
      default: 1,
    },
    reason: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    adminNote: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

const BloodRequest = mongoose.model('BloodRequest', bloodRequestSchema);

module.exports = BloodRequest;
