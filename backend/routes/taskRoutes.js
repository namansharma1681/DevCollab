const express = require('express');
const Task = require('../models/Task'); 
const router = express.Router();

// POST API: Create a new task
router.post('/create', async (req, res) => {
  try {
    // Extract the data sent from the React frontend
    const { title, description, status, userId } = req.body;

    // Instantiate a new Task using the Mongoose model
    const newTask = new Task({
      title: title,
      description: description,
      status: status || 'To Do',
      user: userId // This maps the frontend's _id to the Task's 'user' field
    });

    // Save it to MongoDB
    const savedTask = await newTask.save();

    // Send the saved task back to the frontend
    res.status(201).json(savedTask);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create task' });
  }
});

module.exports = router;