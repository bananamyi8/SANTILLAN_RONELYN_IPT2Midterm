const express = require("express");
const router = express.Router();
const Violation = require("../models/violation");

// GET /api/violations
// Retrieves all student violation records.
router.get("/", async (req, res) => {
  try {
    const violations = await Violation.find().sort({
      createdAt: -1
    });

    res.status(200).json(violations);
  } catch (error) {
    console.error("GET violations error:", error);

    res.status(500).json({
      message: "Failed to retrieve violation records."
    });
  }
});

// GET /api/violations/:id
// Retrieves one specific violation record.
router.get("/:id", async (req, res) => {
  try {
    const violation = await Violation.findById(req.params.id);

    if (!violation) {
      return res.status(404).json({
        message: "Violation record not found."
      });
    }

    res.status(200).json(violation);
  } catch (error) {
    console.error("GET single violation error:", error);

    res.status(500).json({
      message: "Failed to retrieve violation record."
    });
  }
});

// POST /api/violations
// Creates a new student violation record.
router.post("/", async (req, res) => {
  try {
    const {
      studentName,
      studentId,
      violationType,
      description,
      date,
      status
    } = req.body;

    // Validate required fields.
    if (
      !studentName ||
      !studentId ||
      !violationType ||
      !description ||
      !date
    ) {
      return res.status(400).json({
        message: "Please complete all required fields."
      });
    }

    const violation = new Violation({
      studentName: studentName.trim(),
      studentId: studentId.trim(),
      violationType: violationType.trim(),
      description: description.trim(),
      date,
      status: status || "Pending"
    });

    const savedViolation = await violation.save();

    res.status(201).json(savedViolation);
  } catch (error) {
    console.error("POST violation error:", error);

    res.status(500).json({
      message: "Failed to create violation record."
    });
  }
});

// PUT /api/violations/:id
// Updates an existing violation record.
router.put("/:id", async (req, res) => {
  try {
    const violation = await Violation.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!violation) {
      return res.status(404).json({
        message: "Violation record not found."
      });
    }

    res.status(200).json(violation);
  } catch (error) {
    console.error("PUT violation error:", error);

    res.status(500).json({
      message: "Failed to update violation record."
    });
  }
});

// DELETE /api/violations/:id
// Deletes a violation record.
router.delete("/:id", async (req, res) => {
  try {
    const violation = await Violation.findByIdAndDelete(
      req.params.id
    );

    if (!violation) {
      return res.status(404).json({
        message: "Violation record not found."
      });
    }

    res.status(200).json({
      message: "Violation record deleted successfully."
    });
  } catch (error) {
    console.error("DELETE violation error:", error);

    res.status(500).json({
      message: "Failed to delete violation record."
    });
  }
});

module.exports = router;