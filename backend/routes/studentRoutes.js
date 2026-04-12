const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// POST /student/add -> Add student
router.post('/add', async (req, res) => {
  try {
    const newStudent = new Student({
      name: req.body.name,
      email: req.body.email,
      course: req.body.course
    });
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /student/view -> Get all students
router.get('/view', async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /student/update/:id -> Update student
router.put('/update/:id', async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        email: req.body.email,
        course: req.body.course
      },
      { new: true } // Returns the updated document
    );
    res.status(200).json(updatedStudent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /student/delete/:id -> Delete student
router.delete('/delete/:id', async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedStudent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
