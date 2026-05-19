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

// GET API: Get all tasks for a user
router.get('/get/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const tasks = await Task.find({ user: userId });
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to get tasks' });
  }
});

// PUT API: Update task status
router.put('/update/:taskId', async (req, res) => {
  try {
    const { taskId } = req.params
    const { status } = req.body

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { status },
      { new: true }
    )

    res.status(200).json(updatedTask)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to update task' })
  }
})

  // DELETE API: Delete a task
router.delete('/delete/:taskId', async (req, res) => {
  try {
    const { taskId } = req.params
    await Task.findByIdAndDelete(taskId)
    res.status(200).json({ message: 'Task deleted successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to delete task' })
  }
})

module.exports = router;