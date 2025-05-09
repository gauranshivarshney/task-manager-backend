const express = require('express');
const Task = require('../models/Task');
const router = express.Router();

router.get('/cards', async (req, res) => {
  try {
    const totalTasks = await Task.countDocuments();
    const completedTasks = await Task.countDocuments({ stage: 'Completed' });
    const inProgressTasks = await Task.countDocuments({ stage: 'In Progress' });
    const todoTasks = await Task.countDocuments({ stage: 'To do' });

    const cardData = [
      { title: 'TOTAL TASK', count: totalTasks, icon: 'task-icon', bgColor: 'blue' },
      { title: 'COMPLETED TASK', count: completedTasks, icon: 'check-circle', bgColor: 'green' },
      { title: 'TASK IN PROGRESS', count: inProgressTasks, icon: 'spinner', bgColor: 'orange' },
      { title: 'TODOS', count: todoTasks, icon: 'list', bgColor: 'deeppink' },
    ];

    res.json(cardData);
  } catch (error) {
    console.error('Error fetching card data:', error);
    res.status(500).json({ message: 'Failed to fetch card data' });
  }
});

router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find().populate('team', 'fullName');
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Failed to fetch tasks' });
  }
});

module.exports = router;