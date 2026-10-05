const mongoose = require("mongoose");

const violationSchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      required: true,
    },

    studentName: {
      type: String,
      required: true,
    },

    violationType: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    date: {
      type: Date,
      default: Date.now,
    },

    status: {
      type: String,
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Violation", violationSchema);