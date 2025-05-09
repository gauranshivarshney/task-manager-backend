const express = require('express');
const Task = require('../models/Task');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().populate('assignee', 'fullName');
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch tasks' });
  }
});

router.post('/', async (req, res) => {
  try {
    if (req.body.dueDate) {
        req.body.dueDate = new Date(req.body.dueDate); 
      }
    const task = new Task(req.body);
    await task.save();
    const populatedTask = await Task.findById(task._id).populate('assignee', 'fullName');
    res.status(201).json(populatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create task' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete task' });
  }
});

module.exports = router;