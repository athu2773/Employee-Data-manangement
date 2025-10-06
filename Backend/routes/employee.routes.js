import express from "express";
import Employee from "../models/employee.model.js";
const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
  try {
    const employee = await Employee.create(req.body);
    res.status(201).json(employee);
  } catch (err) {
    // Handle Mongo duplicate key error for unique fields
    if (err && err.code === 11000) {
      return res.status(409).json({ message: 'Email already exists' });
    }
    res.status(400).json({ message: err.message });
  }
});

// READ ALL
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// SEARCH
// Example: GET /employees/search?term=john
router.get('/search', async (req, res) => {
  try {
    const term = (req.query.term || '').toString().trim();
    if (!term) {
      const employees = await Employee.find();
      return res.json(employees);
    }

    const regex = new RegExp(term, 'i');
    const results = await Employee.find({
      $or: [
        { name: regex },
        { email: regex },
        { position: regex },
      ],
    });

    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// READ ONE
router.get("/:id", async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id);
    if (!emp) return res.status(404).json({ message: "Employee not found" });
    res.json(emp);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updated = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: "Employee deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
